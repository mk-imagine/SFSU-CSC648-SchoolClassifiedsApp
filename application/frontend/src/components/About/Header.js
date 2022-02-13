import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import styles from "./index.module.css";
import teamsPic from "../../images/team.png";
import TeamTree from "./TeamTree";

const Header = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col className={styles.ColCenter}>
          Software Engineering Class <br></br> SFSU Spring 2022 Section 01
          <br></br> Team N
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col>
          <img className={styles.image} src={teamsPic} alt="book" />
        </Col>
        <Col>
          <TeamTree />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
