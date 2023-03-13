import { useState } from "react";
import bcrypt from "bcryptjs-react";

export default function useToken() {
  const saltRounds = 10;
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    const username = localStorage.getItem("username");
    //const userToken = JSON.parse(tokenString);
    //bcrypt.compareSync("B4c0//", hash);
    //let creds = tokenString.split(":");
    console.log("getToken->tokenString:" + tokenString);
    console.log("getToken->userid:" + userid);
    console.log("getToken->username:" + username);
    return userid;
  };

  const [token, setToken] = useState(getToken());
  // const [userid, setUserid] = useState(getUserid());
  // const [username, setUsername] = useState(getUsername());

  const saveToken = (userToken) => {
    //debugger;
    // Save the token only if it's passed from Login component, not from Logout
    if (
      userToken.email &&
      userToken.password &&
      userToken.userid &&
      userToken.username
    ) {
      console.log("saveToken->userToken:" + userToken);
      localStorage.setItem("userid", userToken.userid);
      localStorage.setItem("username", userToken.username);
      // encrypt creds before saving
      bcrypt
        .hash(userToken.email + ":" + userToken.password, saltRounds)
        .then((hash) => {
          //debugger;
          console.log("Hashed creds:", hash);
          localStorage.setItem("token", hash);
        })
        .catch((err) => console.error(err.message));
      setToken(userToken.userid);
    } else {
      // null token passed from Logout
      // localStorage.setItem("userid", userToken.userid);
      // localStorage.setItem("username", userToken.username);
      // localStorage.setItem("email", userToken.email);
      // localStorage.setItem("password", userToken.password);

      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("password");

      console.log("useToken from Logout");
    }
  };

  return {
    setToken: saveToken,
    token,
  };
}
