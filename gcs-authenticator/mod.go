// Package main implements a proxy server that generates authenticated URLs to
// get a gcs files. The private json key file must be set in the
// GCS_PRIVATE_PATH env variable.
//
// You can check with `curl -X POST -d "bucket=BUCKET_NAME" -d
// "object=MY_FILE.PDF" http://localhost:9990/auth`

package main

import (
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"cloud.google.com/go/storage"

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

	mux := http.NewServeMux()
	server := &http.Server{
		Handler:  tracing(nextRequestID)(logging(logger)(mux)),
		ErrorLog: logger,
	}

	mux.HandleFunc("/auth", auth(conf))

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
