package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	. "github.com/howie111/the-rush-app/api/models"
)

type PostRecordController struct {
	recordCreator RecordCreator
}

func NewPostRecordController(recordCreator RecordCreator) *PostRecordController {
	return &PostRecordController{recordCreator}
}

func (p *PostRecordController) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// parse the request body

	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte(err.Error()))
	}

	record := Record{}

	jsonErr := json.Unmarshal(body, &record)

	fmt.Println(jsonErr)
	if jsonErr != nil {
		w.WriteHeader(400)
		w.Write([]byte(jsonErr.Error()))
	}

	err = p.recordCreator.CreateRecord(record)

	fmt.Println(record)

	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	}

	w.WriteHeader(200)

	return
}
