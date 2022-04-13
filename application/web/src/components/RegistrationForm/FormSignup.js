import React from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import useRegisterForm from "./useRegisterForm";
import validate from "./validate";
import "./registerForm.css";
import { useNavigate } from "react-router-dom";

const FormSignup = () => {
  const { handleChange, handleRegister, values, errors } =
    useRegisterForm(validate);
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md="auto">
          <h1 className="greeting">Welcome to PurpleMarket</h1>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col></Col>
        <Col md="auto">
          <h2 className="form-title">Sign up for a free account</h2>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col></Col>
        <Col lg={6}>
          <form className="form" onSubmit={handleRegister}>
            {/* <h2 classname = 'form-title'>
                        Sign up for a free account
                    </h2> */}

            {/* #1 user input for first name  */}

            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>First Name*:</Form.Label>
                                <Form.Control type="text"
                                    name='firstname'
                                    placeholder="Enter your first name"
                                    value={values.firstname}
                                    onChange={handleChange} />
                                <Form.Text className="text-muted">
                                    {errors.firstname && <p>{errors.firstname}</p>}
                                </Form.Text>
                            </Form.Group> */}
            <Row>
              <div className="form-inputs">
                <label className="form-label">First Name*:</label>
                <input
                  className="form-input"
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
              <div className="form-inputs">
                <label className="form-label">Last Name*:</label>
                <input
                  className="form-input"
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
              <div className="form-inputs">
                <label className="form-label">Email*:</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="Enter your SFSU email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
            </Row>

            <Row>
              <div className="form-inputs">
                <label className="form-label">Password*:</label>
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
            </Row>

            <Row>
              <div className="form-inputs">
                <label className="form-label">Confirm Password*:</label>
                <input
                  className="form-input"
                  type="password"
                  name="password2"
                  placeholder="Confirm your password"
                  value={values.password2}
                  onChange={handleChange}
                />
                {errors.password2 && <p>{errors.password2}</p>}
              </div>
            </Row>

            <Row>
              <div class="term-privacy-check">
                <input
                  // class="form-check-input me-2"
                  type="checkbox"
                  value=""
                  required
                  // id="form2Example3cg"
                />
                <label>
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
                <button className="form-input-btn" type="submit">
                  Register
                </button>
              </Col>

              <Col></Col>
            </Row>

            <Row>
              <span className="form-input-login">
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
