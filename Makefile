GOVERSION=$(shell go version)
GOOS=$(word 1, $(subst /, ,$(lastword $(GOVERSION))))
GOARCH=$(word 2, $(subst /, ,$(lastword $(GOVERSION))))
DIST_DIR=bin
BINARY_NAME=gognito

BUILD_TARGETS= \
	build-darwin-amd64 \
#	build-linux-amd64 \
#	build-windows-amd64 \

INSTALL_BUNDLE=dep ensure

.PHONY: all build test dep clean $(BUILD_TARGETS)

all: clean $(BUILD_TARGETS)

build: $(DIST_DIR)/$(GOOS)_$(GOARCH)/$(BINARY_NAME)$(SUFFIX)

$(DIST_DIR)/$(GOOS)_$(GOARCH)/$(BINARY_NAME)$(SUFFIX): 
	$(INSTALL_BUNDLE)
	go build -o $(DIST_DIR)/$(GOOS)_$(GOARCH)/$(BINARY_NAME)$(SUFFIX) main.go

build-windows-amd64:
	@$(MAKE) build GOOS=windows GOARCH=amd64 SUFFIX=.exe

build-linux-amd64:
	@$(MAKE) build GOOS=linux GOARCH=amd64

build-darwin-amd64:
	@$(MAKE) build GOOS=darwin GOARCH=amd64

test:
	go test -v ./...

dep:
	$(INSTALL_BUNDLE)

clean:
	-rm -rf $(DIST_DIR)/*
