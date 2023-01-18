import { React } from "react";
import {
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  Image,
} from "@react-pdf/renderer";
import logo from "../assets/logo.png";

export const ReportPDFExport = ({ data, startDate, endDate }) => {
  const headers = [
    { label: "Device Name", key: "deviceName" },
    { label: "Date", key: "deviceDate" },
    { label: "Time", key: "deviceTime" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Speed", key: "speed" },
    { label: "Event", key: "event" },
    { label: "Address", key: "address" },
    { label: "Humidity", key: "humidity" },
    { label: "Temperature", key: "temp" },
  ];

  const styles = StyleSheet.create({
    table: {
      width: "100%",
      fontSize: "8px",
    },
    page: {
      //flexDirection: "row",
      backgroundColor: "#E4E4E4",
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #EEE",
      paddingTop: 8,
      paddingBottom: 8,
    },
    header: {
      borderTop: "none",
      backgroundColor: "lightblue",
      fontWeight: "bold",
    },
    bold: {
      fontWeight: "bold",
    },
    // So Declarative and unDRY 👌
    row1: {
      width: "15%",
    },
    row2: {
      width: "10%",
    },
    row3: {
      width: "10%",
    },
    row4: {
      width: "15%",
    },
    row5: {
      width: "15%",
    },
    row6: {
      width: "5%",
    },
    row7: {
      width: "5%",
    },
    row8: {
      width: "15%",
    },
    row9: {
      width: "5%",
    },
    row10: {
      width: "5%",
    },
    image: {
      marginHorizontal: "40%",
      //marginVertical:"30%",
      width: "auto",
      height: "auto",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.row}> */}
        <Image src={logo} style={styles.image} fixed={true} />
        {/* </View> */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            margin: 10,
          }}
        >
          Report Routes
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "bold",
            margin: 5,
            backgroundColor:"yellow"
          }}
        >
          Period: {startDate} - {endDate}
        </Text>
        <View style={styles.table}>
          <View style={[styles.row, styles.header, styles.bold]} fixed={true}>
            <Text style={styles.row1}>Device Name</Text>
            <Text style={styles.row2}>Date</Text>
            <Text style={styles.row3}>Time</Text>
            <Text style={styles.row4}>Latitude</Text>
            <Text style={styles.row5}>Longitude</Text>
            <Text style={styles.row6}>Speed</Text>
            <Text style={styles.row7}>Event</Text>
            <Text style={styles.row8}>Address</Text>
            <Text style={styles.row9}>Humidity(rH %)</Text>
            <Text style={styles.row10}>Temperature</Text>
          </View>
          {data.map((row, i) => (
            <View key={i} style={styles.row} wrap={true}>
              <Text style={styles.row1}>{row.deviceName}</Text>
              <Text style={styles.row2}>{row.deviceDate}</Text>
              <Text style={styles.row3}>{row.deviceTime}</Text>
              <Text style={styles.row4}>{row.latitude}</Text>
              <Text style={styles.row5}>{row.longitude}</Text>
              <Text style={styles.row6}>{row.speed}</Text>
              <Text style={styles.row7}>{row.event}</Text>
              <Text style={styles.row8}>{row.address}</Text>
              <Text style={styles.row9}>{row.humidity}</Text>
              <Text style={styles.row10}>{row.temp}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
