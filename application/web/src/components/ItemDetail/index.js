import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Load Item Detail Page Component
 * @returns HTML of Item Detail Component
 */
const ItemDetail = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { item_details, image } = state;
  console.log("in item detail page:", item_details);
  const full_name = item_details.user_fname + " " + item_details.user_lname;

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
                <div className={styles.itemTitle}>{item_details.item_name}</div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className={styles.itemPriceLabel}>Price:</div>
              </Col>
              <Col>
                <div className={styles.itemPrice}>
                  ${item_details.item_price}
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className={styles.itemCategoryLabel}>Category:</div>
              </Col>
              <Col>
                <div className={styles.itemCategory}>
                  {item_details.category_name}
                </div>
              </Col>
            </Row>

            <Row>
              <div className={styles.itemiDescriptionLabel}>Description:</div>
            </Row>

            <Row>
              <p className={styles.itemiDescription}>
                {item_details.item_desc}
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
