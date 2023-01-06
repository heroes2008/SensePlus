import React from "react";
import logo from "../logo.svg";
import { useDevicesQuery } from "../features/api/apiSlice";
import { Container, Row, Col } from "react-bootstrap";
import { LineGraph } from "../components/LineGraph";
//import { RefreshReadings } from "../components/RefreshReadings";
// import { useSelector } from "react-redux";
// import { selectPollingInterval } from "../features/devices/devicesSlice";

export const Graphs = () => {
  //const pollingInterval = useSelector((state) => selectPollingInterval(state));
  const { data, isSuccess, isLoading, isFetching, refetch, isError, error } =
    useDevicesQuery();

  return (
    <>
      {isLoading && <h2 className="m-5 text-center">...Loading</h2>}
      {error && <h2 className="m-5 text-center">...Error</h2>}
      <h1 className="m-5 text-center">Temperature and Humidity Graphs</h1>
      {isSuccess && (
        <Container>
          {/* <Row>
          <Col xs={6}>
            <RefreshReadings
              refetch={refetch}
              isFetching={isFetching}
            ></RefreshReadings>
          </Col>
        </Row> */}
          <Row>
            {data?.map((device) => (
              <Col md={12} className="m-3" key={device.id}>
                <LineGraph device={device} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};
