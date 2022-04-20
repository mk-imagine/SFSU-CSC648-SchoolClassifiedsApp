import React from "react";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import MyMessages from "../MyMessages";
import SentMessages from "../SentMessages";
import MyAccount from "../MyAccount";

/**
 * Loads My Page component
 * @returns HTML of MyPage
 */
const MyPageComponent = () => {
  return (
    <div>
      <div>
        <div style={{ marginTop: "4rem" }}></div>
        <Row>
          <Col></Col>
          <Col lg={11}>
            <Paper elevation={3} style={{ height: "40rem" }}>
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="messages" title="My Messages">
                  <MyMessages />
                </Tab>
                <Tab eventKey="profile" title="Sent Messages">
                  <SentMessages />
                </Tab>
                <Tab eventKey="contact" title="My Account">
                  <MyAccount />
                </Tab>
              </Tabs>
            </Paper>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </div>
  );
};

export default MyPageComponent;
