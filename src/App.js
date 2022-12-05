import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Counter } from "./features/counter/Counter";
import "./App.css";
import {
  usePositionsQuery,
  usePositionsAndDevicesQuery,
} from "./features/api/apiSlice";
import { Container, Row, Col } from "react-bootstrap";
import { DeviceCard } from "./components/DeviceCard";
import { RefreshReadings } from "./components/RefreshReadings";
import { useSelector } from "react-redux";
import { selectPollingInterval } from "./features/devices/devicesSlice";
import { useDispatch } from "react-redux";
import {
  devicesLoading,
  devicesReceived,
  updatePollingInterval,
} from "./features/devices/devicesSlice";

function App() {
  const dispatch = useDispatch();
  const pollingInterval = useSelector((state) => selectPollingInterval(state));

  console.log("App.js->pollingInterval:" + pollingInterval);
  //console.log(state);

  const { data, isSuccess, isLoading, isFetching, refetch, isError, error } =
    usePositionsAndDevicesQuery("test", { pollingInterval });

  // const { data, isSuccess, isLoading, isFetching, refetch, isError, error } =
  //   usePositionsQuery("test", { pollingInterval: 5000 });

  // if (data) {
  //   dispatch(devicesReceived(data));
  // }

  return (
    <>
      <h1 className="m-5 text-center">SensePlus Devices List</h1>
      {isLoading && <h2 className="m-5 text-center">...Loading</h2>}
      {/* {isFetching && <h2 className="m-5 text-center">...Fetching</h2>} */}
      {error && <h2 className="m-5 text-center">...Error</h2>}
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
}

export default App;
