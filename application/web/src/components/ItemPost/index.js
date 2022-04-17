// HEADER:Create A Post Code
import React from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import styles from "./index.module.css";
import image from "../../images/image.png";

const ItemPost = () => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <Container className={styles.container}>
        <Row>
          <div className={styles.title}>Item Post Page</div>
        </Row>
        <Row style={{ marginTop: "1rem", marginRight: "1rem" }}>
          <Col>
            <Row>
              <div>Post Your Items</div>
            </Row>
            <div style={{ marginTop: "1rem" }}></div>

            <Row className="align-items-center">
              <Col lg={3}>
                <div className={styles.subtitle}>Item Name:*</div>
              </Col>
              <Col>
                <input
                  className={styles.input}
                  type="text"
                  name="itemname"
                  placeholder="e.g. Macbook"
                />
              </Col>
            </Row>
            
            <div style={{ marginTop: "1rem" }}></div>
            <Row className="align-items-center">
              <Col lg={3}>
                <div className={styles.subtitle}>Price:*</div>
              </Col>
              <Col>
                <input
                  className={styles.input}
                  type="number"
                  name="pricename"
                  placeholder="e.g.$25"
                />
              </Col>
            </Row>
            <div style={{ marginTop: "1rem" }}></div>
            <Row className="align-items-center">
              <Col lg={3}>
                <div className={styles.subtitle}>Category:*</div>
              </Col>
              <Col>
                <Row className="align-items-center">
                  <ButtonGroup justified>
                    <Dropdown className={styles.dropdown}>
                      <Dropdown.Toggle className={styles.dropdown}>
                        Category
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ width: "94%" }}>
                        <Dropdown.Item> Item1</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ButtonGroup>
                </Row>
              </Col>
              <div style={{ marginTop: "1rem" }}></div>
              <Row className="align-items-center"></Row>
              <Col lg={3}>
                <div className={styles.subtitle}>Course Number:*</div>
              </Col>
              <Col>
                <input
                  className={styles.input}
                  type="number"
                  name="coursenumber"
                  placeholder="e.g.CSC648"
                />
              </Col>

              <div style={{ marginTop: "1rem" }}></div>
              <Row className="align-items-center"></Row>
              <Col lg={3}>
              
                    <Form.Label>Upload Image:*</Form.Label>
             </Col>  
             <Col>
             <Form.Control type="file" />
             </Col>
                    
             <div style={{ marginTop: "1rem" }}></div>
            <Row className="align-items-center">
              <Col lg={3}>
                <div className={styles.subtitle}>Description:*</div>
              </Col>
              <Col>
                <input
                  className={styles.input}
                  type="textarea"
                  name="textareaname"
                  placeholder="e.g. This product has so many features"
                />
              </Col>
            </Row>

            </Row>
          </Col>

          <Col>
            <Row>
              <img src={image} alt="postimage" className={styles.image}></img>
            </Row>
            <Row>
              <Col> </Col>

              <Col>
                <Button className={styles.button}>Post Image</Button>
              </Col>

              <Col> </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItemPost;
