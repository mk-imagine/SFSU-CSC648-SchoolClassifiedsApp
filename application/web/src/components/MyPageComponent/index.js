// import React from "react";
// import { Tabs, Tab, Row, Col } from "react-bootstrap";
// import Paper from "@mui/material/Paper";
// import MyMessages from "../MyMessages";
// import SentMessages from "../SentMessages";
// import MyAccount from "../MyAccount";

// Jiasheng
import React from "react";
import Tab from "react-bootstrap/Tab";
import {
  Col,
  Container,
  Row,
  Button,
  Dropdown,
  Card,
  ListGroup,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import styles from "./index.module.css";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// import postHistoryItemCard from "../PostHistoryItemCard";

/**
 * Loads My Page component
 * @returns HTML of MyPage
 */
const MyPageComponent = () => {
  const userInformation = localStorage.getItem("user_login_information");
  console.log("user informatioin in MyPage bar", userInformation);

  // for (let i = 0; i < localStorage.length; i++) {
  //   console.log(localStorage.getItem(localStorage.key(i)));
  // }

  for (let i = 0; i < localStorage.length; i++) {
    console.log(
      localStorage.key(i) +
        "=[" +
        localStorage.getItem(localStorage.key(i)) +
        "]"
    );
  }

  console.log(JSON.stringify(userInformation));

  const user_email = userInformation.user_email;

  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  
  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

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

      <Row style={{ marginTop: "2rem", background:"white" }}>
         <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
      </Row>
    </Container>
  );
};

export default MyPageComponent;
