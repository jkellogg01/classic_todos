package main

import (
	"net/http"
	"os"
)

func main() {
  staticDistFiles := os.DirFS("./client/dist")
  http.Handle("/", http.FileServerFS(staticDistFiles))

  http.ListenAndServe(":8080", nil)
}
