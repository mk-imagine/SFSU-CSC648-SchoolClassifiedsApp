import React from "react";
import pic from "../../../images/mark.png";
import styles from "./index.module.css";
import { Row, Col } from "react-bootstrap";

const Mark = () => {
  return (
    <div>
      <div>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div className={styles.centerDiv}>
              <Row>
                <h3 className={styles.subtitle}>Team Lead</h3>
              </Row>
              {/* name Here */}
              <Row>
                <h1 className={styles.title}>Mark Kim</h1>
              </Row>
              {/* Fun Line here */}
              <Row>
                <p className={styles.para}>Mark Kim is Team 8's Lead.  His interests are in finding hidden drivers
                for human behavior; specifically, he wants to see if we can discern whether the data we all create
                can inform us towards our latent interests and passions.  Prior to joining Team 08, he served as
                a Financial Center Manager at Bank of America.  Before that he brings 14 years of experience
                in the retail and service sector as the Founder/CEO of Kindred Enterprises.</p>
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

export default Mark;
