import React from "react";
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
  const { handleChange, handleRegister, values, errors } =
    useRegisterForm(validate);

  const [formValue, setformValue] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    password2: ''
  });

  handleRegister = async (event) => {
    const formData = new FormData();
    formData.append('firstname',formValue.firstname);
    formData.append('lastname',formValue.lastname);
    formData.append('username',formValue.username);
    formData.append('email',formValue.email);
    formData.append('password',formValue.password);
    formData.append('password2',formValue.password2);

    try {
      const response = await axios({
        method: "post",
        url: "api/register/register",
        data: formData,
        headers: { "Content-Type": "multipart/form-data"},
      });
    } catch(error) {
      console.log(error);
    }
    event.preventDefault();
  }

  handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
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
                  value={values.firstname}
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
                  value={values.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <p>{errors.lastname}</p>}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Email*:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="username"
                  required
                  placeholder="Enter your username"
                  value={values.username}
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
                  required
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
                  required
                  placeholder="Confirm your password"
                  value={values.password2}
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
