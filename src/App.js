import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { useDevicesQuery } from "./features/api/apiSlice";

function App() {
  const { data, isSuccess, isLoading, isFetching, isError, error } =
    useDevicesQuery();
  return (
    <div className="App">
      <h1>SensePlus Devices List</h1>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>...Error</h2>}
      {isSuccess && (
        <div>
          {data?.map((device) => {
            return (
              <div key={device.id}>
                <span>{device.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
