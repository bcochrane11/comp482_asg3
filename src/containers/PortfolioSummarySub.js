//b.For the Summary sub-view (which should be the default), display the following information: total number of companies in portfolio, the total number of stocks in portfolio, and the current $ worth of the portfolio. Also display a pie chart displaying a percentage summary of the portfolio information for that user (see 2a in Back-End Requirements). */

//TODO total amount of money
//TODO CSS

import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

//----------------------------------
//  display the following information: total number of companies in portfolio, the total number of stocks in portfolio, and the current $ worth of the portfolio. Also display a pie chart displaying a percentage summary of the portfolio information for that user (see 2a in Back-End Requirements). 
//----------------------------------    
class PortfolioSummarySub extends Component {
    constructor(props){
        super(props);
        this.state={
            owned:'',
            userid: this.props.userid,
            pieData: this.props.pieData,
            portfolio: this.props.portfolio,
            total: this.props.total,
            options: {
                //title: 'Portfolio distribution',
                animation:{
                    duration: 1000,
                    easing: 'inAndOut',
                    startup: true,
                },
                is3D: true,
                legend: {position: 'top', maxLines: 4},
            }
        };
    }
    componentDidMount(){
        // SETS THE NUMBER OF COMPANIES OWNED STATE FROM THE LENGTH OF THE PIEDATA MINUS THE TITLE ROW WITHIN THE ARRAY
        this.setState({owned: (this.state.pieData.length-1)});
        // CALLS FOR EACH OF THE ELEMENTS OF THE PORTFOLIO ARRAY WHICH WAS PASSED IN FROM THE PORTFOLIO PARENT AND GETS THE LATEST CLOSING PRICE THEN CALCULATES THE TOTAL AMOUNT BY MULTIPLYING 
        let total=0;
        let portfolioPrices = [];
        this.state.portfolio.map(el=>
            axios("https://obscure-temple-42697.herokuapp.com/api/prices/latest/"+el.symbol).then(response => {
                portfolioPrices.push(response.data);
                add(response.data.close * el.owned);
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        }));
        // console.log(portfolioPrices);
        let add = (equals)=>{total=total+equals; totalRecall(total)};
        let totalRecall= (total)=>this.setState({total: total});
    }
    
    //----------------------------------
    // Adds a listener for the resize of the window so that the graph can display the legend properly
    //----------------------------------
    componentWillMount() {
        // https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    //----------------------------------
    // Detaches the listener for the resize of the window so that the graph can display the legend properly
    //----------------------------------    
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    //----------------------------------
    // Attached on component mount and detached at component unmount gets the options state of the graph and modifies the position of it to display properly on the resize of the document 
    //----------------------------------
    handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });          
      let options = this.state.options;
      if (window.innerWidth<= 500){
        options.legend = {position: 'top', maxLines: 4}; 
        this.setState({options: options});
      }else{
        options.legend = {position: 'right'};
        this.setState({options: options});
      }
    };

    formatToDollars=(value)=>{
        //https://stackoverflow.com/questions/14467433/currency-formatting-in-javascript
        return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
        
    render(){
        // CHECK IF THE PIEDATA HAS BEEN POPULATED BEFORE RENDERING
        if (!this.state.pieData) {return null;}
            else return (
                <div className = "columns">
                    <div className = "column is-half">
                        <div className = "box">
                            <div className = "card">
                                <header className = "card-header">
                                    <p className = "card-header-title">
                                        Investment Summary
                                    </p>
                                </header>
                                <div className = "card-content">
                                    <div className = "content">
                                    {this.state.total?
                                        <p>Total amount invested: {this.formatToDollars(this.state.total)}
                                        </p>:null}
                                        <p>Total number of companies owned: {this.state.owned}
                                        </p>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "column is-half">
                        <div className = "box">
                        {/* Piechart */}
                            <Chart
                                chartType="PieChart"
                                data={this.state.pieData}
                                options={this.state.options}
                                graph_id="PieChart"
                                width="100%"
                                height="400px"
                                legend_toggle
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
export default PortfolioSummarySub;
