# Run a go server as a service (Ubuntu)

Create a binary:

```sh
env GOOS=linux GOARCH=amd64 go build -o gcs-auth.linux-amd64
```

Create a service file:

```sh
$ sudo vim /lib/systemd/system/gcsauth.service 
```

Write in the file:

```sh
[Unit]
Description=gcsauth

[Service]
Type=simple
Restart=always
RestartSec=5s
Environment="GCS_PRIVATE_PATH=/some/folder/gcs_key.json"
ExecStart=/some/folder/gcs-auth.linux-amd64

[Install]

WantedBy=multi-user.target
```

Then configure the service:

```sh
$ sudo service gcsauth start
$ sudo service gcsauth stop
$ sudo service gcsauth status
$ sudo systemctl enable gcsauth.service
```