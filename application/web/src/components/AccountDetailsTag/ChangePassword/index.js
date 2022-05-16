import React, { useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import styles from "./index.module.css";
import useChangePasswordForm from "./useChangePasswordForm";
import changePasswordValidate from "./ChangePasswordValidate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [email, setEmail] = useState("");

  const { handleChange, handleRecover, values, errors } = useChangePasswordForm(
    changePasswordValidate
  );

  const navigate = useNavigate();
  const base_url = "/api";
  // const base_url = "http://localhost:3100/api";
  const userInformation = localStorage.getItem("user_login_information");
  const user_in_json = JSON.parse(userInformation);

  console.log(values.newPassword);
  console.log(values.comfirmNewPassword);

  const resetPassword = async () => {
    //TODO: Works only first time, not second time
      var data1 = {
        userId: user_in_json.user_id,
        password: values.comfirmNewPassword
      };
      var config = {
        method: "post",
        // url: "/api/login/login",  // FOR DEPLOYMENT
        url: `${base_url}/login/resetPassword`,
        headers: {
          "Content-Type": "application/json"
        },
        data: data1
      };
    try {
      const response = await axios(config);
      if (response.data.status === 200) {
        alert("Your password has been reset.");
        navigate("/");
      } else {
        alert("Error in resetting password");
      }
    } catch (err) {
      console.log("what is the error?: " + err);
      alert("Error in resetting password");
    }

    // axios
    //   .get(`${base_url}/login/getUser/${user_in_json.user_id}`)
    //   .then((res) => {
    //     // setUserInfo(res.data);
    //     // console.log(userInfo);
    //     setEmail(res.data[0].user_email);
    //   })
    //   .then(() => {
    //     var data1 = {
    //       email: email,
    //       password: values.comfirmNewPassword
    //     };
    //     var config = {
    //       method: "post",
    //       // url: "/api/login/login",  // FOR DEPLOYMENT
    //       url: `${base_url}/login/resetPassword`,
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       data: data1
    //     };
    //     axios(config)
    //       .then((response) => {
    //         console.log("What is the response?: ", response.data);

    //         if (response.data.status === 200) {
    //           alert("Your password has been reset.");
    //           navigate("/");
    //         } else {
    //           alert("Error in resetting password");
    //         }
    //       })
    //       .catch((error) => {
    //         console.log("what is the error?: " + error);
    //         alert("Error in resetting password");
    //       });
    //   })
  };

  return (
    <Container>
      <Row>
        <h3 className={styles.Title}>Change Password</h3>
      </Row>
      <Row>
        <Col></Col>
        <Col lg={5}>
          <Form className={styles.form} onSubmit={handleRecover}>
            <Row>
              <Row className={styles.PasswordRequirement}>
                <div>
                  In order to protect your account, make sure your new password:{" "}
                </div>
              </Row>
              <Row style={{ marginBottom: "1rem" }}>
                <Row>
                  <div className={styles.Contents}>
                    * is longer than 8 characters
                  </div>
                </Row>
                <Row>
                  <div className={styles.Contents}>
                    * at least one uppercase letter
                  </div>
                </Row>
                <Row>
                  <div className={styles.Contents}>
                    * at least one lowercase letter
                  </div>
                </Row>
                <Row>
                  <div className={styles.Contents}>* at least one number</div>
                </Row>
                <Row>
                  <div className={styles.Contents}>
                    * at least one special character
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
                  value={values.newPassword}
                  onChange={handleChange}
                />
                {errors.newPassword &&
                  errors.newPassword.map((error) => <p>{error}</p>)}
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
                  value={values.comfirmNewPassword}
                  onChange={handleChange}
                />
                {errors.comfirmNewPassword && (
                  <p>{errors.comfirmNewPassword}</p>
                )}
              </div>
            </Row>

            <Row>
              <Col></Col>
              <Col lg={5}>
                <Button
                  className={styles.formInputBtn}
                  type="submit"
                  onClick={resetPassword}
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
