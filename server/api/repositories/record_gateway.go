package repositories

import (
	. "github.com/howie111/the-rush-app/api/models"
)

type RecordGateway interface {
	GetRecords() ([]Record, error)
}
