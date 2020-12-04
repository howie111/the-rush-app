package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"testing"

	. "github.com/howie111/the-rush-app/api/models"
)

func TestGetRecordsByTeamController(t *testing.T) {

	t.Run("HappyPath", func(t *testing.T) {
		body, err := ioutil.ReadFile("./fixture/test.json")
		if err != nil {
			t.Error()
		}

		testRecords := []Record{}

		err = json.Unmarshal(body, &testRecords)

		if err != nil {
			fmt.Println(err)
		}
		teamToYdsMap, mapErr := AggregateByTeam(testRecords)

		if mapErr != nil {
			fmt.Println(mapErr)
		}

		fmt.Println(teamToYdsMap)

	})
}
