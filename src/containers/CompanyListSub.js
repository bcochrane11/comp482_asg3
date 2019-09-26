
// TODO: CSS.

import React, { Component } from 'react';
import axios from 'axios';

//----------------------------------
// 7 B .display a drop-down list with the months of the year. When the user selects a month, display a table with the price information (date, low, high, close) for each day of the month that has data.
//----------------------------------
class CompanyListSub extends Component{
    
    constructor(props){
        super(props);
        this.state ={
            months:[{num:"01",mon:"January"},{num:"02",mon:"February"}, {num:"03",mon:"March"},{num:"04",mon:"April"},{num:"05",mon:"May"},{num:"06",mon:"June"},{num:"07",mon:"July"},{num:"08",mon:"August"},{num:"09",mon:"September"}, {num:"10" ,mon:"October"}, {num:"11", mon:"November"}, {num:"12", mon:"December"}],
            month:'',
            symbol: props.symbol,
            historicalData:''
        };
    }
    
    //----------------------------------
    // Calls the api for the historical data from a month passed in and gets a stock's monthly historical information once the user has clicked the month in the dropdown menu
    // TRIGGERED BY: dropdown menu with id drop1
    // RETURNS: null, but it sets the state of historicalData and month. an array of monthly historical informa
    //----------------------------------
    getCompanyInfoMonth=(monthData)=>{
        //When the user selects a month, display a table with the price information (date, low, high, close) for each day of the month that has data.
        axios.get("https://obscure-temple-42697.herokuapp.com/api/prices/symandmonth/" + this.state.symbol + "/" + monthData.month.num ).then(response => {
            this.setState({historicalData:response.data.sort((a,b)=>{ let result  =0; if(a.date>b.date){result=1;}else if(b.date>a.date){result=-1;} return result;})});
            this.setState({month: monthData.month.mon});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });
    }
    //----------------------------------
    // Toggles the dropdown if the user clicks on the dropdown (up or down) by toggling the "is-active" class with the id passed in
    //----------------------------------
    toggleDropdown = (dropMe)=>{
        let drop = document.querySelector("#"+dropMe);
        drop.classList.toggle("is-active");
    }
    
    sort=(id)=>{
        let historicalData = this.state.historicalData;
        if (document.querySelector("#"+ id).classList.contains(".desc")){
            historicalData.sort((a, b)=>{let result =0;if (a[id] <b[id])result=1;else if(b[id]<a[id])result=-1;return result;});
            this.setState({historicalData:historicalData});
            document.querySelector("#"+ id).classList.remove(".desc");
            document.querySelector("#"+ id).classList.add(".asc");
        }else{
            historicalData.sort((a, b)=>{let result =0;if (a[id] <b[id])result=-1;else if(b[id]<a[id])result=1;return result;});
            this.setState({historicalData:historicalData});
            document.querySelector("#"+ id).classList.add(".desc");
            document.querySelector("#"+ id).classList.remove(".asc");
        }
    }
    
    render(){
        return(
            <div>
                <div className="section" id="dropdown_container">
                    <div className="dropdown" id="drop1" onClick={()=>this.toggleDropdown("drop1")}>
                        <div className="dropdown-trigger">
                            <button className="button is-primary is-fullwidth is-inverted" aria-haspopup="true" aria-controls="dropdown-menu1">
                                {/* IF THE MONTH IS SET DISPLAYS THE MONTH OTHERWISE ASKS TO CHOOSE A MONTH  */}
                              <span>{this.state.month?this.state.month:"Choose a month"}</span>
                              <span className="icon is-small">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                              </span>
                            </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu1" role="menu">
                            <div className="dropdown-content">
                            {// CREATES DROPDOWN OPTIONS AS IT ITERATES THROUGH THE MONTHS ARRAY
                                this.state.months.map((month, ind) => {
                                    return(
                                        <div className="dropdown-item" key={ind} onClick={()=>this.getCompanyInfoMonth({month})}>{month.mon}
                                        </div>
                                    );
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Checks the status of the data, once the data is populated by the api call it displays the table with the monthly historical information*/}
                {this.state.historicalData?
                    <table className = "table is-striped">
                        <thead>
                            <tr>
                                <th onClick={()=>this.sort("date")} id="date"><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;Date</span></span></th>
                                <th onClick={()=>this.sort("open")} id="open"><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;Open</span></span></th>
                                <th onClick={()=>this.sort("high")} id="high"><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;High</span></span></th>
                                <th onClick={()=>this.sort("low")} id="low"><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;Low</span></span></th>
                                <th onClick={()=>this.sort("close")} id="close"><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;Close</span></span></th>
                                <th onClick={()=>this.sort("volume")} id="volume"><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;Volume</span></span></th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* Map the historical data to output a table row with the data for the specific date */}
                         {this.state.historicalData.map((month, ind)=>{
                            return(
                                <tr key={ind}>
                                    <td >{month.date}</td>
                                    <td >{month.open}</td>
                                    <td >{month.high}</td>
                                    <td >{month.low}</td>
                                    <td >{month.close}</td>
                                    <td >{month.volume}</td>
                                </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                // RETURNS NULL IF HISTORICALDATA STATE IS NOT SET
                :null}
            </div>
        );
    }
    
}
export default CompanyListSub;