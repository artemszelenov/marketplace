FROM golang:1.22.0

# Copy your custom PocketBase and build
COPY . /pb
WORKDIR /pb

RUN go build
WORKDIR /

EXPOSE 8090

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]