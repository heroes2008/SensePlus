import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { usePositionsQuery } from "./features/api/apiSlice";
import { Container, Row, Col } from "react-bootstrap";
import { DeviceCard } from "./components/DeviceCard";

function App() {
  const { data, isSuccess, isLoading, isFetching, isError, error } =
    usePositionsQuery();
  return (
    //<div className="App">
    <>
      <h1 className="m-5 text-center">SensePlus Devices List</h1>
      {isLoading && <h2 className="m-5 text-center">...Loading</h2>}
      {/* {isFetching && <h2 className="m-5 text-center">...Fetching</h2>} */}
      {error && <h2 className="m-5 text-center">...Error</h2>}
      {isSuccess && (
        <Container>
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
    //</div>
  );
}

export default App;
