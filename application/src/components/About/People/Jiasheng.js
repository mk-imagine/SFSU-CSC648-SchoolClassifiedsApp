import React from "react";
import pic from "../../../images/JiashengLi.JPG";
import styles from "./index.module.css";
import { Row, Col } from "react-bootstrap";

const Jiasheng = () => {
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
                <h1 className={styles.title}>Jiasheng Li</h1>
              </Row>
              {/* Fun Line here */}
              <Row>
                <p className={styles.para}>I am from Guangzhou, China which has lots of delicious local foods including dim sum,  
                wonton noodles, and Char Siu. I like sports, especially basketball. 
                My favorite basketball player is Kobe Bryant. Also, I am a sneakerhead who likes collecting sneakers. </p>
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

export default Jiasheng;
