import React from "react";
import { Row, Col, Container } from "react-bootstrap";
//import useRegisterForm from "./useRegisterForm";
//import validate from "./validate";
import styles from "./registerForm.module.css";
import axios from "axios";
/**
 * Loads User Registration Form
 * @returns HTML of Registration Form
 */
const FormSignup = () => {
  //const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [email, setSemail] = React.useState("");
  const username = email;
  const handleSubmit = () => {
    console.log(username);
    console.log(password);
    var data1 = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      confirmPassword: password2,
      email: email
    };
    var config = {
      method: "post",
      // url: "/api/register/register",  // FOR DEPLOYMENT
      url: "http://localhost:3100/api/register/register",
      headers: {
        "Content-Type": "application/json"
      },
      data: data1
    };

    axios(config)
      .then((response) => {
        window.location.href = response.data;
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <div className={styles.registerComponent}>
      <Row>
        <Col></Col>
        <Col md="auto">
          <div className={styles.title}>Register </div>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>

        <Col lg={7}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>First Name*:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="firstname"
                  placeholder="Enter your first name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
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
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
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
                  placeholder="Enter your SFSU email"
                  value={email}
                  onChange={(e) => setSemail(e.target.value)}
                />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </Row>
            <Col lg={8}>
              <Row>
                <Col>
                  <p>* - mandatory fields</p>
                </Col>
              </Row>
            </Col>
            <Row>
              <div class={styles.termPrivacyCheck}>
                
                <label style={{ marginLeft: "0.5rem" }}>
                  I acknowledge that I agree to the{" "}
                  <a href="#!" class="text-body">
                    <u>Term of Use</u>
                  </a>{" "}
                  and have read the{" "}
                  <a href="#!" class="text-body">
                    <u>Privacy Policy</u>
                  </a>
                  <input type="checkbox" style={{marginLeft:"1rem"}}value="" required />
                </label>
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
      </div>
    </Container>
  );
};

export default FormSignup;
