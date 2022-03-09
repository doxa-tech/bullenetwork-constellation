// Package main implements a proxy server that generates authenticated URLs to
// get a gcs files. It can also zip multiple files. The private json key file
// must be set in the GCS_PRIVATE_PATH env variable.
//
// You can check with
//
//   curl -X POST -d "bucket=BUCKET_NAME" -d "object=OBJECT_PATH.PDF"\
//     http://localhost:9990/auth
//
//   curl -X POST -d "bucket=BUCKET_NAME" -d "OBJECT_PATH_1.PDF=FILENAME_1.PDF"\
//     -d "OBJECT_PATH_2.PDF=FILENAME_2.PDF" http://localhost:9990/archive

package main

import (
	"archive/zip"
	"context"
	"encoding/json"
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
	"golang.org/x/xerrors"
)

const validityPeriod = time.Minute * 10
const defaultAddr = ":9990"

const GCS_KEY_PATH = "GCS_PRIVATE_PATH"
const BUCKET_KEY_NAME = "GCS_BUCKET_NAME"
const DIRECTUS_TOKEN_KEY = "DIRECTUS_TOKEN"

const directusFileURL = "https://truite.bullenetwork.ch/files/"
const directusPartitionsFilesURL = "https://truite.bullenetwork.ch/items/partitions_directus_files_2/"

type key int

const (
	requestIDKey key = 0
)

