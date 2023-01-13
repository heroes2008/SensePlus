import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { DeviceCard } from "./components/DeviceCard";
import { RefreshReadings } from "./components/RefreshReadings";
import { useSelector } from "react-redux";
import { selectPollingInterval } from "./features/devices/devicesSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Outlet, Link } from "react-router-dom";
import { NavBarCollapsible } from "./components/NavBar";
import { Dashboard } from "./components/Dashboard";
import { NotFound } from "./components/NotFound";
import { Graphs } from "./components/Graphs";
import { Reports } from "./components/Reports";

function App() {
  return (
    <>
      {/* <h1 className="m-5 text-center">SensePlus Devices List</h1> */}
      {/* {isFetching && <h2 className="m-5 text-center">...Fetching</h2>} */}
      <BrowserRouter>
        <NavBarCollapsible />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
              // refetch={refetch}
              // isFetching={isFetching}
              // data={data}
              />
            }
          />
          <Route
            path="dashboard"
            element={
              <Dashboard
              // refetch={refetch}
              // isFetching={isFetching}
              // data={data}
              />
            }
          />
          <Route path="graphs" element={<Graphs />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default App;
