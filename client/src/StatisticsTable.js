import React, { Component} from "react";

import { CSVLink, CSVDownload } from "react-csv";

import FromSubmit from './FormSubmit'

import Form from './Form'
import FormSubmit from "./FormSubmit";

class StatisticsTable extends Component{

    constructor(props){
        super(props)
        this.state = {
            originalResults:[
              {
                "Player":"Kirk Cousins",
                "Team":"WAS",
                "Pos":"QB",
                "Att":34,
                "Att/G":2.1,
                "Yds":96,
                "Avg":2.8,
                "Yds/G":6,
                "TD":4,
                "Lng":"19T",
                "1st":14,
                "1st%":41.2,
                "20+":0,
                "40+":0,
                "FUM":3
              },
              {
                "Player":"Matthew Slater",
                "Team":"NE",
                "Pos":"WR",
                "Att":1,
                "Att/G":0.1,
                "Yds":5,
                "Avg":5,
                "Yds/G":0.4,
                "TD":0,
                "Lng":"5",
                "1st":1,
                "1st%":100,
                "20+":0,
                "40+":0,
                "FUM":0
              },
              {
                "Player":"Ryan Mathews",
                "Team":"PHI",
                "Pos":"RB",
                "Att":155,
                "Att/G":11.9,
                "Yds":661,
                "Avg":4.3,
                "Yds/G":50.8,
                "TD":8,
                "Lng":"30",
                "1st":38,
                "1st%":24.5,
                "20+":6,
                "40+":0,
                "FUM":3
              },
              {
                "Player":"Shane Vereen",
                "Team":"NYG",
                "Pos":"RB",
                "Att":33,
                "Att/G":6.6,
                "Yds":158,
                "Avg":4.8,
                "Yds/G":31.6,
                "TD":1,
                "Lng":"25",
                "1st":8,
                "1st%":24.2,
                "20+":1,
                "40+":0,
                "FUM":1
              }
            ],
            displayResults:[
              {
                "Player":"Kirk Cousins",
                "Team":"WAS",
                "Pos":"QB",
                "Att":34,
                "Att/G":2.1,
                "Yds":96,
                "Avg":2.8,
                "Yds/G":6,
                "TD":4,
                "Lng":"19T",
                "1st":14,
                "1st%":41.2,
                "20+":0,
                "40+":0,
                "FUM":3
              },
              {
                "Player":"Matthew Slater",
                "Team":"NE",
                "Pos":"WR",
                "Att":1,
                "Att/G":0.1,
                "Yds":5,
                "Avg":5,
                "Yds/G":0.4,
                "TD":0,
                "Lng":"5",
                "1st":1,
                "1st%":100,
                "20+":0,
                "40+":0,
                "FUM":0
              },
              {
                "Player":"Ryan Mathews",
                "Team":"PHI",
                "Pos":"RB",
                "Att":155,
                "Att/G":11.9,
                "Yds":661,
                "Avg":4.3,
                "Yds/G":50.8,
                "TD":8,
                "Lng":"30",
                "1st":38,
                "1st%":24.5,
                "20+":6,
                "40+":0,
                "FUM":3
              },
              {
                "Player":"Shane Vereen",
                "Team":"NYG",
                "Pos":"RB",
                "Att":33,
                "Att/G":6.6,
                "Yds":158,
                "Avg":4.8,
                "Yds/G":31.6,
                "TD":1,
                "Lng":"25",
                "1st":8,
                "1st%":24.2,
                "20+":1,
                "40+":0,
                "FUM":1
              }
            ],
            error: null,
            isLoaded:[]
        }
    }


    // componentDidMount() {
    //     fetch("http://localhost:8080/records")
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //             console.log(result)
    //           this.setState({
    //             isLoaded: true,
    //             originalResults: result,
    //             displayResults: result
    //           });
    //         },
    //         (error) => {
    //           this.setState({
    //             isLoaded: true,
    //             error
    //           });
    //         }
    //       )
    //   }


