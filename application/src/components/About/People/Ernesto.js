import React from "react";
import pic from "../../../images/ernesto.JPG";
import styles from "./index.module.css";
import { Row, Col } from "react-bootstrap";

const Ernesto = () => {
  return (
    <div>
      <div>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className={styles.centerDiv}>
              <Row>
                <h3 className={styles.subtitle}>Hello, I am a part of Team 8 Frontend Team!</h3>
              </Row>
            
              <Row>
                <h1 className={styles.title}>Ernesto Diaz</h1>
              </Row>

              <Row>
                <p className={styles.para}>On my free time I love to play video games, go to San Francisco, and listen to music.</p>
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
              src={pic}
              alt="pic"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Ernesto;
