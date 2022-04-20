// HEADER:Log In Page Code
import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.css";

/**
 * Load Login Page Component
 * @returns HTML of Login component
 */
const Login = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col lg={4}>
          <Form className={styles.form}>
            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Email:</label>
                <input
                  className={styles.formInput}
                  name="username"
                  required
                  placeholder="Enter your username"
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
