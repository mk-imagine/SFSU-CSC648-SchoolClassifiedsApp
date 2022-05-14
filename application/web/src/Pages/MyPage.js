import MyPageComponent from "../components/MyPageComponent";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/**
 * My Page
 * @returns MyPageComponent component
 */
const MyPage = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const userInformation = localStorage.getItem("user_login_information");
  console.log("my page user information: ", userInformation);

  useEffect(() => {
    // if (!userInformation) {
    //   console.log("user is logged out");
    //   setLoggedIn(false);
    // }

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

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <MyPageComponent />
    </div>
  );
};

export default MyPage;
