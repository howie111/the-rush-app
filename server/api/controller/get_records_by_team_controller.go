package controller

import (
	"encoding/json"
	"net/http"

	. "github.com/howie111/the-rush-app/api/models"
)

type GetRecordsByTeamController struct {
	recordProvider RecordProvider
}

func NewGetRecordsByTeamController(recordProvider RecordProvider) *GetRecordsByTeamController {
	return &GetRecordsByTeamController{recordProvider}
}
func (g *GetRecordsByTeamController) ServeHTTP(w http.ResponseWriter, r *http.Request) {

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

type RecordByTeam struct {
	Name string  `json:"Name"`
	Yds  float64 `json:"Yds"`
}
