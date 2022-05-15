// HEADER:Create A Post Code
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  ButtonGroup,
  Form
} from "react-bootstrap";
import styles from "./index.module.css";
import image from "../../images/image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Load Post Item Page Component
 * @returns HTML of ItemPost Component
 */
const ItemPost = () => {
  const [itemname, setItemname] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [course, setCourse] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [uploaded_pic, setUploadedPic] = useState();
  const [imageToShow, setImageToShow] = useState(image);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [toggleCourse, setToggleCourse] = useState(false);

  const navigate = useNavigate();
  const userInformation = localStorage.getItem("user_login_information");

  let json_user = {};
  if (userInformation != "loggedOut") {
    json_user = JSON.parse(userInformation);
  }

  // console.log("user informatioin in item post bar", userInformation);

  const base_url = "http://localhost:3100/api";

  const handlePhotoUpload = (event) => {
    setUploadedPic(event.target.files[0]);

    if (event.target.files.length !== 0) {
      setImageToShow(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = () => {
    //checking if user is logged in

    console.log("Inside handle submit");
    if (userInformation) {
      if (userInformation !== "loggedOut") {
        //user is logged in
        console.log("we upload image and item here");
        if (checkValidity()) {
          uploadItem();
        }
      } else {
        alert("Please login to publish an item");
        window.open("/login", "_blank");
      }
    } else {
      //user is not logged in
      alert("Please login to publish an item");
      window.open("/login", "_blank");
    }
  };

  //TODO: Fix this
  const checkValidity = () => {
    console.log("In validity");
    if (
      uploaded_pic === null ||
      price === "" ||
      itemname === "" ||
      description === "" ||
      selectedCategoryId === null
    ) {
      console.log("I am here");
      alert("All fields are mandatory");

      return false;
    } else {
      if (selectedCategoryId === "3" && course === "") {
        alert("Course cannot be empty.");
      } else {
        return true;
      }
    }
  };

  const fetchCategories = () => {
    axios.get(`${base_url}/categories`).then((res) => {
      setCategories(res.data);
    });
  };

  const dropDownChange = (e) => {
    console.log("selected category: ", e);
    setSelectedCategoryId(e);

    if (e === "3") {
      setToggleCourse(true);
    } else {
      setToggleCourse(false);
    }
  };

  const uploadItem = () => {
    const formData = new FormData();

    formData.append("image", uploaded_pic);
    formData.append("price", price);
    formData.append("name", itemname);
    formData.append("description", description);
    formData.append("course", course);
    formData.append("category", selectedCategoryId);
    formData.append("sellerId", parseInt(json_user.user_id));

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    console.log("Before axios");
    console.log("sellerId....", json_user.user_id)
    axios
      .post(`${base_url}/post/post`, formData, config)
      .then((response) => {
        console.log(response.data);

        alert(
          "Your post has been uploaded. It will take upto 24 hours for the post to be reviewed and approved."
        );
        navigate("/");
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const clearFields = () => {
    setItemname("");
    setPrice("");
    setCourse("");
    setDescription("");
    setSelectedCategoryId(null);
    setSelectedCategory("Select Category");
    setImageToShow(image);
    console.log("Cancel Button Clicked");
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Container className={styles.container}>
        <Row>
          <div className={styles.title}>Item Post Page</div>
        </Row>
        <div className={styles.form}>
          <Row style={{ marginTop: "1rem", marginRight: "1rem" }}>
            <Col>
              {/* <div style={{ marginTop: "1rem" }}></div> */}

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
                    required
                    value={itemname}
                    onChange={(e) => setItemname(e.target.value)}
                  />
                </Col>
              </Row>

              <div style={{ marginTop: "1.5rem" }}></div>
              <Row className="align-items-center">
                <Col lg={3}>
                  <div className={styles.subtitle}>Price:*</div>
                </Col>
                <Col>
                  <input
                    className={styles.input}
                    type="text"
                    pattern="[0-9]*"
                    name="pricename"
                    required
                    placeholder="e.g.$25"
                    value={price}
                    // onChange={(e) => setPrice(e.target.value)}
                    onChange={(e) =>
                      setPrice((v) =>
                        e.target.validity.valid ? e.target.value : v
                      )
                    }
                  />
                </Col>
              </Row>
              <div style={{ marginTop: "1.5rem" }}></div>
              <Row className="align-items-center">
                <Col lg={3}>
                  <div className={styles.subtitle}>Category:*</div>
                </Col>
                <Col>
                  <Row className="align-items-center">
                    <ButtonGroup justified>
                      <Dropdown
                        onSelect={dropDownChange}
                        value={selectedCategory}
                        id={styles.dropdownMenu}
                      >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {selectedCategory}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {categories.map((e) => {
                            if (e.category_name !== "All Items") {
                              return (
                                <Dropdown.Item
                                  eventKey={e.category_id}
                                  onClick={() => {
                                    setSelectedCategory(e.category_name);
                                  }}
                                >
                                  {e.category_name}
                                </Dropdown.Item>
                              );
                            }
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup>
                  </Row>
                </Col>

                {toggleCourse ? (
                  <div>
                    <div style={{ marginTop: "1.5rem" }}></div>
                    <Row className="align-items-center">
                      <Col lg={3}>
                        <div className={styles.subtitle}>Course Number:*</div>
                      </Col>
                      <Col>
                        <input
                          className={styles.courseNumInput}
                          type="text"
                          name="coursenumber"
                          placeholder="e.g.CSC648"
                          required
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </div>
                ) : null}

                <div style={{ marginTop: "1.5rem" }}></div>
                <Row className="align-items-center"></Row>
                <Col lg={3}>
                  <Form.Label>Upload Image:*</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    onChange={handlePhotoUpload}
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                  />
                </Col>

                <div style={{ marginTop: "1.5rem" }}></div>
                <Row className="align-items-center"></Row>
                <Col lg={3}>
                  <div className={styles.subtitle}>Description:*</div>
                </Col>
                <Col>
                  <input
                    className={styles.input}
                    type="textarea"
                    name="textareaname"
                    required
                    placeholder="e.g. This product has so many features"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>

            <Col>
              <Row>
                <Col lg={8}>
                  <Row>
                    <Col lg={5}>
                      <p>* - mandatory fields</p>
                    </Col>
                  </Row>
                  <Row>
                    <p>May take up to 24 hours for item post to be approved.</p>
                  </Row>
                </Col>
              </Row>

              <Row>
                <img
                  src={imageToShow}
                  alt="postimage"
                  required
                  className={styles.image}
                ></img>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Button
                        className={styles.CancelButton}
                        onClick={clearFields}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className={styles.Postbutton}
                        onClick={handleSubmit}
                      >
                        Post Item
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default ItemPost;