func main() {
	var listenAddr string
	flag.StringVar(&listenAddr, "listen-addr", defaultAddr, "server listen address")
	flag.Parse()

	logger := log.New(os.Stdout, "http: ", log.LstdFlags)

	gcs_key_path := os.Getenv(GCS_KEY_PATH)
	if gcs_key_path == "" {
		logger.Fatalf("please set %s", GCS_KEY_PATH)
	}

	gcs_bucket_name := os.Getenv(BUCKET_KEY_NAME)
	if gcs_bucket_name == "" {
		logger.Fatalf("please set %s", BUCKET_KEY_NAME)
	}

	directus_token := os.Getenv(DIRECTUS_TOKEN_KEY)
	if directus_token == "" {
		logger.Fatalf("please set %s", DIRECTUS_TOKEN_KEY)
	}

	jsonKey, err := ioutil.ReadFile(gcs_key_path)
	if err != nil {
		logger.Fatalf("failed to read key: %v", err.Error())
	}

	conf, err := google.JWTConfigFromJSON(jsonKey)
	if err != nil {
		logger.Fatalf("failed to read config: %v", err.Error())
	}

	client, err := storage.NewClient(context.Background(), option.WithCredentialsFile(gcs_key_path))
	if err != nil {
		logger.Fatalf("failed to creat client: %v", err)
	}

	defer client.Close()

	mux := http.NewServeMux()
	server := &http.Server{
		Handler:  tracing(nextRequestID)(logging(logger)(mux)),
		ErrorLog: logger,
	}

	mux.HandleFunc("/auth/partition", authPartition(conf, gcs_bucket_name, directus_token))
	mux.HandleFunc("/archive", archive(client))
	mux.HandleFunc("/gcspub", gcspub(client, gcs_bucket_name))

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

// authPartition implements POST /auth/partition
// expects:
//   id=
func authPartition(conf *jwt.Config, bucket, token string) func(http.ResponseWriter, *http.Request) {
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

		id := r.Form.Get("id")
		if id == "" {
			http.Error(w, "id value not found", http.StatusBadRequest)
			return
		}

		object, err := getFile(id, token)
		if err != nil {
			http.Error(w, "failed to get file: "+err.Error(), http.StatusInternalServerError)
		}

		u, err := storage.SignedURL(bucket, object, getOpts(conf))
		if err != nil {
			http.Error(w, "failed to create signed url: "+err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(w, "%s", u)
	}
}

// Returns the filename_disk from the partition relation table
func getFile(id, token string) (string, error) {
	url := directusPartitionsFilesURL + id + "access_token=" + token

	resp, err := http.Get(url)
	if err != nil {
		return "", xerrors.Errorf("failed to get partition: %v", err)
	}

	type PartitionResp struct {
		Data struct {
			ID              int    `json:"id"`
			PartitionsID    string `json:"partitions_id"`
			DirectusFilesID string `json:"directus_files_id"`
		} `json:"data"`
	}

	decoder := json.NewDecoder(resp.Body)

	var partition PartitionResp

	err = decoder.Decode(&partition)
	if err != nil {
		return "", xerrors.Errorf("failed to get response: %v", err)
	}

	url = directusFileURL + partition.Data.DirectusFilesID

	resp, err = http.Get(url)
	if err != nil {
		return "", xerrors.Errorf("failed to get file: %v", err)
	}

	type FileResp struct {
		Data struct {
			FilenameDisk string `json:"filename_disk"`
		} `json:"data"`
	}

	decoder = json.NewDecoder(resp.Body)

	var file FileResp

	err = decoder.Decode(&file)
	if err != nil {
		return "", xerrors.Errorf("failed to decode file: %v", err)
	}

	return file.Data.FilenameDisk, nil
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

		type fileRequest struct {
			Name   string
			Object string
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
			if err != nil {
				http.Error(w, "failed to create header: "+err.Error(), http.StatusInternalServerError)
			}

			_, err = io.Copy(writer, rc)
			if err != nil {
				http.Error(w, "failed to copy: "+err.Error(), http.StatusInternalServerError)
			}

			zipWriter.Flush()
			w.(http.Flusher).Flush()
		}
	}
}

// gcspub returns a HTTP handler that updates the ACL to make an object public.
// It expects a hook message from directus. The object is updated only if the
// updated element (i.e. directus field) is named "image".
func gcspub(client *storage.Client, bucket string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		type accountability struct {
			User string `json:"user"`
			Role string `json:"role"`
		}

		type hook struct {
			Event          string          `json:"event"`
			Accountability accountability  `json:"accountability"`
			Payload        json.RawMessage `json:"payload"`
			Collection     string          `json:"collection"`
		}

		var h hook

		err := json.NewDecoder(r.Body).Decode(&h)
		if err != nil {
			err = xerrors.Errorf("failed to unmarshal hook: %v", err)
			fmt.Println("error:", err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		type image struct {
			Image string `json:"image"`
		}

		var m image

		err = json.Unmarshal(h.Payload, &m)
		if err != nil {
			err = xerrors.Errorf("failed to unmarshal image: %v", err)
			fmt.Println("error:", err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		object := m.Image
		if object == "" {
			return
		}

		filenameDisk, err := getDirectusFilename(object)
		if err != nil {
			err = xerrors.Errorf("failed to get filename_disk: %v", err.Error())
			fmt.Println("error:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
		defer cancel()

		acl := client.Bucket(bucket).Object(filenameDisk).ACL()

		err = acl.Set(ctx, storage.AllUsers, storage.RoleReader)
		if err != nil {
			err = xerrors.Errorf("failed to set acl: %v", err)
			fmt.Println("error:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

// getDirectusFilename returns the filename_disk attribute of a Directus file
func getDirectusFilename(object string) (string, error) {
	res, err := http.Get(directusFileURL + object)
	if err != nil {
		return "", xerrors.Errorf("failed to get Directus image: %v", err)
	}

	var objmap map[string]json.RawMessage

	err = json.NewDecoder(res.Body).Decode(&objmap)
	if err != nil {
		return "", xerrors.Errorf("failed to decode response: %v", err)
	}

	data := objmap["data"]
	if len(data) == 0 {
		return "", xerrors.Errorf("data empty: %v", objmap)
	}

	type attributes struct {
		FilenameDisk string `json:"filename_disk"`
	}

	var attr attributes

	err = json.Unmarshal(data, &attr)
	if err != nil {
		return "", xerrors.Errorf("failed to unmarshal data: %v", err)
	}

	if attr.FilenameDisk == "" {
		return "", xerrors.Errorf("filename_disk empty: %v", objmap)
	}

	fmt.Println("filename disk:", attr.FilenameDisk)

	return attr.FilenameDisk, nil
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
