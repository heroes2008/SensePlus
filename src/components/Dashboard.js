import React from "react";
import logo from "../logo.svg";
import {
  usePositionsQuery,
  usePositionsAndDevicesQuery,
} from "../features/api/apiSlice";
import { Container, Row, Col } from "react-bootstrap";
import { DeviceCard } from "../components/DeviceCard";
import { RefreshReadings } from "../components/RefreshReadings";
import { useSelector } from "react-redux";
import { selectPollingInterval } from "../features/devices/devicesSlice";

export const Dashboard = () => {
  const pollingInterval = useSelector((state) => selectPollingInterval(state));

  const { data, isSuccess, isLoading, isFetching, refetch, isError, error } =
    usePositionsAndDevicesQuery("test", { pollingInterval });

  return (
    <>
      {isLoading && <h2 className="m-5 text-center">...Loading</h2>}
      {/* {isFetching && <h2 className="m-5 text-center">...Fetching</h2>} */}
      {error && <h2 className="m-5 text-center">...Error</h2>}
      <h1 className="m-5 text-center">SensePlus Devices List</h1>
      {isSuccess && (
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
      )}
    </>
  );
};
