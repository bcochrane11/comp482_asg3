//    a.For the List sub-view, display the user’s portfolio information (i.e., the stock symbol, the company name, the number owned, and the current value) in a list. Just like in the first assignment, the user should be able to change the sort order by clicking on the column headings; repeated clicking will toggle between ascending and descending. The symbol and the name will be link/routes to Single Company view. For the current value, it is latest price * number owned.

// TODO CSS
import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

//----------------------------------
//  This class displays the info tab which is rendered on the browse portfolio page 
//  displays the stock owned by the client and the average close price for each month
//----------------------------------    
class PortfolioInfoSub extends Component {
    constructor(props){
        super(props);
        this.state={
            userid: this.props.userid,
            userPortfolio: this.props.portfolio,
            completePortfolio:'',
            portfolioWithClose: this.props.portfolioWithClose
        };
    }
    
    //----------------------------------
    // Once the component mounts it calls the api as described below
    //----------------------------------
    componentDidMount(){
        if (this.state.portfolioWithClose){
            let portfolioWithClose= this.state.portfolioWithClose;
            let portfolioWithName = [];

            // GETS THE SUMMARY OF STOCKS OWNED AND DISPLAYS AS A PERCENTAGE
            axios.get("https://obscure-temple-42697.herokuapp.com/api/companies/list").then(response => {
                response.data.filter((element)=> {
                  for(let el of portfolioWithClose){if (el.symbol === element.symbol){
                    let toReturn ={owned:el.owned, symbol: element.symbol, name: element.name, close: this.formatToDollars(el.close * el.owned)};
                      portfolioWithName.push(toReturn);
                      }}return null;
                });
               this.setState({completePortfolio: portfolioWithName});
            })
            .catch(function (error){
                alert('Error with api call ... error=' + error);
            });
            // eslint-disable-next-line
        }
    }
    
    formatToDollars=(value)=>{
        //https://stackoverflow.com/questions/14467433/currency-formatting-in-javascript
        return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

    sort=(id)=>{
        let porfolioComplete = this.state.completePortfolio;
        if (document.querySelector("#"+ id).classList.contains(".desc")){
            porfolioComplete.sort((a, b)=>{let result =0;if (a[id] <b[id])result=1;else if(b[id]<a[id])result=-1;return result;});
            this.setState({completePortfolio:porfolioComplete});
            document.querySelector("#"+ id).classList.remove(".desc");
            document.querySelector("#"+ id).classList.add(".asc");
        }else{
            porfolioComplete.sort((a, b)=>{let result =0;if (a[id] <b[id])result=-1;else if(b[id]<a[id])result=1;return result;});
            this.setState({completePortfolio:porfolioComplete});
            document.querySelector("#"+ id).classList.add(".desc");
            document.querySelector("#"+ id).classList.remove(".asc");
        }
    }
    render(){
        // Checks if the the information for the database api call has been successfully retrieved and displays result 
        if (!this.state.completePortfolio) {return null;}
            else{
             return (
                <table className = "table is-striped">
                    <thead>
                        <tr>
                            <th onClick={()=>this.sort("symbol")} id="symbol" ><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;Symbol</span></span></th>
                            <th onClick={()=>this.sort("name")} id="name" ><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;Name</span></span></th>
                            <th onClick={()=>this.sort("owned")} id="owned" ><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;Owned</span></span></th>
                            <th  onClick={()=>this.sort("close")} id="close" ><span><span className="level-left"><span className="fas fa-arrows-alt-v level-right is-vertical-center is-marginless" /> &nbsp;Current Price</span></span></th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* maps the user portfolio data to display the information for each of the stocks retrieved */}
                    {this.state.completePortfolio.map((stock, ind) => {
                        return(
                            <tr key={ind}>
                                <td><NavLink to={"/company/" + stock.symbol} symbol={stock.symbol} key={ind}>{stock.symbol}</NavLink></td>
                                <td><NavLink to={"/company/" + stock.symbol} symbol={stock.symbol} key={ind}>{stock.name}</NavLink></td>
                                <td>{stock.owned}</td>
                                <td>{stock.close}</td>

                            </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            );
            }
    }
}
export default PortfolioInfoSub;




