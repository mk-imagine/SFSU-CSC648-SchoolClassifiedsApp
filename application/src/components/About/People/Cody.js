import React from "react";
import pic from "../../../images/cody.png";
import styles from "./index.module.css";
import { Row, Col } from "react-bootstrap";

const Cody = () => {
  return (
    <div>
      <div>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className={styles.centerDiv}>
              <Row>
                <h3 className={styles.subtitle}>Backend Lead</h3>
              </Row>
              {/* name Here */}
              <Row>
                <h1 className={styles.title}>Cody Huang</h1>
              </Row>
              {/* Fun Line here */}
              <Row>
                <p className={styles.para}>I am the backend lead for Team 8. I enjoy coding specfically video games. 
                They are my passion. I love mexican food. I am also an active person when I'm not on the computer. Some of the sports
                I enjoy are river kayaking, wrestling, running, and snowboarding. I bring a lot of passion into
                my projects.</p>
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

export default Cody;
