import React from "react";

const Header = ()=>{

    return(
<div className="navbar">
       <ul className="navigation">
        <li className="navlink"><NavLink to="/">Dashboard</NavLink></li>
        <li className="navlink"><NavLink to="/about">Chat</NavLink></li>
        <li className="navlink"><NavLink to="/skills">SendMail</NavLink></li>
        <li className="navlink"><NavLink to="/contact">LogIn</NavLink></li>
        <li className="navlink"><NavLink to="/contact">Register</NavLink></li>
       </ul>
       </div>
    );
};


export default Header;