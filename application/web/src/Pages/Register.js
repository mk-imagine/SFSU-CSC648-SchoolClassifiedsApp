import FormSignup from "../components/RegistrationForm/FormSignup";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/**
 * Register Page
 * @returns FormSignup component
 */
const RegisterPage = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const userInformation = localStorage.getItem("user_login_information");
  console.log("user information in login page", userInformation);

  useEffect(() => {
    if (userInformation) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userInformation]);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <FormSignup />
    </div>
  );
};

export default RegisterPage;