    filterResultsByNumber = (number, results) =>{
      return results.filter(item => (item["Yds"] > number))
    }


    onChangeByYds = (e)=>{
      var query = e.target.value

      if(isNaN(query)){
       alert("it is not a number")
      }else{
        this.setState((prevState)=>{
          var displayList = this.filterResultsByNumber(query, prevState.displayResults)
          return {displayResults: query.length >0 ? displayList: prevState.originalResults}
        })
      }
    }


    addNewRecord =(record)=>{
      return this.setState({displayResults:[...this.state.displayResults, record]})
    }



    filterResults = (query, results) => {
        return results.filter(item => {
          const name = item.Player.toLowerCase();
          return name.includes(query);
        });
      };


    sortResults = key => {
    this.setState(prevState => {
        const { displayResults, sortOrder } = prevState;

        if (sortOrder === "descending") {
        displayResults.sort((a, b) => {
            if (a[key] > b[key]) {
            return -1;
            }
            return a[key] > b[key] ? 1 : 0;
        });
        } else {
        displayResults.sort((a, b) => {
            if (a[key] < b[key]) {
            return -1;
            }
            return a[key] > b[key] ? 1 : 0;
        });
        }

        return {
        displayResults,
        sortOrder: sortOrder === "descending" ? "ascending" : "descending"
        };
    });
    };  

    onChange = e => {
        const query = e.target.value;
    
        this.setState(prevState => ({
          displayResults:
            query.length > 0
              ? this.filterResults(query, prevState.originalResults)
              : prevState.originalResults
        }));
      };   

   

    render(){
    
        return (
            <div>
               <div className="row">
                   <div className="col">
                        <input label="Search" className="form-control" placeholder="search" onChange={this.onChange} />
                   </div>
                   <div className="col">
                        <input label="Input a number" className="form-control" placeholder="Input a  number" onChange={this.onChangeByYds}/>
                   </div>
                    <div className="col text-center">
                        <CSVLink filename="players_rushing_statistics"  data ={this.state.displayResults}>  <span class="glyphicon glyphicon-download-alt"></span>Download </CSVLink> 
                    </div>
                </div> 
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                        <td>Player</td>
                        <td>Team</td>
                        <td>Pos</td>
                        <td>Att</td>
                        <td>Att/G</td>
                        <td>Yds<i type="button" className="fa fa-fw fa-sort" onClick={()=>this.sortResults("Yds")}></i></td>
                        <td>Avg</td>
                        <td>Yds/G</td>
                        <td>TD<i type="button" className="fa fa-fw fa-sort" onClick={()=>this.sortResults("TD")}></i></td>
                        <td>Lng<i type="button" className="fa fa-fw fa-sort" onClick={()=>this.sortResults("Lng")}></i></td>
                        <td>1st</td>
                        <td>1st%</td>
                        <td>20+</td>
                        <td>40+</td>
                        <td>FUM</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.displayResults.map((row, i) => <TableRow key={i} row={row}/>)
                    }
                    </tbody>
                </table>
                <div>
                    <Form addNewRecord={this.addNewRecord}/>
                </div>
                <div>
                  <FormSubmit />
                </div> 
            </div>
        );
    }
}


const TableRow = ({ row }) =>
  <tr>
      <td>{row["Player"]}</td>
      <td>{row["Team"]}</td>
      <td>{row["Pos"]}</td>
      <td>{row["Att"]}</td>
      <td>{row["Att/G"]}</td>
      <td>{row["Yds"]}</td>
      <td>{row["Avg"]}</td>
      <td>{row["Yds/G"]}</td>
      <td>{row["TD"]}</td>
      <td>{row["Lng"]}</td>
      <td>{row["1st"]}</td>
      <td>{row["1st%"]}</td>
      <td>{row["20+"]}</td>
      <td>{row["40+"]}</td>
      <td>{row["FUM"]}</td>
  </tr>


export default StatisticsTable