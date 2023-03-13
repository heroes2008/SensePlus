import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../components/Login/useToken";
import { Login } from "../components/Login/Login";
import { NavBarCollapsible } from "../components/NavBar";

// export const Logout = ({ setToken }) => {
//   const [userid, setUserid] = useState(localStorage.getItem("userid"));
//   const navigate = useNavigate();
//   if (userid) {
//     setTimeout(() => {
//       setUserid(null);
//       localStorage.removeItem("userid");
//       localStorage.removeItem("username");
//       localStorage.removeItem("token");
//       console.log("Removing userid from localStorage");
//       navigate("/");
//     }, "1000");
//   }
//   if (!userid) {
//     console.log("userid null");
//   }
//   return <>{userid && <h2 className="m-5 text-center">...Logging out</h2>};</>;
// };

export const Logout = () => {
  <h2 className="m-5 text-center">...Logging out</h2>;
  const { token, setToken } = useToken();
  console.log("Logout->token:" + token);
  //const [userid, setUserid] = useState(localStorage.getItem("userid"));
  const navigate = useNavigate();

  setToken({ email: null, password: null, userid: null, username: null });
  console.log("Logout->removed token");

  useEffect(() => {
    if (token) {
      // <h2 className="m-5 text-center">...Logging out</h2>;
      //setToken({ email: null, password: null, userid: null, username: null });
    } else {
      console.log("Logout->token is null");
    }
    console.log("Redirect to login...");
    navigate("/navbar");
    // <Login setToken={setToken} />;
    //<NavBarCollapsible token={token} setToken={setToken} />;
  }, [token]);

  return <>{token && <h2 className="m-5 text-center">...Logging out</h2>};</>;
};
