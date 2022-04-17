import React from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import styles from "./index.module.css";
import image from "../../images/image.png";

const Message = () => {
  return (
    // <Container>
    //     <Row>
    //     <h2 className= {Styles.title}>Message Page</h2>
    //     </Row>

    //     <Row>
    //         <Col>
    //         <div className="">col1</div>
    //         </Col>

    //         <Col>
    //         <div className="">col2</div>
    //         </Col>
    //     </Row>

    // </Container>

    <div style={{ marginTop: "1rem" }}>
      <Container className={styles.container}>
        
          <Row>
            <div className={styles.title}>Message Page</div>
          </Row>
          
          <Form className = {styles.form}>
          <Row style={{ marginTop: "1rem", marginRight: "1rem" }}>
            <Col>
              <div style={{ marginTop: "1rem" }}></div>
              <Row className="align-items-center">
                <Col lg={3}>
                  <div className={styles.subtitle}>Item Name:</div>
                </Col>
                <Col>
                <div className={styles.itemNameFetch}>Rare painting</div>

                </Col>
              </Row>

              <div style={{ marginTop: "1rem" }}></div>

              <Row className="align-items-center">
                <Col lg={3}>
                  <div className={styles.subtitle}>Seller name:</div>
                </Col>
                <Col>
                  <div className={styles.sellerNameFetch}>Jiasheng Li</div>
                </Col>
              </Row>

              <div style={{ marginTop: "1rem" }}></div>

              <Row className="align-items-center">
                <Col lg={3}>
                  <div className={styles.subtitle}>Meetup Schedule*:</div>
                </Col>

                <Col>
                  <Row className="align-items-center">
                    <ButtonGroup justified>
                      <Dropdown style={{ width: "100%" }}>
                        <Dropdown.Toggle className={styles.dropdown}>
                          Date
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ width: "90%" }}>
                          <Dropdown.Item> 4/15/2022</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Row>
                </Col>

                <Col>
                  <Row className="align-items-center">
                    <ButtonGroup justified>
                      <Dropdown style={{ width: "100%" }}>
                        <Dropdown.Toggle className={styles.dropdown}>
                          Time
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ width: "90%" }}>
                          <Dropdown.Item> 10:00 A.M.</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Row>
                </Col>
              </Row>

              <div style={{ marginTop: "1rem" }}></div>

              <Row className="align-items-center">
                <Col lg={3}>
                  <div className={styles.subtitle}>Contact:*</div>
                </Col>
                <Col>
                  <input
                    className={styles.input}
                    type="text"
                    name="contactInfo"
                    placeholder="email or phone number"
                  />
                </Col>
              </Row>

              <div style={{ marginTop: "1rem" }}></div>

              <Row className="align-items-center">
                <Row>
                  <div className={styles.additionalInfo}>
                    Addtional Information:
                  </div>
                </Row>
                <Row style={{ marginTop: "0.5rem" }}>
                  <textarea 
                  className={styles.addtionalInfoInput} 
                  name="addtionalInfoInput" type="text" 
                  rows = "6" 
                  maxlength = "300"  
                  wrap="hard"
                  placeholder="Enter your addtional info....">
                  </textarea>
                    
                </Row>
              </Row>
            </Col>

            <Col>
              <Row>
                <img src={image} alt="itemImage" className={styles.image}></img>
              </Row>
              <Row>
                <Col> </Col>

                <Col>
                  <Button className={styles.button}>Send</Button>
                </Col>

                <Col> </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Message;
