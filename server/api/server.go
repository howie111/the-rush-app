package api

import (
	"context"
	"log"
	"net/http"
	"time"

	mux "github.com/gorilla/mux"
	. "github.com/howie111/the-rush-app/api/controller"
)

type Server struct {
	server         *http.Server
	recordProvider RecordProvider
	recordCreator  RecordCreator
}

func NewServer(server *http.Server, recordProvider RecordProvider, recordCreator RecordCreator) *Server {
	return &Server{server, recordProvider, recordCreator}
}

func (server *Server) ListenAndServe(port string) error {

	router := mux.NewRouter()

	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
	})

	getRecordsController := NewGetRecordController(server.recordProvider)
	postRecordsController := NewPostRecordController(server.recordCreator)

	router.Handle("/records", getRecordsController).Methods("GET")
	router.Handle("/records", postRecordsController).Methods("POST")

	server.server = &http.Server{Addr: ":" + port, Handler: router}

	log.Println("listen and serving api on port:", port)

	err := server.server.ListenAndServe()

	if err == http.ErrServerClosed {
		log.Fatal(err)
		return err
	}

	if err != nil {
		log.Fatal(err)
		return err
	}

	return nil

}

func (server *Server) Shutdown() error {

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

	return server.server.Shutdown(ctx)
}
