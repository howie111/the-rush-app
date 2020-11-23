package main

import (
	"os"

	. "github.com/howie111/the-rush-app/api"
	. "github.com/howie111/the-rush-app/api/repositories"
)

func main() {

	portNumber := os.Getenv("SERVER_PORT")

	if portNumber == "" {
		portNumber = "8080"
	}

	recordGateway := NewDbBasedRecordGateway()

	server := NewServer(nil, recordGateway)

	go func() {
		err := server.ListenAndServe(portNumber)
		if err != nil {
			os.Exit(1)
		}
	}()

	sigs := make(chan os.Signal, 1)
	done := make(chan bool, 1)

	go func() {
		<-sigs

		server.Shutdown()
		done <- true
	}()

	<-done
}
