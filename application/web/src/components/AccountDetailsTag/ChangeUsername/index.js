import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import styles from "./index.module.css";
import useChangeUsernameForm from "./useChangeUsernameForm";
import userNameFormValidate from "./userNameFormValidate";

const ChangeUsernameComponent = () => {
  const { handleChange, handleReset, values, errors } =
    useChangeUsernameForm(userNameFormValidate);

  return (
    <Container>
      <Row>
        <h3 className={styles.Title}>Change Username</h3>
      </Row>

      <Row>
        <Col></Col>
        <Col lg={5}>
          <Form className={styles.form} onSubmit={handleReset}>
            <Row>
              <Row className={styles.PasswordRequirement}>
                <div>
                  Enter new username for your account and we'll reset your
                  username.
                </div>
              </Row>
            </Row>

            <Row>
              <div className={styles.formInputComponent}>
                <Row>
                  <Col></Col>
                  <Col>
                    <label className={styles.formLable}>Firstname*:</label>
                  </Col>
                  <Col>
                    <input
                      className={styles.formInput}
                      type="text"
                      name="newFirstname"
                      placeholder="Enter your firstname"
                      value={values.newFirstname}
                      onChange={handleChange}
                    />
                    {errors.newFirstname &&
                      errors.newFirstname.map((error) => <p>{error}</p>)}
                  </Col>
                  <Col></Col>
                </Row>
              </div>
            </Row>

            <Row>
              <div className={styles.formInputComponent}>
                <Row>
                  <Col></Col>
                  <Col>
                    <label className={styles.formLable}>Lastname*:</label>
                  </Col>
                  <Col>
                    <input
                      className={styles.formInput}
                      type="text"
                      name="newLastname"
                      placeholder="Enter your lastname"
                      value={values.newLastname}
                      onChange={handleChange}
                    />
                    {errors.newLastname &&
                      errors.newLastname.map((error) => <p>{error}</p>)}
                  </Col>
                  <Col></Col>
                </Row>
              </div>
            </Row>

            <Row>
              <Col></Col>
              <Col lg={3}>
                <Button className={styles.formInputBtn} type="submit">
                  Submit
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

export default ChangeUsernameComponent;
