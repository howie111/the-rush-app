package models

type Record struct {
	Player       string  `json:"Player"`
	Team         string  `json:"Team"`
	Pos          string  `json:"Pos"`
	Att          float32 `json:"Att`
	AttPerGame   float32 `json:"Att/G"`
	Yds          float32 `json:"Yds"`
	YdsPerGame   float32 `json:"Yds/G"`
	Avg          float32 `json:"Avg"`
	TD           float32 `json:"TD"`
	Lng          string  `json:"Lng"`
	First        float32 `json:"1st"`
	FirstPercent float32 `json:"1st%"`
	TwentyPlus   float32 `json:"20+"`
	FortyPlus    float32 `json:"40+"`
	Fum          float32 `json:"FUM"`
}
