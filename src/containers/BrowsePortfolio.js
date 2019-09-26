// TODO: CSS
// TODO: CHANGE USER ID ONCE LOGIN IS IMPLEMENTED
// TODO: SORTING OF B. 


import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PortfolioSummarySub from './PortfolioSummarySub.js';
import PortfolioInfoSub from './PortfolioInfoSub.js';
import axios from 'axios';


//----------------------------------
// 8. Tabs that allow the user to view either the Summary sub-view or the List sub-view. 
//    a.For the List sub-view, display the user’s portfolio information in a list. sort order by clicking on the column headings; repeated 
//    b.For the Summary sub-view (default), display the following information: total number of companies in portfolio, the total number of stocks in portfolio, and the current $ worth of the portfolio. Also display a pie chart displaying a percentage summary of the portfolio information for that user.
//----------------------------------
class BrowsePortfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            defaultTab: true,
            userid: this.props.userid,
            pieData:'',
            portfolio:'',
            portfolioWithClose:[]
        };
    }
    
    //----------------------------------
    // Once the component mounts it calls the api as described below
    //----------------------------------
    componentDidMount(){
        let portfolioInfo = [];

        // GETS THE SUMMARY OF STOCKS OWNED AND DISPLAYS AS A PERCENTAGE
        axios.get("https://obscure-temple-42697.herokuapp.com/api/portfolio/summary/"+ this.state.userid).then(response => {
            let pieData =[["symbol","owned"]];
            for (let stock of response.data){
                portfolioInfo.push({symbol: stock.symbol, owned: stock.owned});
                pieData.push([stock.symbol, stock.owned]);
            }
            this.setState({pieData: pieData});
            this.setState({portfolio: portfolioInfo});// GETS THE SUMMARY OF STOCKS OWNED AND DISPLAYS AS A PERCENTAGE
            // console.log(portfolioInfo);
            let portfolioWithClose = [];
            // eslint-disable-next-line
           portfolioInfo.map(el=>{
                    axios("https://obscure-temple-42697.herokuapp.com/api/prices/latest/"+ el.symbol).then(response => {
                        let newEl = el;
                        newEl.close = response.data.close;
                        portfolioWithClose.push(newEl);
                })
                .catch(function (error){
                    alert('Error with api call ... error=' + error);
                })});
            this.setState({portfolioWithClose:portfolioWithClose});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });
        
        
    }
    
    //----------------------------------
    // Changes the tab displayed depending on the id passed in upon clicking on the desired tab
    //----------------------------------    
    changeTab = (id)=>{
        if (id === "info") {
            this.setState({defaultTab:false});
            document.querySelector("#summary").classList.remove("is-active");
            document.querySelector("#info").classList.add("is-active");
        }
        else {
            this.setState({defaultTab:true});
            document.querySelector("#info").classList.remove("is-active");
            document.querySelector("#summary").classList.add("is-active");            
        }
    }
    
    render(){
        return(
            <article className="section">
                 <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li><NavLink to={"/" }>Home</NavLink></li>
                    <li className="is-active"><span >&nbsp;&nbsp;</span>Portfolio</li>
                  </ul>
                </nav>
                {/* Render tabs and pass in props*/}
                <div className="tabs is-boxed is-fullwidth is-marginless">
                    <ul>
                        <li className="is-active" id="summary"><a onClick={()=>this.changeTab("summary")} >Your portfolio summary</a></li>
                        <li id="info"><a onClick={()=>this.changeTab("info")}>Your portfolio information</a></li>
                    </ul>
                </div>
                <div className="box is-radiusless singleUserBox">
                    {/* RENDER TABS AND PASS IN PROPS TO THE COMPONENTS WITHIN THE TABS */}
                    {this.state.defaultTab?
                        // IF DEFAULT TAB TRUE RENDER PORTFOLIOSUMMARY THEN CHECKS THAT PIEDATA IS SET
                        this.state.pieData  && this.state.portfolio?
                        <PortfolioSummarySub userid={this.state.userid} pieData={this.state.pieData} portfolio={this.state.portfolio} />:null
                        // IF DEFAULT TAB FALSE RENDER PORTFOLIOINFOSUB THEN CHECKS THAT PORTFOLIO IS SET
                        :this.state.portfolio?
                        <PortfolioInfoSub userid={this.state.userid} portfolio={this.state.portfolio} portfolioWithClose={this.state.portfolioWithClose}/>:null
                    }
                </div>
            </article>
        );
    }
}
export default BrowsePortfolio;