package controller

import (
	. "github.com/howie111/the-rush-app/api/models"
)

type RecordProvider interface {
	GetRecords() ([]Record, error)
}
