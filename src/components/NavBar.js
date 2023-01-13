import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export const NavBarCollapsible = () => {
  let activeStyle = {
    textDecoration: "underline",
  };
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
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {/* <Nav.Link className="btn btn-primary text-black"> */}{" "}
            <NavLink className="btn btn-primary" to="/Login">
              Login
            </NavLink>
            {/* </Nav.Link> */}
          </Nav>
          <Outlet></Outlet>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
