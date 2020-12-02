package controller

import (
	. "github.com/howie111/the-rush-app/api/models"
)

type RecordCreator interface {
	CreateRecord(record Record) error
}
