import React, { useState } from "react";
//import { label } from "react-bootstrap";
//import { usePositionsAndDevicesQuery } from "../features/api/apiSlice";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  devicesLoading,
  devicesReceived,
  updatePollingInterval,
  selectPollingInterval,
} from "../features/devices/devicesSlice";

const intervalOptions = [
  { label: "Off", value: 0 },
  { label: "3s", value: 3000 },
  { label: "5s", value: 5000 },
  { label: "10s", value: 10000 },
  { label: "1m", value: 60000 },
];
export const RefreshReadings = ({ refetch, isFetching }) => {
  const dispatch = useDispatch();

  const initialPollingInterval = useSelector((state) =>
    selectPollingInterval(state)
  );
  //const [pollingInterval, setPollingInterval] = useState(5000);

  const onPollingIntervalChange = (e) => {
    console.log("interval changed to:" + Number(e.target.value));
    dispatch(updatePollingInterval(Number(e.target.value)));
    //setPollingInterval(Number(e.target.value));
  };

  //   const { data, isSuccess, isLoading, isFetching, isError, error } =
  //     usePositionsAndDevicesQuery({ pollingInterval });

  return (
    <Form className="m-3">
      <Form.Group as={Row} className="mb-3" controlId="pollingInterval">
        <Form.Label column sm={3}>
          Refresh Interval
        </Form.Label>
        <Col sm={2}>
          <Form.Select
            value={initialPollingInterval}
            onChange={onPollingIntervalChange}
          >
            {intervalOptions.map(({ label, value }) => (
              <option key={label} value={value}>
                {label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col sm={4}>
          <Form.Control
            as="button"
            className="btn btn-success"
            onClick={refetch}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Manually Refresh"}
          </Form.Control>
        </Col>
      </Form.Group>
    </Form>
  );
};
