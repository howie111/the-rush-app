package repositories

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestDbBasedRecordGateWay(t *testing.T) {

	dbBasedRecordGateWay := NewDbBasedRecordGateway()

	t.Run("HappyPath", func(t *testing.T) {

		records, err := dbBasedRecordGateWay.GetRecords()

		if err != nil {
			t.Fatal(err)
		}

		assert.Equal(t, len(records), 326)

	})
}
