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
import { useLocation } from "react-router-dom";

/**
 * Load Message Send component
 * @returns HTML of Message Send component
 */
const Message = () => {
  const { state } = useLocation();
  const { item_details, image } = state;
  console.log("in message page:", item_details);
  const full_name = item_details.user_fname + " " + item_details.user_lname;

  //New Modification for clearing inputs after clicking Cancle button
  const [contact, setContact] = React.useState("");
  const [message, setMessage] = React.useState("");

  const clearFields = () => {
    setContact("");
    setMessage("");
    console.log("Cancel Button Clik");
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Container className={styles.container}>
        <Row>
          <div className={styles.title}>Message Page</div>
        </Row>

        <Form className={styles.form}>
          <Row style={{ marginTop: "1rem", marginRight: "1rem" }}>
            <Col>
              <div style={{ marginTop: "1rem" }}></div>
              <Row className="align-items-center">
                <Col lg={3}>
                  <div className={styles.subtitle}>Item Name:</div>
                </Col>
                <Col>
                  <div className={styles.itemNameFetch}>
                    {item_details.item_name}
                  </div>
                </Col>
              </Row>

              <div style={{ marginTop: "2rem" }}></div>

              <Row className="align-items-center">
                <Col lg={3}>
                  <div className={styles.subtitle}>Seller name:</div>
                </Col>
                <Col>
                  <div className={styles.sellerNameFetch}>{full_name} </div>
                </Col>
              </Row>

              {/* <div style={{ marginTop: "1rem" }}></div> */}

              {/* <Row className="align-items-center">
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
              </Row> */}

              <div style={{ marginTop: "2rem" }}></div>

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
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </Col>
              </Row>

              <div style={{ marginTop: "2rem" }}></div>

              <Row className="align-items-center">
                <Row>
                  <div className={styles.additionalInfo}>Message:</div>
                </Row>
                <Row style={{ marginTop: "0.5rem" }}>
                  <textarea
                    className={styles.addtionalInfoInput}
                    name="addtionalInfoInput"
                    type="text"
                    rows="6"
                    maxlength="300"
                    wrap="hard"
                    placeholder="Enter your addtional info...."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </Row>
              </Row>
            </Col>

            <Col>
              <Row>
                <img src={image} alt="itemImage" className={styles.image}></img>
              </Row>
              {/* <Row>
                <Col> </Col>

                <Col>
                  <Button className={styles.button}>Send</Button>
                </Col>

                <Col> </Col>
              </Row> */}
              <Row style={{ marginTop: "1rem", marginLeft: "4rem" }}>
                <Col>
                  <Button className={styles.cancelButton} onClick={clearFields}>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button className={styles.sendButton}>Send</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Message;
