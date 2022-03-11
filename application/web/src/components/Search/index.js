import { React, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Categories from "../Categories";
import styles from "./index.module.css";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const onSubmit = () => {
    console.log("Search Button Clicked");
    console.log("Search Term: " + searchInput);
    setSearchInput("");
  };

  return (
    <div>
      <Row>
        <Col>
          <Categories />
        </Col>
        <Col>
          <Row>
            <Col>
              <div className="form-group">
                <input
                  style={{ width: "20rem" }}
                  type="text"
                  className="form-control"
                  placeholder={"Search Here"}
                  onChange={handleChange}
                  value={searchInput}
                />
              </div>
            </Col>
            <Col>
              <Button variant="primary" onClick={onSubmit}>
                Search
              </Button>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default Search;
