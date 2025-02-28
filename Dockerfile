FROM golang:1.24 AS server-build

ENV CGO_ENABLED=0
ENV GOOS=linux

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o /app-server

FROM server-build AS server-test

RUN go test -v ./...

FROM oven/bun:slim AS client-build

WORKDIR /app/client

ENV NODE_ENV="production"

# Install node modules for the client app
COPY client/bun.lock client/package.json ./
RUN bun install --ci
COPY client .

# Build static files for the client app
RUN bun run build

# Purge any files which aren't from the build
RUN find . -mindepth 1 ! -regex '^./dist\(/.*\)?' -delete

FROM alpine AS build-release-stage

WORKDIR /

COPY --from=client-build /app/client/dist /client/dist
COPY --from=server-build /app-server /app-server
# COPY server/sql/schema sql/schema

ENTRYPOINT [ "/app-server" ]
