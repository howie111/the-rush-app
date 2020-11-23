package repositories

import (
	"encoding/json"
	"io/ioutil"

	. "github.com/howie111/the-rush-app/api/models"
)

type DbBasedRecordGateWay struct {
}

func NewDbBasedRecordGateway() *DbBasedRecordGateWay {
	return &DbBasedRecordGateWay{}
}

func (d *DbBasedRecordGateWay) GetRecords() ([]Record, error) {

	records := []Record{}
	body, err := ioutil.ReadFile("./api/repositories/fixtures/rushing.json")

	if err != nil {
		return records, err
	}

	unmarshallErr := json.Unmarshal(body, &records)

	if unmarshallErr != nil {
		return records, unmarshallErr
	}

	return records, nil
}
