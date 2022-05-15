import React from "react";
import { Row, Col, Container } from "react-bootstrap";
//import useRegisterForm from "./useRegisterForm";
import validate from "./validate";
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
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [passwordReqShow, setPasswordReqShow] = React.useState(false);


  const username = email;

  let errors = {
    
  };

  const handlePasswordInputFocus = () =>{
       setPasswordReqShow(true);
  };

  const handlePasswordInputBlur = () =>{
    setPasswordReqShow(false);
};

  const togglePassword = (e) => {
    // When togglePassword is invoked
    // inverse the boolean state of passwordShown
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (e) => {
    console.log(username);
    console.log(password);
    var data1 = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      confirmPassword: password2,
    };
    
    
    errors = validate(data1);
    console.log("errors..........: ", errors);
    
    
    if ((errors.firstname).length >0 || (errors.lastname).length >0 || (errors.email).length >0 || (errors.password).length >0 
        || (errors.confirmPassword).length >0) {
      e.preventDefault();
      let passwordValidatedMessage = errors.password.reduce((previousError, currentError) => previousError + "\n" + currentError);
      alert ( "First Name: " + errors.firstname + "\n\n" +
              "Last Name: " + errors.lastname + "\n\n" +
              "Eamil: " + errors.email + "\n\n" +
              "Password: " +"\n" + passwordValidatedMessage + "\n\n" +
              "Comfirmed Password: " + errors.confirmPassword + "\n\n"
              );
    } else {
      var config = {
        method: "post",
        // url: "/api/register/register",  // FOR DEPLOYMENT
        url: "http://localhost:3100/api/register/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: data1,
      };

      axios(config)
        .then((response) => {
          window.location.href = response.data;
          //console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
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
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onFocus = {handlePasswordInputFocus}
                    onBlur = {handlePasswordInputBlur}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                {passwordReqShow? <div style={{maginTop: "1rem", marginBottom: "1rem", color: "red"}}><Row><div>Password Requirements:</div></Row>
                                       <Row><div>Must contain at least 8 characters</div></Row>
                                       <Row><div>Must contain at least one lowercase character</div></Row>
                                       <Row><div>Must contain at least at least one uppercase character</div></Row>
                                       <Row><div>Must contain at least at least one digit</div></Row>
                                       <Row> <div>Must contain at least at least one special character (/*-+!@#$^&)</div></Row>
                                       </div> : null}
              </Row>

              <Row>
                <div className={styles.formInputs}>
                  <label className={styles.formLabel}>Confirm Password*:</label>
                  <input
                    className={styles.formInput}
                    type={passwordShown ? "text" : "password"}
                    name="password2"
                    placeholder="Confirm your password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
              </Row>

              <Row>
              <button className={styles.showPasswordBtn} onClick={togglePassword} >Show Password</button>
              </Row>

              <Col lg={8}>
                <Row>
                  <Col>
                    <p>* - mandatory fields</p>
                  </Col>
                </Row>
              </Col>
              <Row></Row>

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
