import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import styles from "./index.module.css";
import useChangePasswordForm from "./useChangePasswordForm";
import changePasswordValidate from "./ChangePasswordValidate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = React.useState("");
  const [comfirmNewPassword, setComfirmNewPassword] = React.useState("");
  let errors = {};

  const navigate = useNavigate();
  const base_url = "/api"; // FOR DEPLOYMENT
  // const base_url = "http://localhost:3100/api";
  const userInformation = localStorage.getItem("user_login_information");
  const user_in_json = JSON.parse(userInformation);


  const resetPassword = (e) => {
    var dataPassword = {
      newPassword: newPassword,
      comfirmNewPassword: comfirmNewPassword,
    };

    errors = changePasswordValidate(dataPassword);
    console.log("Error new password", errors.newPassword);
    console.log("Error confirmed new password", errors.comfirmNewPassword);

    if (errors.newPassword.length > 0 || errors.comfirmNewPassword.length > 0) {
      let passwordValidatedMessage = "";
      e.preventDefault();
      if (errors.newPassword.length > 0) {
        passwordValidatedMessage = errors.newPassword.reduce(
          (previousError, currentError) => previousError + "\n" + currentError
        );
      }

      alert(
        "Password: \t" +
          "\n" +
          passwordValidatedMessage +
          "\n\n" +
          "Comfirmed Password: \t" +
          errors.comfirmNewPassword +
          "\n\n"
      );
    } else {
      e.preventDefault();
      console.log("Inside Else......................");
      var data1 = {
        userId: user_in_json.user_id,
        password: comfirmNewPassword,
      };
      var config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("comfirmNewPassword", comfirmNewPassword);

      axios
        .post(`${base_url}/login/resetPassword`, data1, config)
        .then((response) => {
          e.preventDefault();
          if (response.data.status === 200) {
            alert("Your password has been reset.");
            navigate("/");
          }else{
            console.log(response.data);
            alert(
              "Error in resetting password."
            );
          }
        })
        .catch((error) => {
          alert(error);
          console.log(error);
          e.preventDefault();
        });
    }

  };

  return (
    <Container>
      <Row>
        <h3 className={styles.Title}>Change Password</h3>
      </Row>
      <Row>
        <Col></Col>
        <Col lg={5}>
          <Form className={styles.form} onSubmit={resetPassword}>
            <Row>
              <Row className={styles.PasswordRequirement}>
                <div>
                  In order to protect your account, make sure your new password:{" "}
                </div>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Row>
                  <div className={styles.Contents}>
                    * Must contain at least 8 characters
                  </div>
                </Row>
                <Row>
                  <div className={styles.Contents}>
                    * Must contain at least one lowercase character
                  </div>
                </Row>
                <Row>
                  <div className={styles.Contents}>
                    * Must contain at least at least one uppercase character
                  </div>
                </Row>
                <Row>
                  <div className={styles.Contents}>
                    * Must contain at least at least one digit
                  </div>
                </Row>
                <Row>
                  <div className={styles.Contents}>
                    * Must contain at least at least one special character
                    (/*-+!@#$^&)
                  </div>
                </Row>
              </Row>
            </Row>
            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>New password*:</label>
                <input
                  className={styles.formInput}
                  type="password"
                  name="newPassword"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </Row>

            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>
                  Confirm new password*:
                </label>
                <input
                  className={styles.formInput}
                  type="password"
                  name="comfirmNewPassword"
                  placeholder="Confirm your new password"
                  value={comfirmNewPassword}
                  onChange={(e) => setComfirmNewPassword(e.target.value)}
                />
              </div>
            </Row>

            <Row>
              <Col></Col>
              <Col lg={5}>
                <Button
                  className={styles.formInputBtn}
                  type="submit"
                  onClick={(e) => resetPassword(e)}
                >
                  Reset Password
                </Button>
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

export default ChangePassword;
