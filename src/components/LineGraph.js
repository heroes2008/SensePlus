import React from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment-timezone";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const LineGraph = ({ data }) => {
  //console.log(data);
  const dateFormatter = (date) => {
    debugger;
    let formattedDate = moment.utc(date).format("YYYY/DD/MM HH:mm:ss");
    console.log(formattedDate);
    return formattedDate;
  };

  const humidityLabel = {
    color: "black",
    backgroundColor: "lightblue",
    padding: "10px",
    fontFamily: "Arial",
    whiteSpace: "nowrap",
    textAlign: "center"
  };
    const tempLabel = {
      color: "black",
      backgroundColor: "pink",
      padding: "10px",
      fontFamily: "Arial",
      whiteSpace: "nowrap",
      textAlign: "center",
    };
  return (
    <Row>
      <Col xs={5}>
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            {/* <div className="bg-light m-2 font-weight-bold text-center text-nowrap"> */}
            <div style={humidityLabel}>{data[0].name}-Humidity</div>
          </Col>
        </Row>
        <Row>
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <LineChart width={800} height={300} data={data}>
            <ReferenceLine
              y={data[0].min_hum_threshold}
              label="Min Humidity"
              stroke="red"
              dot={true}
            />
            <ReferenceLine
              y={data[0].max_hum_threshold}
              label="Max Humidity"
              stroke="red"
              dot={true}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="blue"
              strokeWidth={2}
              dot={false}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={"deviceTime"}
              //tickFormatter={dateFormatter}
              // scale="time"
              // type="number"
              domain={[data[0]?.deviceTime, data[data.length - 1]?.deviceTime]}
            />
            <YAxis domain={[0, data[0]?.max_hum_threshold + 10]} />
            <Tooltip />
            <Legend />
          </LineChart>
          {/* </ResponsiveContainer> */}
        </Row>
      </Col>
      <Col xs={2}></Col>
      <Col xs={5}>
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            {/* <div className="bg-light m-2 font-weight-bold text-center text-nowrap"> */}
            <div style={tempLabel}>{data[0].name}-Temperature</div>
          </Col>
        </Row>
        <Row>
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <LineChart width={800} height={300} data={data}>
            <ReferenceLine
              y={data[0].min_threshold}
              label="Min Temperature"
              stroke="red"
              dot={true}
            />
            <ReferenceLine
              y={data[0].max_threshold}
              label="Max Temperature"
              stroke="red"
              dot={true}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="blue"
              strokeWidth={2}
              dot={false}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={"deviceTime"}
              //tickFormatter={dateFormatter}
              // scale="time"
              // type="number"
              domain={[data[0]?.deviceTime, data[data.length - 1]?.deviceTime]}
            />
            <YAxis domain={[0, data[0]?.max_threshold + 10]} />
            <Tooltip />
            <Legend />
          </LineChart>
          {/* </ResponsiveContainer> */}
        </Row>
      </Col>
    </Row>
  );
};
