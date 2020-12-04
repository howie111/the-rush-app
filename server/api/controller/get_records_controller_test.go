package controller

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	. "github.com/howie111/the-rush-app/api/models"
	"github.com/stretchr/testify/assert"
)

func TestGetRecordController(t *testing.T) {

	mockRecordProvider := NewMockRecordProvider()
	controller := NewGetRecordController(mockRecordProvider)
	ts := httptest.NewServer(controller)

	defer ts.Close()

	t.Run("HappyPath", func(t *testing.T) {

		resp, _ := http.Get(ts.URL)

		body, err := ioutil.ReadAll(resp.Body)

		respBody := []Record{}

		json.Unmarshal(body, &respBody)

		if err != nil {
			t.Error(err)
		}

		assert.Equal(t, 200, resp.StatusCode)

	})
}
