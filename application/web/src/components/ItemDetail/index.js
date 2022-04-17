import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styles from "./index.module.css";
import image from "../../images/image.png";
import { useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <Row>
          <div className={styles.pageTitle}>Item Detail</div>
        </Row>

        <Row className={styles.itemInfo}>
          <Col lg={6}>
            <Row>
              <img src={image} alt="itemImage" className={styles.image}></img>
            </Row>
          </Col>

          <Col lg={6}>
            <Row>
              <Col>
                <div className={styles.itemTitleLabel}>Item name:</div>
              </Col>
              <Col>
                <div className={styles.itemTitle}>Rare Painting</div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className={styles.itemPriceLabel}>Price:</div>
              </Col>
              <Col>
                <div className={styles.itemPrice}>$60.00</div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className={styles.itemCategoryLabel}>Category:</div>
              </Col>
              <Col>
                <div className={styles.itemCategory}>Books</div>
              </Col>
            </Row>

            <Row>
              <div className={styles.itemiDescriptionLabel}>Description:</div>
            </Row>

            <Row>
              <p className={styles.itemiDescription}>
                Item Description Fetching from API
              </p>
            </Row>
          </Col>
          <Row>
            <Col></Col>
            <Col lg={3}>
              <Button
                className={styles.button}
                onClick={() => {
                  navigate("/message");
                }}
              >
                Message Seller
              </Button>
            </Col>
            <Col> </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default ItemDetail;
