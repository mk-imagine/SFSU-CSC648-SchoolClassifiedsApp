import React from "react";
import pic from "../../../images/anonPic.png";
import styles from "./index.module.css";
import { Row, Col } from "react-bootstrap";

const Vivian = () => {
  return (
    <div>
      <div>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className={styles.centerDiv}>
              <Row>
                <h3 className={styles.subtitle}>Hello, it's me</h3>
              </Row>
              {/* name Here */}
              <Row>
                <h1 className={styles.title}>Vivian.</h1>
              </Row>
              {/* Fun Line here */}
              <Row>
                <p className={styles.para}>I like walking, listening to music, and watching cat videos.</p>
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

export default Vivian;
