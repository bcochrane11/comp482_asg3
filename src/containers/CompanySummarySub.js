import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

//TODO: CSS

//----------------------------------
// 7 a. Tab displayed in the single company view which displays:
//       1. The information summary for the selected company 
//       2. A bar chart of the average close price for each month.
//----------------------------------
class CompanySummarySub extends Component {
    constructor(props){
        super(props);
        this.state ={
            // Setting the state for the company right away passed in from the props of the main container. Since this is the default view we want this information to be displayed right away while the chart loads.
            company : props.company,
            // options for the graph
            options: {
                title: 'Stock closing summary per month',
                animation:{duration: 1000,easing: 'inAndOut',startup: true},
                is3D: true,
                seriesType: 'bars',
                series: {12: {type: 'line'}},
                vAxis: {title: 'Dollars'},
                hAxis: {title: 'Month'},
                legend: {position: 'none', maxLines: 4},
            },
            months : (['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']),
            // The data for the graph
             data : ''
        };
    }
    
    //----------------------------------
    // Once the component mounts it calls the api as described below
    //----------------------------------
    componentDidMount(){
        
        //GET THE HISTORICAL DATA FOR THE AVERAGE CLOSE PRICE FOR EACH MONTH AND SETS THE DATA STATE FOR THE GRAPH
        axios.get("https://obscure-temple-42697.herokuapp.com/api/prices/average/" + this.state.company.symbol).then(response => {
            let stateData = [
                 ['Month','Average']];
            for (let i = 0; i<12; i++){
                stateData.push([(this.state.months[i]), Number(response.data[i].closeavg)]);
            }
            this.setState({data:stateData});
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
      this.setState({ width: window.innerWidth });          
      let options = this.state.options;
      if (window.innerWidth<= 500){
        options.legend = {position: 'top', maxLines: 4}; 
        this.setState({options: options},this.populateGraphDate);
      }else{
        options.legend = {position: 'right'};
        this.setState({options: options}, this.populateGraphDate);
      }
    };

    render(){
        if (!this.state.company) {return null;}
            else return (
                <div className = "columns">
                    <div className = "column">
                        <div className = "message is-success">
                            <div className = "message-header">
                                {this.state.company.name}
                            </div>
                            <div className = "message-body">
                                <p><b>Symbol: </b>{this.state.company.symbol}</p>
                                <p><b>Sector: </b>{this.state.company.sector}</p>
                                <p><b>Subindustry: </b>{this.state.company.subindustry}</p>   
                                <p><b>Headquarters: </b>{this.state.company.address}</p>
                                <p><b>Date added: </b>{this.state.company.date_added}</p>           
                                <p><b>Central Index Key (CIK): </b>{this.state.company.CIK}</p>
                                <p><b>Frequency: </b>{this.state.company.frequency}</p>
                            </div>
                        </div>
                        <div>
                        {/* Check to make sure the stock closing historical data is loaded and displays upon data load */}
                        {this.state.data?
                        <Chart
                          chartType="ComboChart"
                          data={this.state.data}
                          options={this.state.options}
                          graph_id="ComboChart"
                          width="100%"
                          height="400px"
                        />
                        /* displays nothing if data is not set */
                        :null}
                        
                    </div>
                    </div>
                </div>
            );
           
    }
}
export default CompanySummarySub;