import React from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import useRegisterForm from "./useRegisterForm";
import validate from "./validate";
import styles from "./index.module.css";

const FormSignup = () => {
  const { handleChange, handleRegister, values, errors } =
    useRegisterForm(validate);

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
          <h2>Sign up for a free account</h2>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col></Col>

        <Col lg={7}>
          <Form className={styles.form} onSubmit={handleRegister}>
            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>First Name*:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="firstname"
                  placeholder="Enter your first name"
                  value={values.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (errors.firstname).map((error)=> <p>{error}</p>)}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>Last Name*:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="lastname"
                  placeholder="Enter your last name"
                  value={values.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (errors.lastname).map((error)=> <p>{error}</p>)}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>Email*:</label>
                <input
                  className={styles.formInput}
                  type="email"
                  name="email"
                  placeholder="Enter your SFSU email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && (errors.email).map((error)=> <p>{error}</p>)}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>Password*():</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
                {/* onClick show / out hidder */}
                {/* <div>
                  <p> *One special character</p>
                  <p> *One number</p>
                  <p> *One uppercase letter</p>
                  <p> *At least 8 characters long</p>
                </div> */}
                {errors.password && (errors.password).map((error)=> <p>{error}</p>)}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>Confirm Password*:</label>
                <input
                  className={styles.formInput}
                  type="password"
                  name="password2"
                  placeholder="Confirm your password"
                  value={values.password2}
                  onChange={handleChange}
                />
                {errors.password2 && (errors.password2).map((error)=> <p>{error}</p>)}
              </div>
            </Row>

            <Row>
              <div class={styles.termPrivacyCheck}>
                <input
                  type="checkbox"
                  value=""
                  required
                />
                <label>
                  I acknowledge that I agree to the{" "}
                  <a href="#!" class="text-body">
                    <u>Term of Use</u>
                  </a>{" "}
                  and have read the{" "}
                  <a href="#!" class="text-body">
                    <u>Privacy Policy</u>
                  </a>
                </label>
              </div>
            </Row>

            <Row>
              <Col></Col>
              <Col>
                <Row>
                  <Col></Col>
                  <Col lg={8}>
                    <Button className={styles.formInputBtn} type="submit">
                      Register
                    </Button>
                  </Col>
                  <Col></Col>
                </Row>
              </Col>

              <Col></Col>
            </Row>

            <Row>
              <span className={styles.formInputLogin}>
                Already have an account? <a href="/login">Login</a>
              </span>
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FormSignup;
