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
          <Form className={styles.form}>
            <Col>
              <label className={styles.subtitle}>Email:</label>
            </Col>
            <Col>
              <input
                className={styles.formInput}
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </Col>

            <Col>
              <label className={styles.subtitle}>Password:</label>
            </Col>

            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>First Name*:</Form.Label>
                          <Form.Control type="text"
                              name='firstname'
                              placeholder="Enter your first name"
                              value={values.firstname}
                              onChange={handleChange} />
                          <Form.Text className="text-muted">
                              {errors.firstname && <p>{errors.firstname}</p>}
                          </Form.Text>
                      </Form.Group> */}
            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Email:</label>
                <input
                  className={styles.formInput}
                  type="email"
                  placeholder="Enter your email"
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
                Don't have an account? Register<a href="/register">Here</a>
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
