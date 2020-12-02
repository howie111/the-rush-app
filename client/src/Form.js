import {React, useState} from 'react'

function Form({addNewRecord}){



    const submitHandler = (e)=>{

        e.preventDefault()
        var record = {
        "Player": e.target.player.value,
        "Team":e.target["team"].value,
        "Pos":e.target["team"].value,
        "Att":e.target["team"].value,
        "Att/G":e.target["team"].value,
        "Yds":e.target["team"].value,
        "Avg":e.target["team"].value,
        "Yds/G":e.target["team"].value,
        "TD":e.target["team"].value,
        "Lng":e.target["team"].value,
        "1st":e.target["team"].value,
        "1st%":e.target["team"].value,
        "20+":e.target["team"].value,
        "40+":e.target["team"].value,
        "FUM":e.target["team"].value
        }
        addNewRecord(record)

        e.target.reset()
        

}

    return (<form onSubmit={submitHandler}>
                <input type="text" name="player" placeholder="player"/>
                <input type="text" name="team"/>
                <input type="text" name="pos"/>
                <input type="text" name="att"/>
                <input type="text" name="att/g"/>
                <input type="text" name="yds"/>
                <input type="text" name="td"/>
                <input type="text" name="lng"/>
                <input type="text" name="1st"/>
                <input type="text" name="0+"/>
                <input type="text" name="40+"/>
                <input type="text" name="fum"/>
                <input type="submit" value="Submit"/>

            </form>)
}

export default Form