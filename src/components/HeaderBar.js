import React from 'react';
import { NavLink } from 'react-router-dom';


class HeaderBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //This state property is the handler for the burger menu displayed only in mobile form
            showMenu: false,
            // states available through user: id, first_name, last_name, email
            user: this.props.user,
            logout: this.props.logoutfn,
            optionsArray: [{path:"/companies", legend:"Companies", msg: "Browse the companies in our system" },{path:"/portfolio", legend: "Portfolio", msg: "Browse your portfolio"},{path:"/visualizer", legend: "Stock Visualizer", msg: "Interactive stock information"},{path:"/aboutus", legend:"About Us", msg: "Find out more about this system"},{path:"/", legend: "Logout", msg: null}]
        };
    }
    
    //-----------------------------------------------------
    // Displays the desktop menu onMouseIn
    //-----------------------------------------------------
    triggerMenu = ()=>{
       document.querySelector('#mainMenu').classList.add("is-active");
    }
    //-----------------------------------------------------
    // Removes the desktop menu onMouseOut
    //-----------------------------------------------------
    removeMenu = ()=>{
       document.querySelector('#mainMenu').classList.remove("is-active");

    }
    
    //-----------------------------------------------------
    //Toggles the burger menu on mobile and on click of a menu item
    //-----------------------------------------------------
    toggleMenu = ()=>{
        if (this.state.showMenu){
            this.setState({showMenu:false})
        }else{
            this.setState({showMenu:true})
        }
        document.querySelector('#navBurger').classList.toggle("is-active");
        document.querySelector('.navbar-menu').classList.toggle("is-active");
    }
    
    render(){
        return(
        <nav className="navbar is-primary"> 
            <div className="navbar-brand">
              
                <NavLink className="navbar-item" to={ {pathname: "/home" }}>                   
                        <h1 className="title is-5">{this.state.user.first_name} {this.state.user.last_name}</h1>
                </NavLink>                      
                {/* empty container found to be needed as a place holder for the burger meny contracted*/}
                <a className=" navbar-burger" id="navBurger" onClick={this.toggleMenu}>
                     <span></span>
                     <span></span>
                     <span></span>
                </a>
            </div>
                {/*<h1><NavLink to={'/'} className="dropdown-item" onClick={this.state.logout}> Logout</NavLink></h1>*/}
            {/* Contracted burger menu at start */}
            <div className="navbar-menu  navbar-dropdown">
            <NavLink to={'/'} className="dropdown-item" onClick={this.state.logout}> Logout</NavLink>
                <div className="navbar-end">
                    {/* EACH ELEMENT IS ITERATED FROM THE OPTIONSARRAY */}
                    {this.state.optionsArray.map((option, ind)=>{
                     return (
                         <div key={ind}>
                             <NavLink className="navbar-item" to={ {pathname: option.path }} onClick={option.msg?this.toggleMenu:this.state.logout} >
                                <div className="">{option.legend}</div>
                                <div>{option.msg}</div>
                             </NavLink>
                             {option.msg?
                             <hr className="dropdown-divider"/>:null}
                        </div>
                    )})}
                </div>
            </div>
            
            {/* Desktop menu, not visible on mobile*/}
            <div className="navbar-end is-hidden-touch" id="desktop-menu" >
            {/* SINCE THERE IS NO MSG OPTION ON LOGOUT IT RENDERS DIFFERENT FUNCTIONS ON CLICK */}
            <div id="mainMenu" className="dropdown is-right  is-fullheight" onMouseOver ={()=> this.triggerMenu()} onMouseOut={()=>this.removeMenu()}>
              <div className="dropdown-trigger" >
                <button className="button is-primary  is-fullheight" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Menu</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  {/* EACH ELEMENT IS ITERATED FROM THE OPTIONSARRAY */}
                    {this.state.optionsArray.map((option, ind)=>{
                        return (
                          <div key={ind}>
                              {/* SINCE THERE IS NO MSG OPTION ON LOGOUT IT RENDERS DIFFERENT FUNCTIONS ON CLICK */}
                              <NavLink to={option.path} className="dropdown-item" onClick={option.msg?null:this.state.logout}>
                                <div className="">{option.legend}</div>
                                <div>{option.msg}</div>
                              </NavLink>
                              {option.msg?
                                 <hr className="dropdown-divider"/>:null}
                          </div>
                        )})}
                </div>
              </div>
            </div>
            </div>
           
        </nav>     

        );
    }
}
export default HeaderBar;