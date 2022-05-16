import React from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import styles from "./index.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * Load Message Send component
 * @returns HTML of Message Send component
 */
const Message = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { item_details, image } = state;
  console.log("in message page:", item_details);

  const full_name = item_details.user_fname + " " + item_details.user_lname;

  //New Modification for clearing inputs after clicking Cancle button
  const [contact, setContact] = React.useState("");
  const [message, setMessage] = React.useState("");

  const clearFields = () => {
    setContact("");
    setMessage("");
    console.log("Cancel Button Clicked");
  };

  const sendMessage = () => {
    const userInformation = localStorage.getItem("user_login_information");
    console.log("user informatioin in message post", userInformation);
    console.log("send message btn clicked");

    if (userInformation) {
      //user is logged in -> send the message
      if (userInformation != "loggedOut") {
        //send the message
        console.log("sending message");
        const info = localStorage.getItem("user_login_information");
        const info_json = JSON.parse(info);
        const user_id = info_json.user_id;
        sendPostMessageRequest(user_id);
      } else {
        alert("Please login to send the message");
        window.open("/login", "_blank");
      }
    } else {
      alert("Please login to send the message");
      window.open("/login", "_blank");
    }
  };

  const sendPostMessageRequest = (user_id_of_loggedin_person) => {
    //sending axios post message here

    //TODO: Putting the seller ID.
    var data1 = {
      itemId: item_details.item_id,
      senderId: user_id_of_loggedin_person,
      recipientId: item_details.sellerid,
      meet_time: "null",
      location: "null",
      contactInfo: contact,
      message: message
    };

    var config = {
      method: "post",
      url: "/api/msg/create",  // FOR DEPLOYMENT
      // url: "http://localhost:3100/api/msg/create",
      headers: {
        "Content-Type": "application/json"
      },
      data: data1
    };
    console.log(data1);
    axios(config)
      .then((response) => {
        console.log("Message sent ", response.data);
        alert(
          "Message sent Succesfully. Please Wait for the seller to respond."
        );
        navigate("/");

        //console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("Error in sending message: " + error);
      });
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
              <Row
                className={styles.button}
                style={{ marginTop: "1rem", marginLeft: "4rem" }}
              >
                <Col>
                  <Button className={styles.cancelButton} onClick={clearFields}>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button className={styles.sendButton} onClick={sendMessage}>
                    Send
                  </Button>
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
