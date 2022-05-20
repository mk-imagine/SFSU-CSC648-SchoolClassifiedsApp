//HEADER:CODE FOR THE THE NAVBAR(SEARCHBAR AND BUTTONS)
import React, { useState, useEffect } from "react";
import { Dropdown, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const myContext = React.createContext([]);

/**
 * Load Navbar component
 * @param {*} props
 * @returns HTML of Navbar
 */
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
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [caseName, setCase] = useState("1");
  const [allItemsArray, setAllItemsArray] = useState([]);
  const [actualItemData, setActualItemData] = useState([]);
  //const [userInformation, setUserInformation] = useState();

  //const { Provider, Consumer } = React.createContext({ items: [] });

  const navigate = useNavigate();
  // const base_url = "/api";
  const base_url = "http://localhost:3100/api";

  const userInformation = localStorage.getItem("user_login_information");
  // let userJSON = JSON.parse(userInformation);
  // console.log("JSON: ", userJSON);

  useEffect(() => {
    fetchCategories();
    getAllItems();
    if (userInformation) {
      if (userInformation != "loggedOut") {
        //user is logged in
        console.log("i am logged in");
        setUserLoggedIn(true);
      }
    } else {
      //user is logged out
      console.log("i am logged out");
      setUserLoggedIn(false);
    }
  }, [userInformation]);

  const getAllItems = () => {
    axios.get(`${base_url}/items/date/desc`).then((res) => {
      setItems(res.data);
      setNumberOfTotalItems(res.data.length);
      setAllItemsArray(res.data);
      setActualItemData(res.data);
      setCase("5");
    });
  };

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    console.log("On submit");
    navigate("/");

    const searchTerm = searchInput;
    const category_id = selectedCategoryId;
    const category_name = selectedCategory;

    if (checkInputLength()) {
      alert("Search length can't be more 40 characters!");
    } else {
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
        setCase("2");
        axios
          .get(`${base_url}/searchitems/${searchTerm}/date/desc`)
          .then((res) => {
            if (res.data.length === 0) {
              setItems(allItemsArray);
            } else {
              setItems(res.data);
            }

            setNumberOfItems(res.data.length);
            setActualItemData(res.data);
          });
      } else if (
        category_id !== 0 &&
        searchTerm === "" &&
        category_name !== "All Items"
      ) {
        // we return items according to categorys
        console.log("In two");
        setToggle(true);
        setCase("3");
        axios
          .get(`${base_url}/searchcategory/${category_name}/date/desc`)
          .then((res) => {
            if (res.data.length === 0) {
              setItems(allItemsArray);
            } else {
              setItems(res.data);
            }
            setNumberOfItems(res.data.length);
            setActualItemData(res.data);
          });
      } else if (
        category_id !== 0 &&
        searchTerm !== "" &&
        category_name !== "All Items"
      ) {
        //return items according to category and search term
        setToggle(true);
        setCase("4");
        axios
          .get(
            `${base_url}/itemwithcategory/${searchTerm}/${category_name}/date/desc`
          )
          .then((res) => {
            if (res.data.length === 0) {
              setItems(allItemsArray);
            } else {
              setItems(res.data);
            }
            setNumberOfItems(res.data.length);
            setActualItemData(res.data);
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
        setCase("5");
        axios.get(`${base_url}/items/date/desc`).then((res) => {
          if (res.data.length === 0) {
            setItems(allItemsArray);
          } else {
            setItems(res.data);
            setNumberOfItems(res.data.length);
          }
          setNumberOfItems(res.data.length);
          setActualItemData(res.data);
        });
      }
    }
  };

  const checkInputLength = () => {
    if (searchInput.length >= 40) {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    var config = {
      method: "post",
      url: `${base_url}/login/logout`,
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios(config)
      .then((response) => {
        console.log("Logout Response", response.data);

        localStorage.setItem("user_login_information", "loggedOut");
        // setUserInformation("loggedOut");
        setUserLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error in logout: " + error);
      });
  };

  const buttonsOnLogin = () => {
    return (
      <div className={styles.centerButtons}>
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
          onClick={() => {
            navigate("/about");
          }}
        >
          About Us
        </Button>

        <Button className={styles.topButton} variant="primary" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  };

  const buttonsOnLogout = () => {
    return (
      <div className={styles.centerButtons}>
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
            navigate("/about");
          }}
        >
          About
        </Button>

        <Button
          className={styles.topButton}
          variant="primary"
          onClick={() => {
            navigate("/login");
          }}
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
    );
  };

  return (
    <div>
      <Row>
        <div className={styles.subTitle} style={{ fontSize: "1rem" }}>
          SFSU Software Engineering Project CSC 648-848, Spring 2022. For
          Demonstration Only.
          <br />
          <span style={{ fontSize: "1.5rem" }}>
            A Market place that connects to people only associated with SFSU to
            sell or purchase items
          </span>{" "}
        </div>
      </Row>
      <Row>
        <div className={styles.subTitle}></div>
      </Row>
      <div className={styles.container}>
        <div className={styles.centerMobileNav}>
          <Row className="align-items-center">
            <Col lg={2} md={12} sm={12} className={styles.navTitle}>
              <div
                className={styles.title}
                onClick={() => {
                  getAllItems();
                  navigate("/");
                }}
              >
                Purple Market
              </div>
            </Col>

            <Col lg={6} md={12} sm={12} className={styles.searchBar}>
              <div className={styles.centerNav}>
                <Row className={styles.top}>
                  <div>
                    <div class="input-group">
                      <span class="input-group-addon">
                        <Dropdown
                          onSelect={dropDownChange}
                          value={selectedCategory}
                          id={styles.dropdownMenu}
                        >
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
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
                          type="text"
                          className="form-control rounded-0 navWidth"
                          placeholder={"Search Here"}
                          onChange={searchHandleChange}
                          value={searchInput}
                          onKeyDown={handleKeyDown}
                        />
                      </div>

                      <span class="input-group-addon">
                        <div className={styles.searchContainer}>
                          <Button
                            variant="success rounded-0"
                            onClick={onSubmit}
                            className={styles.searchBtnStyle}
                          >
                            Search
                          </Button>
                        </div>
                      </span>
                    </div>
                  </div>
                </Row>
              </div>
            </Col>
            <Col md={12} sm={12} lg={4} className={styles.navbarButton}>
              <Row>
                <Col>
                  {/* Things to do here wait */}

                  {userLoggedIn ? buttonsOnLogin() : buttonsOnLogout()}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>

      <div>
        <div style={{ marginBottom: "2rem" }}>
          <myContext.Provider
            value={{
              value: items,
              value2: numberOfItems,
              value3: numberOfTotalItems,
              value4: searchInput,
              value5: selectedCategory,
              value6: caseName,
              value7: actualItemData
            }}
          >
            {props.children}
          </myContext.Provider>
        </div>
      </div>
    </div>
  );
};

export { Navbar, myContext };
