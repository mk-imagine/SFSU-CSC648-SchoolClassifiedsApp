import React from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import useRegisterForm from "./useRegisterForm";
import validate from "./validate";
import styles from "./registerForm.module.css";

const FormSignup = () => {
  const { handleChange, handleRegister, values, errors } =
    useRegisterForm(validate);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md="auto">
          <h1 className="greeting">Welcome to PurpleMarket</h1>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col></Col>
        <Col md="auto">
          <h2 className="form-title">Sign up for a free account</h2>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col></Col>
        <Col lg={8}>
          <form className={styles.form} onSubmit={handleRegister}>
            <Row>
              <Col>
                <div className={styles.formInputs}>
                  <label className={styles.formLabel}>First Name*:</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    name="firstname"
                    placeholder="Enter your first name"
                    value={values.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && <p>{errors.firstname}</p>}
                </div>
              </Col>

              <Col>
                <div className={styles.formInputs}>
                  <label className={styles.formLabel}>Last Name*:</label>
                  <input
                    className={styles.formInput}
                    type="text"
                    name="lastname"
                    placeholder="Enter your last name"
                    value={values.lastname}
                    onChange={handleChange}
                  />
                  {errors.lastname && <p>{errors.lastname}</p>}
                </div>
              </Col>
            </Row>

            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Email*:</label>
                <input
                  className={styles.formInput}
                  type="email"
                  name="email"
                  placeholder="Enter your SFSU email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Password*:</label>
                <input
                  className={styles.formInput}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Confirm Password*:</label>
                <input
                  className={styles.formInput}
                  type="password"
                  name="password2"
                  placeholder="Confirm your password"
                  value={values.password2}
                  onChange={handleChange}
                />
                {errors.password2 && <p>{errors.password2}</p>}
              </div>
            </Row>

            <Row>
              <div class={styles.termPrivacyCheck}>
                <input
                  // class="form-check-input me-2"
                  type="checkbox"
                  value=""
                  required
                  // id="form2Example3cg"
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
                <button className={styles.formInputBtn} type="submit">
                  Register
                </button>
              </Col>

              <Col></Col>
            </Row>

            <Row>
              <span className={styles.formInputLogin}>
                Already have an account? <a href="/login">Login</a>
              </span>
            </Row>
          </form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default FormSignup;
