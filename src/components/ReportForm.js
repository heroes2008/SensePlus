import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  devicesLoading,
  devicesReceived,
  updatePollingInterval,
  selectPollingInterval,
} from "../features/devices/devicesSlice";
import DateTimePicker from "react-datetime-picker";
import moment from "moment-timezone";
import { apiSlice } from "../features/api/apiSlice";
import { useLazyQuery } from "@reduxjs/toolkit/query/react";
import DataTable from "react-data-table-component";

export const ReportForm = ({ devices }) => {
  const dispatch = useDispatch();
  const [selectedDevice, setSelectedDevice] = useState();
  const [startDate, setStartDate] = useState(
    new Date()
    //moment().utc().subtract(35, "minutes").format("MM-dd-yyyy HH:mm:ss")
  );
  const [endDate, setEndDate] = useState(
    new Date()
    //moment().utc().subtract(5, "minutes").format("MM-dd-yyyy HH:mm:ss")
  );

  const [trigger, result] = apiSlice.endpoints.routes.useLazyQuery();

  //   const initialPollingInterval = useSelector((state) =>
  //     selectPollingInterval(state)
  //   );
  //const [pollingInterval, setPollingInterval] = useState(5000);

  const onDeviceChange = (e) => {
    console.log("device changed to:" + e.target.value);
    setSelectedDevice(e.target.value);
    //dispatch(updatePollingInterval(Number(e.target.value)));
    //setPollingInterval(Number(e.target.value));
  };

  const onStartDateChange = (value) => {
    console.log("StartDate changed to:" + moment(value).format());
    setStartDate(moment(value).format());
  };
  const onEndDateChange = (value) => {
    console.log("EndDate changed to:" + moment(value).format());
    setEndDate(moment(value).format());
  };
  const onGenerateClick = () => {
    console.log("startDate:" + startDate);
    console.log("endDate:" + endDate);
    trigger({ selectedDevice, startDate, endDate });
    console.log("result.data:" + result.data);
  };

  const columns = [
    {
      name: "Device ID",
      selector: (row) => row.id,
    },
    {
      name: "Humidity",
      selector: (row) => row.humidity,
    },
    {
      name: "Temperature",
      selector: (row) => row.temp,
    },
  ];

  return (
    <>
      <Form
        className="m-3"
        style={{ borderStyle: "solid", borderWidth: "0.25px" }}
      >
        <Form.Group className="m-3" controlId="deviceList">
          <Form.Label className="mt-3 me-3 mb-3 fw-bold">
            Select Device
          </Form.Label>
          <Form.Select onChange={onDeviceChange}>
            {devices.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Form.Select>
          <div>
            <Form.Label className="mt-3 me-3 mb-3 fw-bold">
              Start Date/Time
            </Form.Label>
          </div>
          <div>
            <DateTimePicker
              onChange={onStartDateChange}
              value={startDate}
              //format={"yyyy-MM-dd HH:mm:ss"}
            ></DateTimePicker>
          </div>
          <div>
            <Form.Label className="mt-3 me-3 mb-3 fw-bold">
              End Date/Time
            </Form.Label>
          </div>
          <div>
            <DateTimePicker
              onChange={onEndDateChange}
              value={endDate}
              //format={"yyyy-MM-dd HH:mm:ss"}
            ></DateTimePicker>
          </div>

          {/* <Col sm={4}>
          <Form.Control
            as="button"
            className="btn btn-success"
            onClick={refetch}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Manually Refresh"}
          </Form.Control>
        </Col> */}
        </Form.Group>
        <Button className="m-3" variant="primary" onClick={onGenerateClick}>
          Generate
        </Button>
      </Form>
      <div
        className="m-3"
        style={{ borderStyle: "solid", borderWidth: "0.25px" }}
      >
        {result.isLoading && <h2 className="m-5 text-center">...Loading</h2>}
        {result.isSuccess && <DataTable columns={columns} data={result.data} />}
      </div>
    </>
  );
};
