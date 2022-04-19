import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import styles from "./index.module.css";
import useRecoverPasswordForm from "./useForgotPasswordForm";
import recoverPasswordValidate from "./ForgotPasswordValidate";

const RecoverPassword = () => {
  const { handleChange, handleRequest, values, errors } =
    useRecoverPasswordForm(recoverPasswordValidate);

  return (
    <Container>
      <Row>
        <h3 className={styles.Title}>Forgot your Password?</h3>
      </Row>

      <Row>
        <Col></Col>
        <Col lg={5}>
          <Form className={styles.form} onSubmit={handleRequest}>
            <Row>
              <Row className={styles.PasswordRequirement}>
                <div>
                  Enter the SFSU email assoicated with you account and we'll
                  send an email with instruction to reset your password.
                </div>
              </Row>
            </Row>

            <Row>
              <div className={styles.formInputComponent}>
                <Row>
                  <label className={styles.formLable}>
                    SFSU email address*:
                  </label>
                </Row>
                <Row>
                  <input
                    className={styles.formInput}
                    type="email"
                    name="emailAddress"
                    placeholder="Enter your SFSU email"
                    value={values.emailAddress}
                    onChange={handleChange}
                  />
                  {errors.emailAddress && (errors.emailAddress).map((error)=> <p>{error}</p>)}
                </Row>
              </div>
            </Row>

            <Row>
              <Col></Col>
              <Col lg={7}>
                <Button className={styles.formInputBtn} type="submit">
                  Request Reset Link
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

export default RecoverPassword;
