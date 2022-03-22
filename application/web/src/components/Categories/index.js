import React, { useState, useEffect } from "react";
import { Dropdown, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ViewItems } from "../ViewItems";

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
  };

  const onSubmit = () => {
    setFinalSearchInput(searchInput);
    console.log("selectedCategory: ", selectedCategory);
    console.log("Search term: ", searchInput);
  };

  return (
    <div>
      <div style={{ margin: "auto", width: "50%" }}>
        <Row>
          <Col lg={3}>
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
          <Col lg={6}>
            <div className="form-group">
              <input
                style={{ width: "20rem" }}
                type="text"
                className="form-control"
                placeholder={"Search Here"}
                onChange={searchHandleChange}
                value={searchInput}
              />
            </div>
          </Col>
          <Col lg={3}>
            <Button variant="primary" onClick={onSubmit}>
              Search
            </Button>
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
