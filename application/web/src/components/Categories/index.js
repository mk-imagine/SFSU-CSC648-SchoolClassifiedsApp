import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
// import styles from "./index.module.css"

const Categories = () => {
  // The API url for fetching all catergories from API
  const [catergories, setCategories] = useState([
    "All",
    "Book",
    "Tech",
    "Books"
  ]);
  const [currentCategory, setCurrentCategory] = useState("All");

  // const url = "https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products/3";
  // button - store current-search category

  // fetching the json object from the API
  // useEffect(() => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => setCategory(array)); // setCategory(data.categories)
  // }, [url]);

  // useEffect(() => {

  // });

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Choose Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {catergories.map((e) => {
            return <Dropdown.Item href="#/action-2">{e}</Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Categories;
