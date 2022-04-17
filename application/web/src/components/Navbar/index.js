import React, { useState, useEffect } from "react";
import { Dropdown, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const myContext = React.createContext([]);
const Navbar = (props) => {
  const [catergories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  // eslint-disable-next-line
  const [isToggle, setToggle] = useState(false);

  const [items, setItems] = useState([]);
  // eslint-disable-next-line
  const [numberOfTotalItems, setNumberOfTotalItems] = useState(0);
  // eslint-disable-next-line
  const [numberOfItems, setNumberOfItems] = useState(0);

  //const { Provider, Consumer } = React.createContext({ items: [] });

  const navigate = useNavigate();
  const base_url = "/api";
  // const base_url = "http://localhost:3100/api";

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
    navigate("/");

    const searchTerm = searchInput;
    const category_id = selectedCategoryId;
    const category_name = selectedCategory;

    if (
      parseInt(category_id) === 0 &&
      searchTerm !== "" &&
      category_name === "All Items"
    ) {
      // we return items according to search term
      setToggle(true);
      console.log(
        "In one: category id: ",
        category_id,
        " search term: ",
        searchTerm
      );
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
    } else if (
      category_id !== 0 &&
      searchTerm !== "" &&
      category_name !== "All Items"
    ) {
      //return items according to category and search term
      console.log("In three and category id is ", category_id);
      setToggle(true);
      axios
        .get(`${base_url}/itemwithcategory/${searchTerm}/${category_name}`)
        .then((res) => {
          setItems(res.data);
          setNumberOfItems(res.data.length);
        });
    } else {
      console.log(
        "In four: category id: ",
        category_id,
        " search term: ",
        searchTerm,
        "category name: ",
        category_name
      );
      setToggle(false);
      axios.get(`${base_url}/items`).then((res) => {
        setItems(res.data);
        setNumberOfItems(res.data.length);
      });
    }
    setSearchInput("");
  };

  const OnLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Row>
        <div className={styles.subTitle}>SFSU Software Engineering Project CSC 648-848, Spring 2022.  For Demonstration Only</div>
      </Row>
      <div className={styles.container}>
        <Row className="align-items-center">
          <Col lg={2}>
            <div className={styles.title}>Purple Market</div>
          </Col>

          <Col lg={6}>
            <Row className={styles.top}>
              <div>
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
                      style={{ width: "30rem" }}
                      type="text"
                      className="form-control rounded-0"
                      placeholder={"Search Here"}
                      onChange={searchHandleChange}
                      value={searchInput}
                    />
                  </div>

                  <span class="input-group-addon">
                    <Button variant="success rounded-0" onClick={onSubmit}>
                      Search
                    </Button>
                  </span>
                </div>
              </div>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <div>
                  <Button
                    className={styles.topButton}
                    variant="primary"
                    onClick={() => {
                      navigate("/createpost");
                    }}
                  >
                    Post Items
                  </Button>

                  <Button
                    className={styles.topButton}
                    variant="primary"
                    onClick={() => {
                      navigate("/myPage");
                    }}
                  >
                    My Page
                  </Button>

                  <Button
                    className={styles.topButton}
                    variant="primary"
                    onClick={OnLogin}
                  >
                    Login
                  </Button>
                  <Button
                    className={styles.topButton}
                    variant="primary"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div>
        <div style={{ marginBottom: "2rem" }}>
          <myContext.Provider value={items}>
            {props.children}
          </myContext.Provider>
        </div>
      </div>
    </div>
  );
};

export { Navbar, myContext };
