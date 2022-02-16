import React from "react";
import pic from "../../../images/Jesus.png";
import styles from "./index.module.css";
import { Row, Col } from "react-bootstrap";

const Jesus = () => {
  return (
    <div>
      <div>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className={styles.centerDiv}>
              <Row>
                <h3 className={styles.subtitle}>Hello everyone!</h3>
              </Row>
              {/* name Here */}
              <Row>
                <h1 className={styles.title}> I am Jesus Cervantes Fajardo.</h1>
              </Row>
              {/* Fun Line here */}
              <Row>
                <p className={styles.para}>And I am a part of Team 8's back end developers! 
                Some things I enjoy are video games, music, and fishing.</p>
              </Row>
            </div>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <div
              style={{
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <img className={styles.image} src={pic} alt="happy coding pic" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Jesus;
