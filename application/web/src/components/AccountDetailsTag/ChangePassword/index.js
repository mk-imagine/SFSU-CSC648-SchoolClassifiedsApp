import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import styles from "./index.module.css";
import useChangePasswordForm from "./useChangePasswordForm";
import changePasswordValidate from "./changePasswordValidate";

const ChangePassword = () => {
    const {handleChange, handleRecover, values, errors} = useChangePasswordForm(changePasswordValidate);

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
                <div >In order to protect your account, make sure your new password: </div>
                </Row>
                <Row style={{marginBottom: "1rem"}}>
                    <Row><div className={styles.Contents}>* is longer than 8 characters</div></Row>
                    <Row><div className={styles.Contents}>* at least one uppercase letter</div></Row>
                    <Row><div className={styles.Contents}>* at least one lowercase letter</div></Row>
                    <Row><div className={styles.Contents}>* at least one number</div></Row>
                    <Row><div className={styles.Contents}>* at least one special character</div></Row>
                </Row>

            </Row>
            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>
                  Create new password*:
                </label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="newPassword"
                  placeholder="Enter your new password"
                  value ={values.newPassword}
                  onChange = {handleChange}
                />
                {errors.newPassword && (errors.newPassword).map((error)=> <p>{error}</p>)}
              </div>
            </Row>

            <Row>
              <div className={styles.formInputComponent}>
                <label className={styles.formLable}>
                  Confirm new password*:
                </label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="comfirmNewPassword"
                  placeholder="confirm your new password"
                  value ={values.comfirmNewPassword}
                  onChange = {handleChange}
                />
                {errors.comfirmNewPassword && <p>{errors.comfirmNewPassword}</p>}
              </div>
            </Row>

            <Row>
              <Col></Col>
              <Col lg={5}>
                <Button className={styles.formInputBtn} type="submit">
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