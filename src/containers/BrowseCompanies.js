/*Browse Companies. For this view, display a list of companies (and their logos) sorted by name. Each company name will be a link/route to a Single Company view. */
// TODO: CSS (remove table and implement another type of layout, looks like crap on iPad viewport) and comments



import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../styles/base/app.scss';


class BrowseCompanies extends Component {
    constructor(props){
        super(props);
        this.state = {
            companies: []
        };
    }

    componentDidMount(){
        axios.get("https://obscure-temple-42697.herokuapp.com/api/companies/list").then(response => {
            this.setState({companies:response.data.sort((a,b)=>{ let result  =0; if(a.name>b.name){result=1;}else if(b.name>a.name){result=-1;} return result;})});
        })
        .catch(function (error){
            alert('Error with api call ... error=' + error);
        });
    }
    
    
    render(){
        if (! this.state.companies || this.state.companies.length === 0){
            return null;
        }else{
            return(
                <div>
                <article className="section">
                    {/*Breadcrumb*/}
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                      <ul>
                        <li><NavLink to={"/" }>Home</NavLink></li>
                        <li className="is-active"><span >&nbsp;&nbsp;</span>Companies</li>
                      </ul>
                    </nav>
                    <div className = "columns is-multiline">
                        {this.state.companies?
                            this.state.companies.map((company, ind) => {
                                return (
                                    <div className = "column is-4" key={ind}>
                                        <div className = "card">
                                             <NavLink to={"/company/" + company.symbol} className="" symbol={company.symbol} key={ind}>
                                            <div className="card-image">
                                                <div className="box is-centered">
                                                    {/* https://stackoverflow.com/questions/44154939/load-local-images-in-react-js */}
                                                    <figure className="image is-3by2">
                                                        <img src={process.env.PUBLIC_URL + '/logos/'+ company.symbol+ '.svg'} alt={company.symbol} />
                                                    </figure>
                                                </div>
                                            </div>
                                            </NavLink>
                                            <div className="card-content">
                                                <div className = "media">
                                                    <div className = "media-content">
                                                    <br/>
                                                        <NavLink to={"/company/" + company.symbol} className="button is-black is-fullwidth is-rounded is-inverted" symbol={company.symbol} key={ind}>{company.name}
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }):null
                        }
                    </div>
                    </article>
                </div>
                
            );
        }
    }
}
export default BrowseCompanies;