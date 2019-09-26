import React from 'react';
import { NavLink } from 'react-router-dom';
const NotFound = function(props){
    return(
            <div className="section">
                Page not found. Please go back to the home page and choose a valid link
                <hr/>
                <div className="button" ><NavLink to={"/Home"}>Home</NavLink></div>
            </div>
        );
};
export default NotFound;