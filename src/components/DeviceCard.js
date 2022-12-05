import React from "react";
import { Card } from "react-bootstrap";
import thermometer from "../assets/thermometer.png";
import humidity from "../assets/humidity.png";
import { Row, Col } from "react-bootstrap";

export function DeviceCard({ device }) {
  return (
    <Card className="h-100 shadow bg-white rounded m-2 p-2">
      <Card.Header className="fs-3 fw-semibold text-nowrap">
        {device.name} - {device.id}
      </Card.Header>
      <Row>
        <Col xs={6}>
          <Row>
            <Card.Img
              className="p-3"
              variant="top"
              src={thermometer}
              alt="Temperature"
            ></Card.Img>
          </Row>
          <Row>
            <div className="m-2 font-weight-bold text-center text-nowrap fs-4 fw-bold">
              {device.temp ? Number(device.temp).toFixed(2) : "-"}
            </div>
          </Row>
        </Col>
        <Col xs={6}>
          <Row>
            <Card.Img
              className="p-3"
              variant="top"
              src={humidity}
              alt="Humidity"
            ></Card.Img>
          </Row>
          <Row>
            <div className="m-2 font-weight-bold text-center text-nowrap fs-4 fw-bold">
              {device.humidity
                ? Number(device.humidity * 0.033).toFixed(2)
                : "-"}
              %
            </div>
          </Row>
        </Col>
      </Row>
      <Row>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="m-2 font-weight-bold text-center">
            {device.name}
          </Card.Title>
          <Card.Text className="text-secondary m-2 bg-success p-2 text-dark bg-opacity-25">
            This is a sample description to explain the temperature and humidity
            readings.
          </Card.Text>
        </Card.Body>
      </Row>
    </Card>
  );
}
