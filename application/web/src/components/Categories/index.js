import React, { useState, useEffect } from "react";
import { Dropdown, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ViewItems } from "../ViewItems";
import styles from "./index.module.css";
import TopCategoryItems from "../TopcategoryItems";
import { ItemTopCategoryCard } from "../ItemCard";

const Categories = () => {
  const [catergories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [isToggle, setToggle] = useState(false);

  const [items, setItems] = useState([]);
  const [numberOfTotalItems, setNumberOfTotalItems] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const base_url = "https://csc648-website.herokuapp.com";
  //const base_url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchCategories();
    axios.get(`${base_url}/items`).then((res) => {
      setItems(res.data);
      setNumberOfTotalItems(res.data.length);
    });
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
    console.log("On submit");

    const searchTerm = searchInput;
    const category_id = selectedCategoryId;
    const category_name = selectedCategory;

    console.log("category id ", category_id);
    console.log("search term ", searchTerm);

    if (category_id === 0 && searchTerm !== "") {
      // we return items according to search term
      setToggle(true);
      console.log("In one");
      axios.get(`${base_url}/searchitems/${searchTerm}`).then((res) => {
        setItems(res.data);
        setNumberOfItems(res.data.length);
      });
    } else if (
      category_id !== 0 &&
      searchTerm === "" &&
      category_name !== "All Items"
    ) {
      // we return items according to categorys
      console.log("In two");
      setToggle(true);
      axios.get(`${base_url}/searchcategory/${category_name}`).then((res) => {
        setItems(res.data);
        setNumberOfItems(res.data.length);
      });
    } else if (category_id !== 0 && searchTerm !== "") {
      //return items according to category and search term
      console.log("In three");
      setToggle(true);
      axios
        .get(`${base_url}/itemwithcategory/${searchTerm}/${category_name}`)
        .then((res) => {
          setItems(res.data);
          setNumberOfItems(res.data.length);
        });
    } else {
      console.log("In four");
      setToggle(false);
      axios.get(`${base_url}/items`).then((res) => {
        setItems(res.data);
        setNumberOfItems(res.data.length);
      });
    }
    setSearchInput("");
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
                      style={{ width: "35rem" }}
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

      <Row>
        <Col lg={9}></Col>
        <Col></Col>
      </Row>

      <div className={styles.heading}>Welcome to PurpleMarket</div>
      <div className={styles.subheading}>
        A market place that connects people only associated with SFSU to sell or
        purchase items.
      </div>
      <div
        style={{
          borderStyle: "solid",
          borderColor: "#000",
          marginTop: "1rem"
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          {!isToggle ? <TopCategoryItems /> : null}
          <Row>
            <Col lg={9}>
              <div className={styles.titleCategories}>
                {isToggle
                  ? `${numberOfItems} of ${numberOfTotalItems} results `
                  : "Latest Items"}
              </div>
            </Col>
            <Col lg={3}>
              <Dropdown
                onSelect={dropDownChange}
                value="Sort By"
                style={{ marginLeft: "8rem", marginTop: "0.5rem" }}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sort By Date
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="" onClick="">
                    Sort By Alphabets
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <ViewItems items={items} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
