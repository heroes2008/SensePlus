import React from "react";
import logo from "../logo.svg";
// import {
//   usePositionsQuery,
//   usePositionsAndDevicesQuery,
// } from "./features/api/apiSlice";
import { Container, Row, Col } from "react-bootstrap";
import { DeviceCard } from "../components/DeviceCard";
import { RefreshReadings } from "../components/RefreshReadings";

export const Dashboard = ({ refetch, isFetching, data }) => {
  return (
    <>
      <h1 className="m-5 text-center">SensePlus Devices List</h1>
      <Container>
        <Row>
          <Col xs={6}>
            <RefreshReadings
              refetch={refetch}
              isFetching={isFetching}
            ></RefreshReadings>
          </Col>
        </Row>
        <Row>
          {data?.map((device) => (
            <Col xs={3} className="m-3" key={device.id}>
              <DeviceCard device={device} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
