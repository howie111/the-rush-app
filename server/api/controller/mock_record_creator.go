package controller

import (
	. "github.com/howie111/the-rush-app/api/models"
)

type MockRecordCreator struct {
	records []Record
}

func (m *MockRecordProvider) CreateRecord(record Record) error {

	m.records = append(m.records, record)

	return nil
}
