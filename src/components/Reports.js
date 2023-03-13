import React from "react";
import { useDevicesQuery } from "../features/api/apiSlice";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReportForm } from "./ReportForm";
import { Login } from "../components/Login/Login";
import useToken from "../components/Login/useToken";

export const Reports = () => {
  const {
    data: devices,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
    isError,
    error,
  } = useDevicesQuery();

  const { token, setToken } = useToken();
  console.log("Reports->token:" + token);
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      {isLoading && <h2 className="m-5 text-center">...Loading</h2>}
      {error && <h2 className="m-5 text-center">...Error</h2>}
      <h1 className="m-5 text-center">Reports</h1>
      {isSuccess && (
        <Container>
          <Row>
            <Col xs={12}>
              <ReportForm devices={devices}></ReportForm>
            </Col>
          </Row>
          {/* <Row>
            {data?.map((device) => (
              <Col xs={3} className="m-3" key={device.id}>
                <DeviceCard device={device} />
              </Col>
            ))}
          </Row> */}
        </Container>
      )}
    </>
  );
};
