/* 9.Stock Visualizer. For this view, display a line chart of the close values for a single month for up to three stocks. That is, the x-axis will contain the days, while the y-axis will be money. There should be four drop-down lists: one to select month, the others to select stocks. The drop-down should display symbol and name. Be sure to use different colors for each line. */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Chart } from 'react-google-charts';

// TODO: CSS

//----------------------------------
//Displays a graph containing a chosen single month's historical closing data for up to three stocks. 
//----------------------------------    
class StockVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            userid: this.props.userid,
            // month array which will be used to determine the amount of days in a month and display accurate information
            months:[{num:"01",mon:"January"},{num:"02",mon:"February"}, {num:"03",mon:"March"},{num:"04",mon:"April"},{num:"05",mon:"May"},{num:"06",mon:"June"},{num:"07",mon:"July"},{num:"08",mon:"August"},{num:"09",mon:"September"}, {num:"10" ,mon:"October"}, {num:"11", mon:"November"}, {num:"12", mon:"December"}],
            month:'',
            monthNum:'',
            // COMPANYLIST FILLED ON COMPONENTMOUNT HOLDS THE STOCKS SYMBOL AND NAME TO POPULATE THE DROPDOWNS
            companyList: '',
            displayDropData: false,
            data2:'', data3:'', data4:'',
            
            // OPTIONS FOR THE GRAPH
            options: {
                title: 'Stock close per day of month',
                interpolateNulls: true,
                animation:{
                    duration: 1000,
                    easing: 'inAndOut',
                    startup: true,
                },
                legend: {position: 'top', maxLines: 4},
            },
        };
    }
    
    //----------------------------------
    // Once the component mounts it calls the api as described below
    //----------------------------------
    componentDidMount(){
        axios.get("https://obscure-temple-42697.herokuapp.com/api/companies/list/").then(response => {
            // FORMAT OF DATA RETURNED: id:20, owned:364, symbol:"MSFT", user:119, _id:"5aa8738f3b516a49fe08b1b5"
            this.setState({companyList: response.data});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });
    }
    
    //----------------------------------
    // Setting up the functions to be mounted upon right before component mount 
    // attaches a resize listener for the options of the chart legend making it more readable on different viewports
    //----------------------------------
    componentWillMount() {
        // https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/
      window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    //----------------------------------
    // Detaching the listener on unmount of the component
    //----------------------------------
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    //----------------------------------
    // Is called on viewport change to change the options of the chart legend making it more readable on different viewports
    //----------------------------------
    handleWindowSizeChange = () => {
      let options = this.state.options;
      if (window.innerWidth<= 768){
        options.legend = {position: 'top', maxLines: 4}; 
        this.setState({options: options},this.populateGraphDate);
      }else{
        options.legend = {position: 'right'};
        this.setState({options: options}, this.populateGraphDate);
      }
    }
    
    //----------------------------------
    // populates the graph with a customized data format and triggers the plot of the graph
    //----------------------------------
    populateGraphDate= ()=>{
        let data = [];
        //resets the data state to ensure accurate data is displayed
        this.setState({data:null});
        //call the populate data to graph 
        this.populateDataArrayConditionally(data);
    }
    
    //----------------------------------
    // called to populate the data array depending on the number of variables selected
    //----------------------------------
    populateDataArrayConditionally=(chartData)=>{
        let dates =[],daysInMonth,arr1=[], arr2=[], arr3=[], getClose;
        // gets the number of days in a month for the chosen month 
        daysInMonth = new Date(this.state.monthNum, 2017, 0).getDate();
        for (let i = 1; i<=daysInMonth; i++){
            let currentDay = "2017-"+ this.state.monthNum+"-"+('0' + i).slice(-2);
            dates.push(currentDay);
        }
        //each data check if the stock exists and if it doesnt add a null
        getClose = (object)=>{if(object || typeof(object) !== "undefined")return object.close; else return null};
        // THIS ELEMENT IS THE FIRST IN THE CHART ARRAY AND IT IS THE LABELS FOR THE AXIS, NEEDS ADDITIONAL ELEMENTS FOR EACH ROW (STOCK) ADDED
        let chartLabel = [{"label":"date","type":"string"}];
        // CHECK FOR THE STATE OF THE NAME ON THE DROPDOWN
        let buildArray = (number)=>{
            let identifier = "data" + number;
            let name = identifier + "name";
            if (this.state[name]){ 
            // PUSHES THE EXTRA ITEM TO THE CHART LABEL WITH THE NECESSARY SYNTAX 
            chartLabel.push({"label":this.state[identifier][0].name,"type":"number"});
                for (let date of dates ){
                    // loop through each stock and fill the data array with the points necessary to plot the graph 
                    let temp = this.state[identifier].find((data)=>{if(data.name ===  this.state[identifier][0].name && data.date.trim() === date){return data}else return null});
                    // eslint-disable-next-line
                    eval("arr" + (number-1)).push(getClose(temp));
                }
            }
        };
        // CALL THE BUILDARRAY FUNCTION TO PUPULATE POINTS FOR CHART 
        for (let i =2; i<5;i++)buildArray(i);
        // POPULATE THE FINAL ARRAY DEPENDING ON THE SET STATES
        chartData.push(chartLabel);
        for (let i=0; i<dates.length; i++){
            // CREATES AN ARRAY OBJECT AND PUSHES THE POPULATED ARRAYS PER POSITION (WHICH HAS BEEN FILLED WITH NULLS FOR DATES WITHOUT A DATA POINT)
            let toPush =[];
            toPush.push(dates[i]);    
            if (arr1.length > 0) toPush.push(arr1[i]);
            if (arr2.length > 0) toPush.push(arr2[i]);
            if (arr3.length > 0) toPush.push(arr3[i]);
            chartData.push(toPush);
        }
        // MAKE SURE THAT AT LEAST ONE OF THE DROPDOWN'S OPTIONS HAVE BEEN SELECTED BEFORE GRAPHING
        if (this.state.data2name || this.state.data3name || this.state.data4name){
            this.setState({data:chartData});
        }
    }
    
    //----------------------------------
    // called on click on every stock option from the dropdown lists, changes the state of the object passed in and uses a callback to re-populate the graph
    //----------------------------------
    graphTrigger= (dropdownObject, id)=>{
        if (this.state.monthNum){
            let symbol = dropdownObject[id];
            axios.get("https://obscure-temple-42697.herokuapp.com/api/prices/symandmonth/"+symbol+"/"+this.state.monthNum).then(response => {
                // FORMAT OF DATA RETURNED: id:20, owned:364, symbol:"MSFT", user:119, _id:"5aa8738f3b516a49fe08b1b5"
                // this.setState({userPortfolio:response.data});
                let data = ({[id]: response.data});
                let tempName = ""+id+"name";
                // eslint-disable-next-line
                let companyName = this.state.companyList.find((el)=>{if(el.symbol === symbol) return el.name}).name;
                let name = ({[tempName]: companyName});
                this.setState(name);
                this.setState(data, this.populateGraphDate);
            })
            .catch(function (error){
                alert('Error with api call ... error=' + error);
            });
            // this.setState(dropdownObject, this.populateGraphDate);
        }
    }
    
    //----------------------------------
    // Toggles a dropdown on click by using the string passed in as id
    //----------------------------------
    toggleDropdown = (dropMe)=>{
        let drop = document.querySelector("#"+dropMe);
        let expanded = false;
        if (drop.classList.contains('is-active')){
            expanded= true;
        } 
        [].map.call(document.querySelectorAll('.is-active'), function(el) {
            el.classList.remove('is-active');
        });
        this.populateGraphDate();
        if (!expanded)drop.classList.add('is-active');
    }
    
    //----------------------------------
    // Takes the month chosen from the dropdown list and sets the flag displayDropData to allow the stock dropdown lists to appear 
    //----------------------------------
    filterList = (currentmonth)=>{
        let changeMonth=()=>{
        if (this.state.companyList && !this.state.displayDropData)
            this.setState({displayDropData: true});
        else 
            // SET THE AVAILABILITY OF THE ARRAYS OF STOCKS FOR THE THREE STOCK DROPDOWNS
            this.refreshMonth();
        }
        this.setState({month:currentmonth.element.month.mon });
        this.setState({monthNum: currentmonth.element.month.num}, changeMonth);
        
    }
    
    //----------------------------------
    // refreshes the graph if the month
    //----------------------------------
    refreshMonth=()=>{
        for (let i=2; i<5;i++){
            if (this.state["data" + i +"name"]){this.graphTrigger({["data" +i]:this.state["data"+i][0].name}, "data" + i)}
        }
    }
    
    //----------------------------------
    // Programatically creates the dropdowns for the stocks.
    //----------------------------------
    createDropdowns=()=>{
        let elementsToReturn=[];
        for (let i=2; i<5;i++){
            let drop = "data"+i;
            let name = drop+"name";
            elementsToReturn.push(
                <div className="column is-one-fourth" key={i}>
                    <div className="dropdown is-fullwidth" id={drop}  onClick={()=>this.toggleDropdown(drop)}>
                            <div className="dropdown-trigger">
                                <button className="button is-fullwidth is-primary is-inverted" aria-haspopup="true" aria-controls="dropdown-menu2">
                                  {/* CHECKS FOR THE STATUS OF THE ARRAY BEING POPULATED, IF IT ISNT DISPLAY CHOOSE A STOCK OTHERWISE DISPLAY THE SYMBOL AND NAME */}
                                  <span className="">{this.state[drop]? "["+this.state[drop][0].name+"] "+ this.state[name]:"Choose a stock"}</span>
                                  <span className="icon is-small is-pulled-right	">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                  </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id={"dropdown-menu"+i} role="menu">
                                <div className="dropdown-content scrollable-menu">
                                {/* THIS CHECKS FOR THE COMPANY LIST ARRAY AND IF POPULATED THEN PROGRAMATICALLY FILLS THE OPTIONS OF THE DROPDOWN */}
                                {this.state.companyList?this.state.companyList.map((stock, ind) => {
                                        return(
                                           <div className="dropdown-item" key={ind} onClick={()=>this.graphTrigger({[drop]:stock.symbol}, drop)}>{"["+stock.symbol+"]" + stock.name}
                                            </div>
                                        );
                                    }):<div className="dropdown-item" disabled>  First choose a month</div>
                                }
                                </div>
                        </div>
                    </div>
                </div>
            );}
        return elementsToReturn;
    }
    
    render(){
        return(
            
            <div className="section" id="dropdown_container">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to={"/" }>Home</NavLink></li>
                    <li className="is-active"><span >&nbsp;&nbsp;</span>Stock Visualizer</li>
                  </ul>
                </nav>
                <div className = "box">
                <div className = "section" id = "dropdown_container">
                    <div className = "columns is-multiline">
                        <div className = "column is-one-quarter">
                            <div>
                                <div className = "dropdown is-fullwidth" id = "drop1" onClick={()=>this.toggleDropdown("drop1")}>
                                    <div className = "dropdown-trigger">
                                        <button className = "button is-primary is-inverted" aria-haspopup = "true" aria-controls = "dropdown-menu1">
                                            <span>
                                                {this.state.month?this.state.month:"Choose A Month"}
                                            </span>
                                            <span className = "icon is-small is-pulled-right">
                                                <i className = "fas fa-angle-down" aria-hidden = "true">
                                                </i>
                                            </span>
                                        </button>
                                    </div>
                                    <div className = "dropdown-menu" id = "dropwdown-menu1" role = "menu">
                                        <div className = "dropdown-content">
                                            {/* populates the month dropdown with the months of the year */}
                                            {this.state.months.map((month, ind) => {
                                                let element = {month: month, drop: "drop1", num: month.num};
                                                    return (
                                                        <div className = "dropdown-item" key = {ind} onClick = {() => this.filterList({element})}>{month.mon}
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* RENDER THE THREE DROPDOWNS FOR THE STOCKS IF THE BOOLEAN DISPLAYDROPDATA IS TRUE OTHERWISE DISPLAY A MESSAGE*/}
                        {this.state.displayDropData?this.createDropdowns():
                            <div>
                                To choose stocks and display data graphs please first choose the month you wish to see the data for
                            </div>
                        }
                    </div>
                    {/* Check to make sure the data is loaded and displays upon data load/ reload */}
                    {this.state.data?
                        <div>
                            <Chart
                                chartType="LineChart"
                                data={this.state.data}
                                options={this.state.options}
                                graph_id="LineChart"
                                width="100%"
                                height="400px"
                                legend_toggle
                            />
                        </div>
                    : null}
            </div>

                
            </div>
            </div>
        );
    }
}
export default StockVisualizer;