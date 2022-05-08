// import React from "react";
// import { Tabs, Tab, Row, Col } from "react-bootstrap";
// import Paper from "@mui/material/Paper";
// import MyMessages from "../MyMessages";
// import SentMessages from "../SentMessages";
// import MyAccount from "../MyAccount";

// Jiasheng
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import { Col, Container, Row, Button, Dropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import styles from "./index.module.css";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import PostItemCard from "../PostHistoryItemCard";
import axios from "axios";

// import postHistoryItemCard from "../PostHistoryItemCard";

/**
 * Loads My Page component
 * @returns HTML of MyPage
 */
const MyPageComponent = () => {
  const [items, setItems] = useState([]);
  const [userItems, setUserItems] = useState([]);

  const columnsPerRow = 3;
  const base_url = "http://localhost:3100/api";

  const userInformation = localStorage.getItem("user_login_information");
  const user_in_json = JSON.parse(userInformation);

  const user_email = userInformation.user_email;

  useEffect(() => {
    getUserItems();
  }, []);

  const getUserItems = () => {
    axios.get(`${base_url}/sellerItems/${user_in_json.user_id}`).then((res) => {
      console.log(res.data);
      setItems(res.data);
    });

    console.log("user items:", items);
  };

  const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" }
  ];

  const columns = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 }
  ];

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
                  <Row>
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
                  </Row>

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

                          let date = Date.parse(e.item_created);

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
                  <Row>
                    <Col>
                      <div className={styles.CurrentPageTitle}>Messages</div>
                    </Col>

                    <Col lg={9}>
                      <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                          <Dropdown
                            value="Sort By"
                            style={{
                              marginLeft: "0.5rem",
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
                              marginTop: "0.5rem",
                              marginLeft: "0.5rem"
                            }}
                          >
                            Apply
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  {/* Message Info fetching Area */}
                  <Row>
                    <Row style={{ marginTop: "2rem", background: "white" }}>
                      <div style={{ height: 300, width: "100%" }}>
                        <DataGrid rows={rows} columns={columns} />
                      </div>
                    </Row>
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
                      <div className={styles.EmailFecth}>{user_email}</div>
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
