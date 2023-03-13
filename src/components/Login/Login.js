import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Login.css";
import logo from "../../assets/logo.png";
//import { useLoginMutation } from "../../features/api/apiSlice";

async function login(credentials) {
  var formBody = [];
  for (var key in credentials) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(credentials[key]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  //debugger;
  //let creds = JSON.stringify(credentials);
  return fetch("http://claricesystems.in:8082/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    body: formBody,
  }).then((data) => data.json());
}

export function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = async (e) => {
    console.log("email:" + email);
    console.log("password:" + password);
    e.preventDefault();
    let token = null;
    try {
      // const token = await login({
      //   email: email,
      //   password: password,
      // }).unwrap();
      token = await login({
        email,
        password,
      });
    } catch (err) {
      //debugger;
      console.error("Error with login: ", err);
    }
    //debugger;
    console.log(token);
    if (token)
      setToken({ email, password, userid: token.id, username: token.name });
  };

  return (
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
                      onChange={(e) => setEmail(e.target.value)}
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
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
