// import React from "react";
// import { Tabs, Tab, Row, Col } from "react-bootstrap";
// import Paper from "@mui/material/Paper";
// import MyMessages from "../MyMessages";
// import SentMessages from "../SentMessages";
// import MyAccount from "../MyAccount";

// Jiasheng
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import {
  Col,
  Container,
  Row,
  Button,
  Dropdown,
  Tag,
  Tags
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import styles from "./index.module.css";
import PostItemCard from "../PostHistoryItemCard";
import axios from "axios";
import SentMessages from "../SentMessages";
import ReceivedMessages from "../ReceivedMessage";

// import postHistoryItemCard from "../PostHistoryItemCard";

/**
 * Loads My Page component
 * @returns HTML of MyPage
 */
const MyPageComponent = () => {
  const [items, setItems] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const columnsPerRow = 3;
  const base_url = "http://localhost:3100/api";

  const userInformation = localStorage.getItem("user_login_information");
  const user_in_json = JSON.parse(userInformation);

  useEffect(() => {
    getUserItems();
    getUserInfo();
  }, []);

  const getUserItems = () => {
    axios.get(`${base_url}/sellerItems/${user_in_json.user_id}`).then((res) => {
      console.log(res.data);
      setItems(res.data);
    });
  };

  const getUserInfo = () => {
    axios
      .get(`${base_url}/login/getUser/${user_in_json.user_id}`)
      .then((res) => {
        // setUserInfo(res.data);
        // console.log(userInfo);
        setFirstName(res.data[0].user_fname);
        setLastName(res.data[0].user_lname);
        setEmail(res.data[0].user_email);
      });

    console.log("user info", userInfo);
  };

  return (
    <Container className={styles.Container}>
      <Row>
        <Col lg={2}>
          <div className={styles.PageTitle}>MyPage</div>
        </Col>

        <Col></Col>
      </Row>

      <Row style={{ marginTop: "2rem" }}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="post-history">
          <Row>
            <Col lg={7}>
              <Row>
                <Col>
                  <Nav
                    variant="pills"
                    className="flex-column"
                    style={{ cursor: "pointer" }}
                  >
                    <Nav.Item>
                      <Nav.Link
                        eventKey="post-history"
                        style={{ fontSize: "1.3rem" }}
                      >
                        Post History
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>

                <Col>
                  <Nav
                    variant="pills"
                    className="flex-column"
                    style={{ cursor: "pointer" }}
                  >
                    <Nav.Item>
                      <Nav.Link
                        eventKey="message"
                        style={{ fontSize: "1.3rem" }}
                      >
                        Message
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>

                <Col>
                  <Nav
                    variant="pills"
                    className="flex-column"
                    style={{ cursor: "pointer" }}
                  >
                    <Nav.Item>
                      <Nav.Link
                        eventKey="acct-detail"
                        style={{ fontSize: "1.3rem" }}
                      >
                        Account Details
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
            </Col>

            <Col></Col>
          </Row>

          <Row style={{ marginTop: "1rem" }}>
            <Row style={{ marginTop: "1rem" }}>
              <Tab.Content>
                {/* Post History Page  */}
                <Tab.Pane eventKey="post-history">
                  {/* <Row>
                    <Col></Col>

                    <Col lg={9}>
                      <Row>
                        <Col>
                          <Dropdown
                            value="Status"
                            className={styles.statusDropdown}
                          >
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              Status
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="" onClick="">
                                Approved
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>

                        <Col>
                          <Dropdown
                            value="Sort By"
                            style={{
                              marginTop: "0.5rem"
                            }}
                          >
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              Sort By Date
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="" onClick="">
                                Sort By Alphabets
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>

                        <Col>
                          <Button
                            style={{
                              marginTop: "0.5rem"
                            }}
                          >
                            Apply
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row> */}

                  <Row style={{ marginTop: "2rem" }}>
                    <Container>
                      <Row xs={1} md={columnsPerRow}>
                        {items.map((e) => {
                          let image_url = `${base_url}/images/${e.item_pic}`;
                          let status = "";
                          if (parseInt(e.itemapproved) === 0) {
                            status = "Pending";
                          } else {
                            status = "Approved";
                          }

                          const timestamp = new Date(e.item_created);
                          const date = timestamp.toLocaleDateString();

                          return (
                            <div className={styles.itemCard}>
                              <div style={{ marginTop: "2rem" }}></div>
                              <PostItemCard
                                price={e.item_price}
                                itemName={e.item_name}
                                description={e.item_desc}
                                categoryName={e.category_name}
                                date={date}
                                approved={status}
                                image={image_url}
                              />
                            </div>
                          );
                        })}
                      </Row>
                    </Container>
                  </Row>
                </Tab.Pane>

                {/* Message Page  */}
                <Tab.Pane eventKey="message" style={{ marginLeft: "1rem" }}>
                  {/* Message Info fetching Area */}
                  <Tabs defaultActiveKey={1} id="noanim-tab-example">
                    {/* Display Sent Message Tags */}
                    <Tab eventKey={1} title="Message Inbox">
                      <div style={{ overflow: "scroll", height: "30rem" }}>
                        <ReceivedMessages />
                      </div>
                    </Tab>
                    {/* Display Received Message Tags */}
                    <Tab eventKey={2} title="Sent Message">
                      <div style={{ overflow: "scroll", height: "30rem" }}>
                        <SentMessages />
                      </div>
                    </Tab>
                  </Tabs>
                </Tab.Pane>

                {/* Account Details Display */}
                <Tab.Pane eventKey="acct-detail" style={{ marginLeft: "1rem" }}>
                  <Row>
                    <div className={styles.CurrentPageTitle}>
                      Account Details Page
                    </div>
                  </Row>

                  <Row>
                    <Col lg={2}>
                      <div className={styles.UsernameLable}>First name:</div>
                    </Col>
                    <Col lg={2}>
                      <div className={styles.UsernameFetch}>{firstName}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={2}>
                      <div className={styles.UsernameLable}>Last name:</div>
                    </Col>
                    <Col lg={2}>
                      <div className={styles.UsernameFetch}> {lastName}</div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={2}>
                      <div className={styles.EmailLable}>Email:</div>
                    </Col>
                    <Col lg={2}>
                      <div className={styles.EmailFecth}>{email}</div>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "1rem" }}>
                    <Col>
                      <span style={{ fontSize: "1.2rem" }}>
                        Reset Password:{" "}
                        <a
                          href="/changepassword"
                          style={{ marginLeft: "4rem" }}
                        >
                          Reset
                        </a>
                      </span>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Row>
          </Row>
        </Tab.Container>
      </Row>
    </Container>
  );
};

export default MyPageComponent;
