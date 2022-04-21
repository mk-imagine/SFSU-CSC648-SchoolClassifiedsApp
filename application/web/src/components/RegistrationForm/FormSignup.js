import React from "react";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import useRegisterForm from "./useRegisterForm";
import validate from "./validate";
import styles from "./registerForm.module.css";
import axios from "axios";

/**
 * Loads User Registration Form
 * @returns HTML of Registration Form
 */
const FormSignup = () => {
  // const { handleChange, values, errors } =
  //   useRegisterForm(validate);
  const [errors, setErrors] = useState({});
  const [formValue, setformValue] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  });

 const handleRegister = (event) => {
    console.log("handleRegister called");
    const formData = new FormData();
    formData.append('firstname',formValue.firstname);
    formData.append('lastname',formValue.lastname);
    formData.append('username',formValue.username);
    formData.append('email',formValue.email);
    formData.append('password',formValue.password);
    formData.append('password2',formValue.password2);

    try {
      const response = axios({
        method: "post",
        url: "http://localhost:3100/api/register/register/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data"},
      });
      console.log(formData.get('username'));
      console.log(formData.get('email'));
    } catch(error) {
      console.log(error);
    }
    event.preventDefault();
  }

  const handleChange = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  }

  return (
    <Container>
      <Row>
        <Col></Col>

        <Col lg={7}>
          <form className={styles.form} onSubmit={handleRegister}>
            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>First Name*:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="firstname"
                  placeholder="Enter your first name"
                  value={formValue.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && <p>{errors.firstname}</p>}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Last Name*:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="lastname"
                  placeholder="Enter your last name"
                  value={formValue.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <p>{errors.lastname}</p>}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Username*:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="username"
                  required
                  placeholder="Enter your username"
                  value={formValue.username}
                  onChange={handleChange}
                />
              </div>
            </Row>

            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Email*:</label>
                <input
                  className={styles.formInput}
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your SFSU email"
                  value={formValue.email}
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
                  required
                  placeholder="Enter your password"
                  value={formValue.password}
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
                  required
                  placeholder="Confirm your password"
                  value={formValue.password2}
                  onChange={handleChange}
                />
                {errors.password2 && <p>{errors.password2}</p>}
              </div>
            </Row>

            <Row>
              <div class={styles.termPrivacyCheck}>
                <input type="checkbox" value="" required />
                <label style={{ marginLeft: "0.5rem" }}>
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
