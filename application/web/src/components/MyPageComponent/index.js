// import React from "react";
// import { Tabs, Tab, Row, Col } from "react-bootstrap";
// import Paper from "@mui/material/Paper";
// import MyMessages from "../MyMessages";
// import SentMessages from "../SentMessages";
// import MyAccount from "../MyAccount";

// Jiasheng
import React from "react";
import Tab from "react-bootstrap/Tab";
import { Col, Container, Row, Button, Dropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import styles from "./index.module.css";

/**
 * Loads My Page component
 * @returns HTML of MyPage
 */
const MyPageComponent = () => {
  return (
    // <div>
    //   <div>
    //     <div style={{ marginTop: "4rem" }}></div>
    //     <Row>
    //       <Col></Col>
    //       <Col lg={11}>
    //         <Paper elevation={3} style={{ height: "40rem" }}>
    //           <Tabs
    //             defaultActiveKey="profile"
    //             id="uncontrolled-tab-example"
    //             className="mb-3"
    //           >
    //             <Tab eventKey="messages" title="My Messages">
    //               <MyMessages />
    //             </Tab>
    //             <Tab eventKey="profile" title="Sent Messages">
    //               <SentMessages />
    //             </Tab>
    //             <Tab eventKey="contact" title="My Account">
    //               <MyAccount />
    //             </Tab>
    //           </Tabs>
    //         </Paper>
    //       </Col>
    //       <Col></Col>
    //     </Row>
    //   </div>
    // </div>

    // Jiasheng
    <Container className={styles.Container}>
      <Row>
        <Col lg={2}>
          <div className={styles.PageTitle}>MyPage</div>
        </Col>

        <Col></Col>
      </Row>

      <Row style={{ marginTop: "2rem" }}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                  <Row>
                    <Col>
                      <div className={styles.CurrentPageTitle}>
                        Post History
                      </div>
                    </Col>

                    <Col lg={9}>
                      <Row>
                        <Col lg={1}></Col>
                        <Col>
                          <Dropdown
                            value="Location"
                            style={{ marginLeft: "18rem", marginTop: "0.5rem" }}
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
                              marginLeft: "0.5rem",
                              marginTop: "0.5rem",
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
                              marginTop: "0.5rem",
                              marginLeft: "0.5rem",
                            }}
                          >
                            Apply
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "2rem" }}>
                    <Col>
                      <div className={styles.PostHistoryPageDisplayLabel}>
                        Item Name
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.PostHistoryPageDisplayLabel}>
                        Time
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.PostHistoryPageDisplayLabel}>
                        Status
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.PostHistoryPageDisplayLabel}>
                        Explanation
                      </div>
                    </Col>

                    <Col></Col>
                  </Row>

                  {/* Post Info fetching Area */}
                  <Row>
                    <Col>
                      <div className={styles.PostFethcingItemName}>
                        Rare Painting
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.PostFethcingTime}>4/17/2022</div>
                    </Col>
                    <Col>
                      <div className={styles.PostFethcingStatus}>Approve</div>
                    </Col>
                    <Col>
                      <div className={styles.PostFethcingExplanation}>
                        Item publicized
                      </div>
                    </Col>
                    <Col>
                    <Row>
                    <Col></Col>
                      <Col>
                        <Button className={styles.DetailButton}>Details</Button>
                      </Col>
                      <Col></Col>
                    </Row>
                    </Col>
                  </Row>
                </Tab.Pane>

                {/* Message Page  */}
                <Tab.Pane eventKey="message" style={{ marginLeft: "1rem" }}>
                  <Row>
                    <Col>
                      <div className={styles.CurrentPageTitle}>Messages</div>
                    </Col>

                    <Col lg={9}>
                      <Row>
                        {/* <Col>
                          <Dropdown
                            value="Location"
                            style={{ marginLeft: "18rem", marginTop: "0.5rem" }}
                          >
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              Locations
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="" onClick="">
                                HSS
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col> */}
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                          <Dropdown
                            value="Sort By"
                            style={{
                              marginLeft: "0.5rem",
                              marginTop: "0.5rem",
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
                              marginTop: "0.5rem",
                              marginLeft: "0.5rem",
                            }}
                          >
                            Apply
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "2rem" }}>
                    <Col>
                      <div className={styles.MessagePageDisplayLabel}>Date</div>
                    </Col>
                    <Col>
                      <div className={styles.MessagePageDisplayLabel}>
                        Username
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.MessagePageDisplayLabel}>Item</div>
                    </Col>
                    <Col>
                      <div className={styles.MessagePageDisplayLabel}>
                        Message
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.MessagePageDisplayLabel}>
                        Contact
                      </div>
                    </Col>
                  </Row>

                  {/* Message Info fetching Area */}
                  <Row>
                    <Col>
                      <div className={styles.MessageFethcingUsername}>
                        4/27/2022
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.MessageFethcingUsername}>
                        Jiasheng Li
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.MessageFethcingLocation}>
                        Rare Painting
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.MessageFethcingMessage}>
                        Is your item still available?
                      </div>
                    </Col>
                    <Col>
                      <div className={styles.MessageFethcingContact}>
                        415-706-3270
                      </div>
                    </Col>
                  </Row>
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
                      <div className={styles.UsernameFetch}>Jiasheng</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={2}>
                      <div className={styles.UsernameLable}>Last name:</div>
                    </Col>
                    <Col lg={2}>
                      <div className={styles.UsernameFetch}> Li</div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={2}>
                      <div className={styles.EmailLable}>Email:</div>
                    </Col>
                    <Col lg={2}>
                      <div className={styles.EmailFecth}>
                        jli29@mail.sfsu.edu
                      </div>
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

                  <Row style={{ marginTop: "1rem" }}>
                    <Col>
                      <span style={{ fontSize: "1.2rem" }}>
                        Reset Username:{" "}
                        <a
                          href="/changeusername"
                          style={{ marginLeft: "3.5rem" }}
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
