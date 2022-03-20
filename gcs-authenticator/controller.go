package main

import (
	"archive/zip"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"cloud.google.com/go/storage"
	"golang.org/x/oauth2/jwt"
	"golang.org/x/xerrors"
)

// controller defines the controller functions and holds common elements
type controller struct {
	jwtConf *jwt.Config
	client  *storage.Client
	log     *log.Logger
	conf    configuration
}

// errorf prints the error and replies an HTTP error
func (c controller) errorf(w http.ResponseWriter, code int, format string, v ...interface{}) {
	msg := fmt.Sprintf(format, v...)
	c.log.Printf("ERROR [%d]: %s", code, msg)
	http.Error(w, msg, code)
}

// authPartition implements a POST endpoint that authenticates a file URL. It
// takes as input an ID on a relation table, which allows to authenticate only a
// subset of files.
//
// Expects:
//   id=
//
func (c controller) auth(relationTable string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodPost {
			c.errorf(w, http.StatusMethodNotAllowed, "only POST allowed")
			return
		}

		err := r.ParseForm()
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, "failed to parse form: %v", err.Error())
			return
		}

		id := r.Form.Get("id")
		if id == "" {
			c.errorf(w, http.StatusBadRequest, "id value not found")
			return
		}

		c.log.Printf("got id: %s", id)

		url := relationTable + id + "?access_token=" + c.conf.directusToken

		object, err := getFile(url)
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, "failed to get file: %v", err)
			return
		}

		c.log.Printf("object: %s", object)

		u, err := storage.SignedURL(c.conf.gcsBucketName, object, getOpts(c.jwtConf))
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, "failed to create signed url: %v", err)
			return
		}

		c.log.Printf("returning URL: %s", u)

		fmt.Fprintf(w, "%s", u)
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

// Returns the filename_disk from the relation table entry. The relation table
// must be from any collection to the `items` collection, which then must
// contain the `directus_files_id` attribute.
func getFile(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", xerrors.Errorf("failed to get partition: %v", err)
	}

	type RelationResp struct {
		Data struct {
			DirectusFilesID string `json:"directus_files_id"`
		} `json:"data"`
	}

	decoder := json.NewDecoder(resp.Body)

	var partition RelationResp

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
// ID_1 => FILENAME_1
// ID_2 => FILENAME_2
// ...
//
// The ID must be an ID from the relation table.
//
func (c controller) archive(relationTable string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		_, ok := w.(http.Flusher)
		if !ok {
			c.errorf(w, http.StatusInternalServerError, "flusher not supported")
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
			c.errorf(w, http.StatusMethodNotAllowed, "only POST allowed")
			return
		}

		w.Header().Set("Content-Type", "application/zip")
		w.Header().Set("Content-Disposition", "attachment; filename=\"bullenetwork.zip\"")

		err := r.ParseForm()
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, "failed to parse form: %v", err)
			return
		}

		bucket := r.Form.Get("bucket")
		if bucket == "" {
			c.errorf(w, http.StatusBadRequest, "bucket value not found")
			return
		}

		type fileRequest struct {
			Name   string
			Object string
		}

		objects := []fileRequest{}

		// k: ID of the relation table entry, which must contain an
		//    `directus_files_id` attribute.
		// v[0]: filename
		for k, v := range r.Form {
			if k == "bucket" {
				continue
			}

			if len(v) != 1 {
				continue
			}

			url := relationTable + k + "?access_token=" + c.conf.directusToken

			c.log.Printf("archive: getting file: %s", url)

			object, err := getFile(url)
			if err != nil {
				c.errorf(w, http.StatusInternalServerError, "failed to get file: %v", err)
				return
			}

			objects = append(objects, fileRequest{
				Name:   v[0],
				Object: object,
			})
		}

		zipWriter := zip.NewWriter(w)
		defer zipWriter.Close()

		for _, fileRequest := range objects {

			ctx, cancel := context.WithTimeout(context.Background(), time.Second*50)
			defer cancel()

			rc, err := c.client.Bucket(bucket).Object(fileRequest.Object).NewReader(ctx)
			if err != nil {
				c.errorf(w, http.StatusInternalServerError, "failed to get object: %v", err)
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
				c.errorf(w, http.StatusInternalServerError, "failed to create header: %v", err)
				return
			}

			_, err = io.Copy(writer, rc)
			if err != nil {
				c.errorf(w, http.StatusInternalServerError, "failed to copy: %v", err)
				return
			}

			zipWriter.Flush()
			w.(http.Flusher).Flush()
		}
	}
}

// gcspub returns a HTTP handler that updates the ACL to make an object public.
// It expects a hook message from directus. The object is updated only if the
// updated element (i.e. directus field) is named "image".
func (c controller) gcspub() func(http.ResponseWriter, *http.Request) {
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
			c.errorf(w, http.StatusBadRequest, "failed to unmarshal hook: %v", err)
			return
		}

		type image struct {
			Image string `json:"image"`
		}

		var m image

		err = json.Unmarshal(h.Payload, &m)
		if err != nil {
			c.errorf(w, http.StatusBadRequest, "failed to unmarshal image: %v", err)
			return
		}

		object := m.Image
		if object == "" {
			return
		}

		filenameDisk, err := getDirectusFilename(object)
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, "failed to get filename_disk: %v", err)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
		defer cancel()

		acl := c.client.Bucket(c.conf.gcsBucketName).Object(filenameDisk).ACL()

		err = acl.Set(ctx, storage.AllUsers, storage.RoleReader)
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, "failed to set ACL: %v", err)
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

	return attr.FilenameDisk, nil
}
