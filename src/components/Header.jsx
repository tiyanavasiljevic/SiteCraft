
import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"


const Header = ()=>{

    return(
<div className="navbar">
       <ul className="navigation">
        <li className="navlink"><NavLink to="/Dashboard">Dashboard</NavLink></li>
        <li className="navlink"><NavLink to="/Chat">Chat</NavLink></li>
        <li className="navlink"><NavLink to="/SendMail">SendMail</NavLink></li>
        <li className="navlink"><NavLink to="/Login">LogIn</NavLink></li>
        <li className="navlink"><NavLink to="/Register">Register</NavLink></li>
       </ul>
       </div>
    );
};


export default Header;