
import React from "react";
// import "./Header.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';



const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/Dashboard">SiteCraft</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/Chat">Chat</Nav.Link>
            <Nav.Link as={NavLink} to="/SendMail">SendMail</Nav.Link>
            <Nav.Link as={NavLink} to="/Login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/Register">Register</Nav.Link>
            {user && (
              <Button variant="link" onClick={handleLogout} className="nav-link">
                Log Out
              </Button>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};


export default Header;