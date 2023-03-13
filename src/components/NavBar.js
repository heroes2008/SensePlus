import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../../src/styles.css";
import { Login } from "../components/Login/Login";
import useToken from "../components/Login/useToken";

export const NavBarCollapsible = () => {
  // const userid = localStorage.getItem("userid");

  // const [display, setDisplay] = useState("notdisplayed");

  // const showButton = (e) => {
  //   e.preventDefault();
  //   setDisplay("displayed");
  // };

  // const hideButton = (e) => {
  //   e.preventDefault();
  //   setDisplay("notdisplayed");
  // };

  // let activeStyle = {
  //   textDecoration: "underline",
  // };
  const { token, setToken } = useToken();
  console.log("Navbar->token:" + token);
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/dashboard">
          <img src={logo} height="60" width="120" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav>
              <ul>
                <li>
                  <NavLink
                    to="/dashboard"
                    style={({ isActive }) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            </Nav>
            <Nav>
              <ul>
                <li>
                  <NavLink
                    to="/graphs"
                    style={({ isActive }) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    Graphs
                  </NavLink>
                </li>
              </ul>
            </Nav>
            <Nav>
              <ul>
                <li>
                  <NavLink
                    to="/reports"
                    style={({ isActive }) => ({
                      color: isActive ? "greenyellow" : "white",
                    })}
                  >
                    Reports
                  </NavLink>
                </li>
              </ul>
            </Nav>
          </Nav>
          <Nav>
            <NavDropdown title="Settings" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Nav>
              <NavLink className="btn btn-primary" to="/Login">
                Logout
              </NavLink>
            </Nav> */}
          <Outlet></Outlet>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
