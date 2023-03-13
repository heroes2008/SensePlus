import React from "react";
import { useDevicesQuery } from "../features/api/apiSlice";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReportForm } from "./ReportForm";
import { Login } from "../components/Login/Login";
import useToken from "../components/Login/useToken";

export const Profile = () => {
  const { token, setToken } = useToken();
  console.log("Profile->token:" + token);
  const username = localStorage.getItem("username");

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <>
      <h1 className="m-5 text-center">Profile</h1>
      {username && (
        <Container>
          <Row
            className="m-3"
            style={{ borderStyle: "solid", borderWidth: "0.25px" }}
          >
            <Col xs={12}>
              <h3>Hello, {username} </h3>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
