import React, { useState, useEffect } from "react";
import { Dropdown, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ViewItems } from "../ViewItems";
import styles from "./index.module.css";

const Categories = () => {
  const [catergories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [finalSearchInput, setFinalSearchInput] = useState("");
  const base_url = "https://csc648-website.herokuapp.com";
  //const base_url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get(`${base_url}/categories`).then((res) => {
      setCategories(res.data);
    });
  };

  const dropDownChange = (e) => {
    console.log("selected category: ", e);
    setSelectedCategoryId(e);
  };

  const searchHandleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const onSubmit = () => {
    setFinalSearchInput(searchInput);
    console.log("selectedCategory: ", selectedCategory);
    console.log("Search term: ", searchInput);
  };

  return (
    <div>
      <Row>
        <div style={{ textAlign: "center" }}>CSC 648 Spring 2022 Team 08</div>
      </Row>
      <div className={styles.container}>
        <Row>
          <Col lg={2}>
            <div className={styles.title}>Purple Market</div>
          </Col>
          <Col lg={7}>
            <Row className={styles.top}>
              <div style={{ marginLeft: "5rem" }}>
                <div class="input-group">
                  <span class="input-group-addon">
                    <Dropdown
                      onSelect={dropDownChange}
                      value={selectedCategory}
                      id={styles.dropdownMenu}
                    >
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedCategory}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {catergories.map((e) => {
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
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>

                  <div className="form-group">
                    <input
                      style={{ width: "36rem" }}
                      type="text"
                      className="form-control rounded-0"
                      placeholder={"Search Here"}
                      onChange={searchHandleChange}
                      value={searchInput}
                    />
                  </div>

                  <span class="input-group-addon">
                    <Button
                      variant="primary rounded-0"
                      onClick={onSubmit}
                      style={{
                        backgroundColor: "#5f27cd",
                        borderColor: "#5f27cd"
                      }}
                    >
                      Search
                    </Button>
                  </span>
                </div>
              </div>
            </Row>
          </Col>
          <Col>
            <Row>
              <div className={styles.buttonGroup}>
                <Col>
                  <Button className={styles.topButton} variant="primary">
                    Post Items
                  </Button>
                  <Button className={styles.topButton} variant="primary">
                    Login
                  </Button>
                  <Button className={styles.topButton} variant="primary">
                    Register
                  </Button>
                </Col>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
      {/* View items here */}
      <ViewItems
        category_id={selectedCategoryId}
        category_name={selectedCategory}
        searchTerm={finalSearchInput}
      />
    </div>
  );
};

export default Categories;
