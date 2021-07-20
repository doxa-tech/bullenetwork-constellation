// Package main implements a proxy server that generates authenticated URLs to
// get a gcs files. It can also zip multiple files. The private json key file
// must be set in the GCS_PRIVATE_PATH env variable.
//
// You can check with
//
//   curl -X POST -d "bucket=BUCKET_NAME" -d "object=OBJECT_PATH.PDF"\
//     http://localhost:9990/auth
//
//   curl -X POST -d "bucket=BZCKET_NAME" -d "OBJECT_PATH_1.PDF=FILENAME_1.PDF"\
//     -d "OBJECT_PATH_2.PDF=FILENAME_2.PDF" http://localhost:9990/archive

package main

import (
	"archive/zip"
	"context"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"

	"golang.org/x/oauth2/google"
	"golang.org/x/oauth2/jwt"
)

const validityPeriod = time.Minute * 10
const defaultAddr = ":9990"

type key int

const (
	requestIDKey key = 0
)

func main() {
	var listenAddr string
	flag.StringVar(&listenAddr, "listen-addr", defaultAddr, "server listen address")
	flag.Parse()

	logger := log.New(os.Stdout, "http: ", log.LstdFlags)

	jsonKey, err := ioutil.ReadFile(os.Getenv("GCS_PRIVATE_PATH"))
	if err != nil {
		logger.Fatalf("failed to read key: %v", err.Error())
	}

	conf, err := google.JWTConfigFromJSON(jsonKey)
	if err != nil {
		logger.Fatalf("failed to read config: %v", err.Error())
	}

	client, err := storage.NewClient(context.Background(), option.WithServiceAccountFile(os.Getenv("GCS_PRIVATE_PATH")))
	if err != nil {
		logger.Fatalf("failed to creat client: %v", err)
	}

	mux := http.NewServeMux()
	server := &http.Server{
		Handler:  tracing(nextRequestID)(logging(logger)(mux)),
		ErrorLog: logger,
	}

	mux.HandleFunc("/auth", auth(conf))
	mux.HandleFunc("/archive", archive(client))

	ln, err := net.Listen("tcp", listenAddr)
	if err != nil {
		logger.Fatalf("failed to create conn '%s': %v", listenAddr, err)
		return
	}

	logger.Printf("Server is ready to handle request at %s", ln.Addr())

	err = server.Serve(ln)
	if err != nil && err != http.ErrServerClosed {
		logger.Fatal(err)
	}
}

// getOpts get the Google Cloud Storage options based on the key file.
func getOpts(conf *jwt.Config) *storage.SignedURLOptions {
	return &storage.SignedURLOptions{
		Scheme:         storage.SigningSchemeV4,
		Method:         "GET",
		GoogleAccessID: conf.Email,
		PrivateKey:     conf.PrivateKey,
		Expires:        time.Now().Add(validityPeriod),
	}
}

// auth implements POST /auth
func auth(conf *jwt.Config) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodPost {
			http.Error(w, "only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		err := r.ParseForm()
		if err != nil {
			http.Error(w, "failed to parse form: "+err.Error(), http.StatusInternalServerError)
			return
		}

		bucket := r.Form.Get("bucket")
		if bucket == "" {
			http.Error(w, "bucket value not found", http.StatusBadRequest)
			return
		}

		object := r.Form.Get("object")
		if bucket == "" {
			http.Error(w, "object value not found", http.StatusBadRequest)
			return
		}

		u, err := storage.SignedURL(bucket, object, getOpts(conf))
		if err != nil {
			http.Error(w, "failed to create signed url: "+err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(w, "%s", u)
	}
}

// archive implements POST /archive. This endpoint creates an uncompressed ZIP
// file containing all the requested files. It expects argument as post form
// parameter:
//
// "bucket" => BUCKET_NAME,
// OBJECT_PATH_1 => FILENAME_1
// OBJECT_PATH_2 => FILENAME_2
// ...
//
func archive(client *storage.Client) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		_, ok := w.(http.Flusher)
		if !ok {
			http.Error(w, "flusher not supported", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodPost {
			http.Error(w, "only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		w.Header().Set("Content-Type", "application/zip")
		w.Header().Set("Content-Disposition", "attachment; filename=\"partitions.zip\"")

		err := r.ParseForm()
		if err != nil {
			http.Error(w, "failed to parse form: "+err.Error(), http.StatusInternalServerError)
			return
		}

		bucket := r.Form.Get("bucket")
		if bucket == "" {
			http.Error(w, "bucket value not found", http.StatusBadRequest)
			return
		}

		objects := []fileRequest{}

		for k, v := range r.Form {
			if k == "bucket" {
				continue
			}

			objects = append(objects, fileRequest{
				Name:   v[0],
				Object: k,
			})
		}

		zipWriter := zip.NewWriter(w)
		defer zipWriter.Close()

		for _, fileRequest := range objects {

			ctx, cancel := context.WithTimeout(context.Background(), time.Second*50)
			defer cancel()

			rc, err := client.Bucket(bucket).Object(fileRequest.Object).NewReader(ctx)
			if err != nil {
				http.Error(w, "failed to get object: "+err.Error(), http.StatusInternalServerError)
				return
			}

			defer rc.Close()

			header := zip.FileHeader{
				Name:     fileRequest.Name,
				Method:   zip.Store,
				Modified: time.Now(),
			}

			writer, err := zipWriter.CreateHeader(&header)

			_, err = io.Copy(writer, rc)
			zipWriter.Flush()
			w.(http.Flusher).Flush()
		}
	}
}

type fileRequest struct {
	Name   string
	Object string
}

func nextRequestID() string {
	return fmt.Sprintf("%d", time.Now().UnixNano())
}

func logging(logger *log.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				requestID, ok := r.Context().Value(requestIDKey).(string)
				if !ok {
					requestID = "unknown"
				}
				logger.Println(requestID, r.Method, r.URL.Path, r.RemoteAddr, r.UserAgent())
			}()
			next.ServeHTTP(w, r)
		})
	}
}

func tracing(nextRequestID func() string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			requestID := r.Header.Get("X-Request-Id")
			if requestID == "" {
				requestID = nextRequestID()
			}
			ctx := context.WithValue(r.Context(), requestIDKey, requestID)
			w.Header().Set("X-Request-Id", requestID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
