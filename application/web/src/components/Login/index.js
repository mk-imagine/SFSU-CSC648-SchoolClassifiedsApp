import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import styles from "./index.module.css";

const Login = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md="auto">
          <h1>Welcome to PurpleMarket</h1>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col></Col>
        <Col md="auto">
          <h2>Sign In</h2>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col></Col>
        <Col lg={4}>
          <Form className={styles.form}>
            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>Email:</label>
                <input
                  className={styles.formInput}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </Row>
            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>Password:</label>
                <input
                  className={styles.formInput}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
            </Row>

            <Row>
              <Col></Col>
              <Col>
                <button className={styles.loginBtn} type="submit">
                  Log In
                </button>
              </Col>
              <Col></Col>
            </Row>

            <Row>
              <span className={styles.resetPasswork}>
                Forgot Your Password? <a href="/login">Reset Password</a>
              </span>
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
