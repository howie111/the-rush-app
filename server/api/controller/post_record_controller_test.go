package controller

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestPostRecordController(t *testing.T) {

	mockRecordCreator := NewMockRecordProvider()

	controller := NewPostRecordController(mockRecordCreator)

	ts := httptest.NewServer(controller)

	t.Run("HappyPath", func(t *testing.T) {

		fmt.Println("i am here")
		payload, _ := ioutil.ReadFile("./fixture/test.json")

		response, _ := http.Post(ts.URL, "application/json", bytes.NewBuffer(payload))

		fmt.Println(response.StatusCode)

		fmt.Println(mockRecordCreator.records)
		fmt.Println("i am there")

	})

}
