import React, { Component} from "react";

import { CSVLink, CSVDownload } from "react-csv";

class StatisticsTable extends Component{

    constructor(props){
        super(props)
        this.state = {
            originalResults:[],
            displayResults:[],
            error: null,
            isLoaded:[]
        }
    }


    componentDidMount() {
        fetch("http://localhost:8080/records")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
              this.setState({
                isLoaded: true,
                originalResults: result,
                displayResults: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
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

        const data = this.state.data;
        const headers = this.state.header
        
        return (
            <div>
               <div className="row">
                   <div className="col">
                        <input label="Search" className="form-control" placeholder="search" onChange={this.onChange} />
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
                        this.state.displayResults.map(row => <TableRow row={row}/>)
                    }
                    </tbody>
                </table>
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