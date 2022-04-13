import React from "react";
import { Form,Container, Row, Col, Button } from "react-bootstrap";
import "./index.login.css"
const Login = () => {
    return (
      <Container>
      <Row>
          <Col></Col>
          <Col md="auto">
              <h1 className="greeting">
                  Welcome to PurpleMarket
              </h1>
          </Col>
          <Col></Col>
      </Row>

      <Row>
          <Col></Col>
          <Col md="auto">
              <h2 classname = 'form-title' >
                  Sign In
              </h2>
          </Col>
          <Col></Col>
      </Row>

      <Row>
          <Col></Col>
          <Col lg={4}>
              <form className="form" >
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
                      <div className='form-inputs'>
                          <label className='form-label'>Email:</label>
                          <input
                              className='form-input'
                              type='email'
                              placeholder='Enter your email'
                              
                          />
                        
                      </div>
                  </Row>
                  <Row>
                      <div className='form-inputs'>
                          <label className='form-label'>Password:</label>
                          <input
                              className='form-input'
                              type='password'
                              name='password'
                              placeholder='Enter your password'
                              
                          />
                          
                      </div>
                      <Row>
                            <span className='form-input-login'>
                             Forgot Password 
                            </span>
                        </Row>
                  </Row>



                  <Row>
                      <Col></Col>
                      <Col>
                          <button className='form-input-btn' type='submit'>
                              Log In
                          </button>
                      </Col>
                    
                      <Col></Col>
                        </Row>
                        <Row>
                            <span className='form-input-login'>
                             Need An Account? Register <a href='#'>Here</a>
                             Forgot Password? Click <a href ='#'>Here</a>
                            </span>
                        </Row>
              </form>
              

          </Col>
          <Col></Col>
         
      </Row>

  </Container>


)
};
 




export default Login;
