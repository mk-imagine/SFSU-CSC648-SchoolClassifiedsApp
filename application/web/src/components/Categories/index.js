import React, { useState, useEffect } from "react";
import { Dropdown, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ViewItems } from "../ViewItems";

const Categories = () => {
  const [catergories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const base_url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchCategories();
  });

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
    console.log();
  };

  const onSubmit = () => {
    setSearchInput(searchInput);
    console.log("selectedCategory: ", selectedCategory);
    console.log("Search term: ", searchInput);
  };

  return (
    <div>
      <div>
        {/* This is the cateegories and search bar */}
        <Row style={{ textAlign: "center" }}>
          {/* Second Col */}
          <Col md={12}>
            <Dropdown onSelect={dropDownChange} value={selectedCategory}>
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
          </Col>
          <Col>
            <Col>
              <div className="form-group">
                <input
                  style={{ width: "22rem" }}
                  type="text"
                  className="form-control"
                  placeholder={"Search Here"}
                  onChange={searchHandleChange}
                  value={searchInput}
                />
              </div>
            </Col>
          </Col>

          <Col>
            {/* Third Col */}
            <Row>
              <Col>
                <Button variant="primary" onClick={onSubmit}>
                  Search
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* View items here */}
      <ViewItems
        category_id={selectedCategoryId}
        category_name={selectedCategory}
        searchTerm={searchInput}
      />
    </div>
  );
};

export default Categories;
