import React from "react";
import khushbooPic from "../../../images/khushboo.png";
import styles from "./index.module.css";
import { Row, Col } from "react-bootstrap";

const Khushboo = () => {
  return (
    <div>
      <div>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className={styles.centerDiv}>
              <Row>
                <h3 className={styles.subtitle}>Hello, it's me</h3>
              </Row>
              <Row>
                <h1 className={styles.title}>Khushboo.</h1>
              </Row>
              <Row>
                <p className={styles.para}>
                  I like designing, baking, reading and making soaps!
                </p>
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
              <img
                className={styles.image}
                src={khushbooPic}
                alt="happy coding pic"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Khushboo;
