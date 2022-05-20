// HEADER:Log In Page Code
import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Load Login Page Component
 * @returns HTML of Login component
 */
const Login = ({ setToken }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    var data1 = {
      email: username,
      password: password
    };
    var config = {
      method: "post",
      url: "/api/login/login", // FOR DEPLOYMENT
      url: "http://localhost:3100/api/login/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: data1
    };

    axios(config)
      .then((response) => {
        console.log("What is the response?: ", response.data);

        if (response.data.token === "test123") {
          localStorage.setItem(
            "user_login_information",
            JSON.stringify(response.data)
          );
          navigate("/");
        } else {
          alert("Incorrect login information");
        }

        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("what is the error?: " + error);
        alert("Incorrect login information");
      });
  };

  return (
    <Container>
      <div className={styles.loginForm}>
        <Row>
          <Col></Col>
          <Col md="auto">
            <div className={styles.title}>Sign In </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col lg={4}>
            <Form className={styles.form}>
              <Row>
                <div className={styles.formInputs}>
                  <label className={styles.formLabel}>Email:</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    placeholder="Enter your email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </Row>
              <Row>
                <div className={styles.formInputs}>
                  <label className={styles.formLabel}>Password:</label>
                  <input
                    className={styles.formInput}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </Row>

              <Row>
                <Col></Col>

                <Col>
                  <button
                    className={styles.formInputBtn}
                    onClick={handleSubmit}
                    type="button"
                  >
                    Log In
                  </button>
                </Col>

                <Col></Col>

                <label className={styles.subtitle2}>
                  Don't have an account? Register <a href="/register">Here</a>
                </label>
                <Row>
                  <label className={styles.subtitle2}>
                    Forgot Password? Click <a href="/forgotpassword">Here</a>
                  </label>
                </Row>
              </Row>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </Container>
  );
};

export default Login;
