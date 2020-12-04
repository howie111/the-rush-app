package controller

import "fmt"

func AggregateByTeam(record []Record) (map[string]float64, error) {

	records := []RecordByTeam{}

	teamToYdsMap := map[string]float64{}

	for _, record := range records {
		fmt.Println(record)
		if val, ok := teamToYdsMap[record.Name]; ok {
			teamToYdsMap[record.Name] += val
		}
		teamToYdsMap[record.Name] = record.Yds
	}

	return teamToYdsMap, nil
}
