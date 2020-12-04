package controller

import (
	. "github.com/howie111/the-rush-app/api/models"
)

type MockRecordProvider struct {
	records []Record
}

func NewMockRecordProvider() *MockRecordProvider {
	return &MockRecordProvider{}
}

func (mock *MockRecordProvider) GetRecords() ([]Record, error) {
	return []Record{
		Record{
			Player: "howie",
		},
	}, nil
}
