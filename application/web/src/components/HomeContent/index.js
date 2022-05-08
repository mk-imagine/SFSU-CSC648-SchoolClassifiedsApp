import React from "react";
import { ViewItems } from "../ViewItems";
import { myContext } from "../Navbar";
import styles from "./index.module.css";
import { Col, Row, Button, Dropdown } from "react-bootstrap";

const HomeContent = () => {
  return (
    <div style={{ marginTop: "2rem", width: "90%", margin: "auto" }}>
      <Row>
        <myContext.Consumer>
          {/* {(value) => console.log(value)} */}
          {(value) => (
            <ViewItems
              items={value.value}
              numberOfItems={value.value2}
              totolItems={value.value3}
              searchTerm={value.value4}
            />
          )}
        </myContext.Consumer>
      </Row>
    </div>
  );
};

export default HomeContent;
