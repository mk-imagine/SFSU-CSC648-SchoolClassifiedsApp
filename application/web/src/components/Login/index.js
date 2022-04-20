// HEADER:Log In Page Code
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.css";

/**
 * Load Login Page Component
 * @returns HTML of Login component
 */
const Login = () => {

  const [formValue, setformValue] = React.useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append('username',formValue.username);
    formData.append('password',formValue.password);

    try {
      const response = await axios({
        method: "post",
        url: "/api/login/login",
        data: formData,
        headers: { "Content-Type": "multipart/form-data"},
      });
    } catch(error) {
      console.log(error);
    }
    event.preventDefault();
  }

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }


  return (
    <Container>
      <Row>
        <Col></Col>
        <Col lg={4}>
          <Form className={styles.form} onSubmit={handleSubmit}>
            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Username:</label>
                <input
                  className={styles.formInput}
                  name="username"
                  required
                  placeholder="Enter your username"
                  onChange={handleChange}
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
                  required
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
            </Row>

            <Row>
              <Col></Col>

              <Col>
                <button className={styles.formInputBtn} type="submit">
                  Log In
                </button>
              </Col>

              <Col></Col>

              <label className={styles.subtitle2}>
                Don't have an account? Register <a href="/register">Here</a>
              </label>
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
