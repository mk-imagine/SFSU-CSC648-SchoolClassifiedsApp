// HEADER:Log In Page Code
import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.css";
import axios from "axios";

/**
 * Load Login Page Component
 * @returns HTML of Login component
 */
const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    console.log(username);
    console.log(password);
    var data1 = {
      username: username,
      password: password,
    };
    var data2 = JSON.stringify(data1);
    console.log(data1);
    console.log(data2);
    var config = {
      method: "post",
      url: "http://localhost:3100/api/login/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data2,
    };

    axios(config)
      .then((response) => {
        console.log("What is the response?: " + response.data);
        window.location.href = response.data;
        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("what is the error?: " + error);
      });
  };

  /*   const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const handleSubmit = (event) => {
    try{
      const response = axios({
        method: "post",
        url: "http://localhost:3100/api/login/login",
        data: {username:username, password:password},
        headers: {"Content-Type" : "multipart/form-data"}
      });
    }catch(error){
      console.log(error);
    }
  } */

  return (
    <Container>
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
            <Row>
              <div className={styles.formInputs}>
                <label className={styles.formLabel}>Email:</label>
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                  Log In
                </button>
              </Col>

              <Col></Col>

              <label className={styles.subtitle2}>
                Don't have an account? Register <a href="/register">Here</a>
              </label>
              <Row>
                <label className={styles.subtitle2}>
                  Forgot Password? Click <a href="#">Here</a>
                </label>
              </Row>
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
