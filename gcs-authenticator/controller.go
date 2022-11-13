package main

import (
	"archive/zip"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"cloud.google.com/go/storage"
	"golang.org/x/oauth2/jwt"
	"golang.org/x/xerrors"
)

const directusErrorCode = 10

// controller defines the controller functions and holds common elements
type controller struct {
	jwtConf *jwt.Config
	client  *storage.Client
	log     *log.Logger
	conf    configuration
}

type appError struct {
	Message string          `json:"message"`
	Code    int             `json:"code"`
	Data    json.RawMessage `json:"data"`
}

type mainError struct {
	Error appError `json:"error"`
}

// errorf prints the error and replies an HTTP error
func (c controller) errorf(w http.ResponseWriter, httpCode int, appCode int,
	data any, format string, v ...interface{}) {

	dataBuf, err := json.Marshal(data)
	if err != nil {
		c.log.Printf("ERROR: failed to marshal data: %v", err)
	}

	msg := fmt.Sprintf(format, v...)

	errMsg := mainError{
		Error: appError{
			Message: msg,
			Code:    appCode,
			Data:    dataBuf,
		},
	}

	errBuf, err := json.Marshal(errMsg)
	if err != nil {
		c.log.Printf("ERROR: failed to marshal errMsg: %v", err)
	}

	c.log.Printf("ERROR [%d]: %s", httpCode, errBuf)

	w.Header().Add("content-type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(httpCode)
	w.Write(errBuf)
}

// authPartition implements a POST endpoint that authenticates a file URL. It
// takes as input a fileID and a Directus access_token.
//
// Expects:
//   id=
//	 access_token=
//
func (c controller) auth() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodPost {
			c.errorf(w, http.StatusMethodNotAllowed, 1, nil, "only POST allowed")
			return
		}

		err := r.ParseForm()
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, 1, nil, "failed to parse form: %v", err.Error())
			return
		}

		id := r.Form.Get("id")
		if id == "" {
			c.errorf(w, http.StatusBadRequest, 1, nil, "id value not found")
			return
		}

		accessToken := r.Form.Get("access_token")
		if accessToken == "" {
			c.errorf(w, http.StatusBadRequest, 1, nil, "access_token not found")
		}

		c.log.Printf("got id: %s", id)

		object, err := getFile(id, accessToken)
		if err != nil {
			var data any
			dataCode := 1
			if errors.As(err, &directusErrors{}) {
				data = err
				dataCode = directusErrorCode
			}
			c.errorf(w, http.StatusInternalServerError, dataCode, data, "failed to get file: %v", err)
			return
		}

		c.log.Printf("object: %s", object)

		u, err := storage.SignedURL(c.conf.gcsBucketName, object, getOpts(c.jwtConf))
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, 1, nil, "failed to create signed url: %v", err)
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

// Returns the filename_disk from a file.
func getFile(fileID, accessToken string) (string, error) {
	resp, err := http.Get(directusFileURL + fileID + "?access_token=" + accessToken)

	if err != nil {
		return "", xerrors.Errorf("failed to get partition: %v", err)
	}

	defer resp.Body.Close()

	result, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", xerrors.Errorf("failed to read body: %v", err)
	}

	type FileResp struct {
		Data struct {
			FilenameDisk string `json:"filename_disk"`
		} `json:"data"`
		Errors []json.RawMessage `json:"errors"`
	}

	var fileResp FileResp

	err = json.Unmarshal(result, &fileResp)
	if err != nil {
		return "", xerrors.Errorf("failed to unmarshal response: %q: %v", result, err)
	}

	if fileResp.Errors != nil {
		return "", directusErrors{Errors: fileResp.Errors}
	}

	return fileResp.Data.FilenameDisk, nil
}

type directusErrors struct {
	Errors []json.RawMessage `json:"errors"`
}

func (e directusErrors) String() string {
	res := make([]string, len(e.Errors))
	for i := range res {
		res[i] = string(e.Errors[i])
	}

	return "directusErrors{" + strings.Join(res, " - ") + "}"
}

func (e directusErrors) Error() string {
	return "directus error " + e.String()
}

// archive implements POST /archive. This endpoint creates an uncompressed ZIP
// file containing all the requested files. It expects argument as post form
// parameter:
//
// "access_token" => ACCESS_TOKEN,
// ID_1 => FILENAME_1
// ID_2 => FILENAME_2
// ...
//
// The ID must be an ID from the relation table.
//
func (c controller) archive() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		_, ok := w.(http.Flusher)
		if !ok {
			c.errorf(w, http.StatusInternalServerError, 1, nil, "flusher not supported")
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
			c.errorf(w, http.StatusMethodNotAllowed, 1, nil, "only POST allowed")
			return
		}

		w.Header().Set("Content-Type", "application/zip")
		w.Header().Set("Content-Disposition", "attachment; filename=\"bullenetwork.zip\"")

		err := r.ParseForm()
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, 1, nil, "failed to parse form: %v", err)
			return
		}

		accessToken := r.Form.Get("access_token")
		if accessToken == "" {
			c.errorf(w, http.StatusBadRequest, 1, nil, "access_token value not found")
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
			if k == "access_token" {
				continue
			}

			if len(v) != 1 {
				continue
			}

			c.log.Printf("archive: getting file: %s", k)

			object, err := getFile(k, accessToken)
			if err != nil {
				var data any
				dataCode := 1
				if errors.As(err, &directusErrors{}) {
					data = err
					dataCode = directusErrorCode
				}
				c.errorf(w, http.StatusInternalServerError, dataCode, data, "failed to get file: %v", err)
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

			rc, err := c.client.Bucket(c.conf.gcsBucketName).Object(fileRequest.Object).NewReader(ctx)
			if err != nil {
				c.errorf(w, http.StatusInternalServerError, 1, nil, "failed to get object: %v", err)
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
				c.errorf(w, http.StatusInternalServerError, 1, nil, "failed to create header: %v", err)
				return
			}

			_, err = io.Copy(writer, rc)
			if err != nil {
				c.errorf(w, http.StatusInternalServerError, 1, nil, "failed to copy: %v", err)
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
			c.errorf(w, http.StatusBadRequest, 1, nil, "failed to unmarshal hook: %v", err)
			return
		}

		type image struct {
			Image string `json:"image"`
		}

		var m image

		err = json.Unmarshal(h.Payload, &m)
		if err != nil {
			c.errorf(w, http.StatusBadRequest, 1, nil, "failed to unmarshal image: %v", err)
			return
		}

		object := m.Image
		if object == "" {
			return
		}

		filenameDisk, err := getDirectusFilename(object)
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, 1, nil, "failed to get filename_disk: %v", err)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
		defer cancel()

		acl := c.client.Bucket(c.conf.gcsBucketName).Object(filenameDisk).ACL()

		err = acl.Set(ctx, storage.AllUsers, storage.RoleReader)
		if err != nil {
			c.errorf(w, http.StatusInternalServerError, 1, nil, "failed to set ACL: %v", err)
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
