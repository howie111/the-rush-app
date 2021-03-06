package controller

import (
	"encoding/json"
	"net/http"
)

type GetRecordsController struct {
	recordProvider RecordProvider
}

func NewGetRecordController(recordProvider RecordProvider) *GetRecordsController {
	return &GetRecordsController{recordProvider}
}

func (g *GetRecordsController) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	records, err := g.recordProvider.GetRecords()

	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(`Internal Server error`))
	}

	bytes, err := json.MarshalIndent(records, "", " "+" ")
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(`Internal Server error`))
	}

	w.Write(bytes)

}
