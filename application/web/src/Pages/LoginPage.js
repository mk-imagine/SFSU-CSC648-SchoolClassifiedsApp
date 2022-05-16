import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import { Navigate } from "react-router-dom";

/**
 * Login Page
 * @returns Login component
 */
const LoginPage = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const userInformation = localStorage.getItem("user_login_information");
  console.log("user information in login page", userInformation);
  console.log(typeof userInformation);

  useEffect(() => {
    if (userInformation) {
      if (userInformation != "loggedOut") {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
    }
  }, [userInformation]);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
