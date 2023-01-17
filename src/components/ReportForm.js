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
import { CSVLink } from "react-csv";
import { ReportPDFExport } from "./ReportPDFExport";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

export const ReportForm = ({ devices }) => {
  const dispatch = useDispatch();
  const [selectedDevice, setSelectedDevice] = useState();
  const [selectedDeviceName, setSelectedDeviceName] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [trigger, result] = apiSlice.endpoints.routes.useLazyQuery();
  let reportData = [];

  const onDeviceChange = (e) => {
    console.log("device changed to:" + e.target.value);
    setSelectedDevice(e.target.value);
    var value = devices.filter(function (item) {
      return item.id == e.target.value;
    });

    console.log(value[0].name);
    setSelectedDeviceName(value[0].name);
    console.log("selectedDeviceName:" + selectedDeviceName);
  };

  const onStartDateChange = (value) => {
    console.log("StartDate changed to:" + moment(value).format());
    setStartDate(moment(value).format());
  };
  const onEndDateChange = (value) => {
    console.log("EndDate changed to:" + moment(value).format());
    setEndDate(moment(value).format());
  };
  const onGenerateClick = (selectedDeviceName) => {
    console.log("startDate:" + startDate);
    console.log("endDate:" + endDate);
    trigger({ selectedDevice, selectedDeviceName, startDate, endDate })
      .unwrap()
      .then((res) => {
        reportData = [...res];
        console.log("reportData");
        console.log(reportData);
      });
    //(fulfilled) =>
    //data.forEach((item) => {
    //  item.DeviceName = selectedDeviceName;
    //}
  };

  // const onDownloadPDFClick = (data) => {
  //   debugger;
  //   ReactPDF.render(<ReportPDFExport data={data} />, "report.pdf");
  // };
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        // paddingLeft: "8px", // override the cell padding for head cells
        // paddingRight: "8px",
        fontWeight: "bold",
        fontSize: "16",
      },
    },
    cells: {
      style: {
        // paddingLeft: "8px", // override the cell padding for data cells
        // paddingRight: "8px",
        //fontWeight: "bold",
      },
    },
  };
  const columns = [
    {
      name: "Device Name",
      selector: (row) => row.deviceName,
    },
    {
      name: "Date/Hour",
      selector: (row) => row.deviceTime,
    },
    {
      name: "Latitude",
      selector: (row) => row.latitude,
    },
    {
      name: "Longitude",
      selector: (row) => row.longitude,
    },
    {
      name: "Speed",
      selector: (row) => row.speed,
    },
    {
      name: "Event",
      selector: (row) => row.event,
    },
    {
      name: "Address",
      selector: (row) => row.address,
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

  const headers = [
    { label: "Device Name", key: "deviceName" },
    { label: "Date/Hour", key: "deviceTime" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Speed", key: "speed" },
    { label: "Event", key: "event" },
    { label: "Address", key: "address" },
    { label: "Humidity", key: "humidity" },
    { label: "Temperature", key: "temp" },
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
              disableClock={true}
              onChange={onStartDateChange}
              value={
                typeof startDate === "string" ? new Date(startDate) : startDate
              }
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
              disableClock={true}
              onChange={onEndDateChange}
              value={typeof endDate === "string" ? new Date(endDate) : endDate}
              //format={"yyyy-MM-dd HH:mm:ss"}
            ></DateTimePicker>
          </div>
        </Form.Group>
        <Button
          className="m-3"
          variant="primary"
          onClick={() => onGenerateClick(selectedDeviceName)}
        >
          Generate Report
        </Button>
      </Form>
      {/* <div>
        <p>Selected device: {selectedDeviceName}</p>
      </div> */}
      {/* <div>
        {result.isSuccess && (
          <Button className="m-3 btn btn-success">Excel</Button>
        )}
      </div> */}
      <div>
        {result.isSuccess && (
          <span>
            <CSVLink
              data={result.data}
              headers={headers}
              filename={"SensePlusReport.csv"}
              className="btn btn-success"
            >
              Download Excel
            </CSVLink>
            {/* <ReportPDFExport data={result.data}></ReportPDFExport> */}
            {result.isSuccess && (
              <Button className="m-3 btn btn-success">
                <PDFDownloadLink
                  document={<ReportPDFExport data={result.data} />}
                  fileName="RouteReport.pdf"
                  style={{ color: "white", textAlign: "center"}}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." : "Download PDF"
                  }
                </PDFDownloadLink>
                {/* <PDFViewer
                  children={<ReportPDFExport data={result.data} />}
                  showToolbar={true}
                ></PDFViewer>
                View PDF  */}
              </Button>
            )}
          </span>
        )}
      </div>
      <div
        className="m-3"
        style={{ borderStyle: "solid", borderWidth: "0.25px" }}
      >
        {result.isLoading && <h2 className="m-5 text-center">...Loading</h2>}
        {/* {result.isSuccess && result.data.forEach((item) => {
          item.DeviceName = {selectedDeviceName}
        })} */}
        {result.isSuccess && (
          <DataTable
            title="Report"
            columns={columns}
            data={result.data}
            pagination
            // actions={actionsMemo}
          />
        )}
      </div>
    </>
  );
};
