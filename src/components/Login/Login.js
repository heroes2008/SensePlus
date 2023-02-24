import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Login.css";
import logo from "../../assets/logo.png";

async function loginUser(credentials) {
  debugger;
  let creds = JSON.stringify(credentials);
  return fetch("http://claricesystems.in:8082/api/session", {
    method: "POST",
    headers: {
      authorization: "Basic Z2FqYW5hbmQuYkBzYWthdGEuaW46Z2JAc2FrYXRh",
      //"Content-Type": "application/x-www-form-urlencoded",
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json, application/xml, text/plain, text/html, *.*",
    },
    body: creds,
  }).then((data) => data.json());
  // const token = {
  //   token: "test123",
  // };
  // return token;
}

export const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email: username,
      password: password,
    });
    debugger;
    //setToken(token);
  };

  return (
    // <div className="login-wrapper">
    //   <h1>Please Log In</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <p>Username</p>
    //       <input type="text" onChange={(e) => setUserName(e.target.value)} />
    //     </label>
    //     <label>
    //       <p>Password</p>
    //       <input
    //         type="password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </label>
    //     <div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
    // </div>
    <>
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4">
              <Form
                className="m-3"
                onSubmit={handleSubmit}
                style={{ borderStyle: "solid", borderWidth: "0.25px" }}
              >
                <div
                  style={{ backgroundColor: "black", borderWidth: "0.25px" }}
                >
                  <img src={logo} height="60" width="120" />
                </div>
                <Form.Group className="m-3" controlId="deviceList">
                  <h1>Please Log In</h1>
                  <div>
                    <Form.Label className="mt-3 me-3 mb-3 fw-bold">
                      User Name
                    </Form.Label>
                  </div>
                  <div>
                    <input
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                    />{" "}
                  </div>
                  <div>
                    <Form.Label className="mt-3 me-3 mb-3 fw-bold">
                      Password
                    </Form.Label>
                  </div>
                  <div>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </Form.Group>
                <Button className="m-3" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
