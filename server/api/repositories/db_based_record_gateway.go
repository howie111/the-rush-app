package repositories

import (
	"encoding/json"
	"io/ioutil"

	. "github.com/howie111/the-rush-app/api/models"
)

type DbBasedRecordGateWay struct {
	records []Record
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

func (d *DbBasedRecordGateWay) CreateRecord(record Record) error {

	d.records = append(d.records, record)

	return nil
}
