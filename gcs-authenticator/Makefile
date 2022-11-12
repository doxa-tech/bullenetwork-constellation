version=$(shell git describe --tags || echo '0.0.0')
versionFile=$(shell echo $(version) | tr . _)
versionFlag="main.Version=$(version)"
timeFlag="main.BuildTime=$(shell date +'%d/%m/%y_%H:%M')"

build:
	GOARCH=amd64 GOOS=linux CGO_ENABLED=0 go build -ldflags="-X $(versionFlag) -X $(timeFlag)" -o gcsauth-linux-amd64-$(versionFile) .
	GOARCH=amd64 GOOS=darwin go build -ldflags="-X $(versionFlag) -X $(timeFlag)" -o gcsauth-darwin-amd64-$(versionFile) .
	GOARCH=amd64 GOOS=windows go build -ldflags="-X $(versionFlag) -X $(timeFlag)" -o gcsauth-windows-amd64-$(versionFile) .