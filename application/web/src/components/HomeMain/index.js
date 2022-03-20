import React from "react";
import { Row, Col } from "react-bootstrap";
import book from "../../images/book.jpg";
import styles from "./index.module.css";
import { getCategories } from "../../../../server/routes/backendapi";

export const HomeMain = () => {
  const test = () => {
    console.log(getCategories());
  };

  return (
    <div style={{ paddingTop: "3rem" }}>
      <div>
        <Row>
          <Col>
            <img className={styles.thumbnail} src={book} alt="book" />
          </Col>
          <Col style={{ paddingTop: "3rem" }}>
            <Row>
              <h3>Sudoku 1000+ Puzzles</h3>
            </Row>
            <Row>
              <p>
                A Book With More Than 1000 Sudoku Puzzles from Easy to Hard for
                adults.
              </p>
            </Row>
            <Row>
              <p style={{ fontWeight: "bold" }}>$10.87</p>
            </Row>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <hr></hr>
      </div>
    </div>
  );
};
