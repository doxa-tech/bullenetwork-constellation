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
	"google.golang.org/api/option"

	"golang.org/x/oauth2/google"
	"golang.org/x/xerrors"
)

const validityPeriod = time.Minute * 10
const defaultAddr = ":9990"

// defines the OS env keys that must be provided
const (
	KEY_GCS_PATH    = "GCS_PRIVATE_PATH"
	KEY_BUCKET_NAME = "GCS_BUCKET_NAME"
)

const directusFileURL = "https://vanil.bullenetwork.ch/files/"

type key int

const (
	requestIDKey key = 0
)

// configuration defines the input configurations
type configuration struct {
	gcsKeyPath    string
	gcsBucketName string
}

func main() {
	var listenAddr string
	flag.StringVar(&listenAddr, "listen-addr", defaultAddr, "server listen address")
	flag.Parse()

	conf, err := getConfiguration()
	if err != nil {
		log.Fatalf("failed to get configuration: %v", err)
	}

	ctrl, err := getController(conf)
	if err != nil {
		log.Fatalf("failed to get controller: %v", err)
	}

	defer ctrl.client.Close()

	mux := http.NewServeMux()
	server := &http.Server{
		Handler:  tracing(nextRequestID)(logging(ctrl.log)(mux)),
		ErrorLog: ctrl.log,
	}

	mux.HandleFunc("/api/auth", ctrl.auth())
	mux.HandleFunc("/api/archive", ctrl.archive())

	ln, err := net.Listen("tcp", listenAddr)
	if err != nil {
		ctrl.log.Fatalf("failed to create conn '%s': %v", listenAddr, err)
		return
	}

	ctrl.log.Printf("Server is ready to handle request at %s", ln.Addr())

	err = server.Serve(ln)
	if err != nil && err != http.ErrServerClosed {
		ctrl.log.Fatal(err)
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

func getConfiguration() (configuration, error) {
	gcsKeyPath := os.Getenv(KEY_GCS_PATH)
	if gcsKeyPath == "" {
		return configuration{}, xerrors.Errorf("please set %s", KEY_GCS_PATH)
	}

	gcsBucketName := os.Getenv(KEY_BUCKET_NAME)
	if gcsBucketName == "" {
		return configuration{}, xerrors.Errorf("please set %s", KEY_BUCKET_NAME)
	}

	return configuration{
		gcsKeyPath:    gcsKeyPath,
		gcsBucketName: gcsBucketName,
	}, nil
}

func getController(conf configuration) (controller, error) {
	jsonKey, err := ioutil.ReadFile(conf.gcsKeyPath)
	if err != nil {
		return controller{}, xerrors.Errorf("failed to read key: %v", err.Error())
	}

	jwtConf, err := google.JWTConfigFromJSON(jsonKey)
	if err != nil {
		return controller{}, xerrors.Errorf("failed to read config: %v", err.Error())
	}

	client, err := storage.NewClient(context.Background(),
		option.WithCredentialsFile(conf.gcsKeyPath))
	if err != nil {
		return controller{}, xerrors.Errorf("failed to creat client: %v", err)
	}

	logger := log.New(os.Stdout, "http: ", log.LstdFlags)

	return controller{
		jwtConf: jwtConf,
		conf:    conf,
		client:  client,
		log:     logger,
	}, nil
}
