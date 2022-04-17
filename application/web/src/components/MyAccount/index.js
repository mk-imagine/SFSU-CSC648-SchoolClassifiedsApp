import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import useRegisterForm from "../RegistrationForm/useRegisterForm";
import validate from "../RegistrationForm/validate";
import styles from "./index.module.css";

const MyAccount = () => {
  const { handleChange, handleRegister, values, errors } =
    useRegisterForm(validate);
  return (
    <div>
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
                    placeholder="Bruce"
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
                    placeholder="Wayne"
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
                    type="email"
                    name="email"
                    placeholder="bruce@mail.sfsu.edu"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p>{errors.email}</p>}
                </div>
              </Row>

              <Row>
                <Col></Col>
                <Col>
                  <button className={styles.formInputBtn} type="submit">
                    Update
                  </button>
                </Col>

                <Col></Col>
              </Row>
            </form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyAccount;
