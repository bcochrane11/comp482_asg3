/* 10.About Us. For this view, list each person in group and their contributions. Provide link to your GitHub repo. Also provide links and info about all third-party libraries used. As well, be sure to provide summary of all the tools and anything else that a future potential employer or client would be interested in knowing about. That is, use this About Us as a way to sell your skills and knowledge to potential clients/employers. */

import React from 'react';
import { NavLink } from 'react-router-dom';

//Simple about us container page
const AboutUs=()=> {
  return (
    <div className="section">
      <nav className="breadcrumb is-12" aria-label="breadcrumbs">
        <ul>
          <li><NavLink to={"/" }>Home</NavLink></li>
            <li className="is-active"><span >&nbsp;&nbsp;</span>About Us</li>
        </ul>
      </nav>
      {/*https://bulma.io/documentation/components/card/ */}
      <div className="columns">
        <div className="card column">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4 is-marginless">
                  Brandon Cochrane
                </p>
              </div>
            </div>
            <div className="content">
              This is assignment 3 for COMP482 - Human Computer Interaction from athabasca university.
              <br />
              <b>Course end date:</b> September 30, 2019
              <br />
              <br />
              <b>Technologies used</b>
              <ul>
                <li><a href="https://reactjs.org/">React</a> for the front end</li>
                <li><a href="https://nodejs.org/en/">Node</a> for the back end</li>
              </ul>
              <br />
              <nav className=" card panel column message is-info is-radiusless">
          <p className="panel-heading is-info">
            Source Code:
          </p>
          <div className="panel-block">
            <span className="panel-icon">
              <i className="fas fa-code"></i>
            </span>
            <span>
              <a > Link to front end repo</a>
            </span>
          </div>
          <div className="panel-block">
            <span className="panel-icon">
              <i className="fas fa-code"></i>
            </span>
            <span>
              <a  > Link to back end repo</a>
            </span>
          </div>
          </nav>
            </div>
          </div>
        </div>
        <nav className=" card panel column message is-info is-radiusless">
          <p className="panel-heading is-info">
            Tools and websites used:
          </p>
          <div className="panel-block">
            <span className="panel-icon">
              <i className="fas fa-ambulance"></i>
            </span>
            <span>
              <a href="http://www.stackoverflow.com" > stackoverflow</a>
                <span> 
                  &nbsp;<small> (comments in code with specific pages)</small>
                </span>
            </span>
          </div>
                    <a href="https://www.heroku.com/home" className="panel-block">
                        <span className="panel-icon">
                          <i className="fas fa-code"></i>
                        </span>
                        Heroku
                    </a>
                    <a href="http://bulma.io/" className="panel-block">
                        <span className="panel-icon">
                          <i className="fas fa-code"></i>
                        </span>
                        Bulma css framework references
                    </a>
                    <a href="https://www.udemy.com/react-the-complete-guide-incl-redux/" className="panel-block">
                        <span className="panel-icon">
                          <i className="fab fa-earlybirds"></i>
                        </span>
                        Udemy: React 16 - The Complete Guide  
                    </a>
                    <a href="https://fontawesome.com/" className="panel-block">
                        <span className="panel-icon">
                          <i className="fab fa-font-awesome"></i>
                        </span>
                        Font awesome for icons+ 
                    </a>
                    <a href="https://www.npmjs.com/package/react-easy-chart" className="panel-block">
                        <span className="panel-icon">
                          <i className="fab fa-font-awesome"></i>
                        </span>
                        React easy chart 
                    </a>
                    <a href="https://www.npmjs.com/package/react-google-charts" className="panel-block">
                          <span className="panel-icon">
                          <i className="fab fa-font-awesome"></i>
                        </span>
                        react-google-charts 
                    </a>
                    <a href="https://medium.com/@kswanie21/css-modules-sass-in-create-react-app-37c3152de9" className="panel-block">
                          <span className="panel-icon">
                          <i className="fas fa-ambulance"></i>
                        </span>
                        SASS/SCSS Walkthrough 
                    </a>
                    
                    <a href="https://taroworks.org/wp-content/uploads/2016/08/FNC.png" className="panel-block">
                        <span className="panel-icon">
                          <i className="fas fa-coffee"></i>
                        </span>
                        Lots of coffee
                    </a>
                    <a>
                    </a>
                </nav>
            </div>
        </div>
  );

};
export default AboutUs;
