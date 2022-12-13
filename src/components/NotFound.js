import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updatePollingInterval } from "../features/devices/devicesSlice";

export const NotFound = () => {
  const dispatch = useDispatch();
  dispatch(updatePollingInterval(Number(0)));

  return (
    <>
      <Container>
        <Row>
          <h1>Page not found</h1>
        </Row>
      </Container>
    </>
  );
};
