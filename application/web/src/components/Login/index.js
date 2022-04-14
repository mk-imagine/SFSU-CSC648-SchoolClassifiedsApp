// HEADER:Log In Page Code
import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import styles from "./index.module.css";
const Login = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md="auto">
          <div className={styles.title}>Welcome to PurpleMarket</div>
        </Col>
        <Col></Col>
      </Row>

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
          <Form className="form">
            <Col>
              <label className={styles.subtitle}>Email:</label>
            </Col>
            <Col>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </Col>

            <Col>
              <label className={styles.subtitle}>Password:</label>
            </Col>

            <Col>
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </Col>

            <Row>
              <Col></Col>

              <Col>
                <Button className={styles.button}>Log In</Button>
              </Col>

              <Col></Col>
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
