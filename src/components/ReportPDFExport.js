import { React } from "react";
import { Document, Page, View, StyleSheet, Text, Image } from "@react-pdf/renderer";
import logo from "../assets/logo.png";

export const ReportPDFExport = ({ data }) => {
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

  const styles = StyleSheet.create({
    table: {
      width: "100%",
      fontSize: "8px",
    },
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
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
      width: "25%",
    },
    row2: {
      width: "15%",
    },
    row3: {
      width: "20%",
    },
    row4: {
      width: "20%",
    },
    row5: {
      width: "10%",
    },
    row6: {
      width: "10%",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo} style={styles.image} />
        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
            <Text style={styles.row1}>Device Name</Text>
            <Text style={styles.row2}>Date/Hour</Text>
            <Text style={styles.row3}>Latitude</Text>
            <Text style={styles.row4}>Longitude</Text>
            <Text style={styles.row5}>Humidity</Text>
            <Text style={styles.row6}>Temperature</Text>
          </View>
          {data.map((row, i) => (
            <View key={i} style={styles.row} wrap={true}>
              <Text style={styles.row1}>
                <Text>{row.deviceName}</Text>
              </Text>
              <Text style={styles.row2}>{row.deviceTime}</Text>
              <Text style={styles.row3}>{row.latitude}</Text>
              <Text style={styles.row4}>
                <Text>{row.longitude}</Text>
              </Text>
              <Text style={styles.row5}>{row.humidity}</Text>
              <Text style={styles.row6}>{row.temp}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
