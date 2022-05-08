import React, { useState, useEffect } from "react";
import { Row, Container, Col, Dropdown } from "react-bootstrap";
import ItemCard from "../ItemCard";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

/**
 * Loads all items in a grid
 * @param {*} props
 * @returns HTML that loads all item data
 */
export const ViewItems = (props) => {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [dropdownName, setDropdownName] = useState("Sort By:");

  const columnsPerRow = 3;
  const numberOfItems = props.numberOfItems;
  const totolItems = props.totolItems;

  //const navigate = useNavigate();
  // const base_url = "/api"; // FOR DEPLOYMENT
  const base_url = "http://localhost:3100/api";
  // eslint-disable-next-line
  useEffect(() => {
    setItems(props.items);
    toggleFunction();
  });

  const toggleFunction = () => {
    if (
      parseInt(numberOfItems) > 0 &&
      parseInt(numberOfItems) < parseInt(totolItems)
    ) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const getLatestItems = () => {
    //get latest items
    setDropdownName("Latest Items");
  };

  const getPriceHighToLow = () => {
    //get price high to low
    setDropdownName("Price: High to Low");
  };

  const getPriceLowToHigh = () => {
    //get low to high
    setDropdownName("Price: High to Low");
  };

  return (
    <div>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col>
            {toggle ? (
              <div>
                {numberOfItems} of {totolItems} items found
              </div>
            ) : (
              <div className={styles.heading}>Lastest items</div>
            )}
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>

          <Col>
            <Dropdown value="Status" className={styles.statusDropdown}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {dropdownName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="" onClick={getLatestItems}>
                  Latest Items
                </Dropdown.Item>
                <Dropdown.Item eventKey="" onClick={getPriceHighToLow}>
                  Price: High to Low
                </Dropdown.Item>
                <Dropdown.Item eventKey="" onClick={getPriceLowToHigh}>
                  Price: High to Low
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row xs={1} md={columnsPerRow}>
          {items.map((e) => {
            let image_url = `${base_url}/images/${e.item_pic}`;
            //console.log("image_url: ", image_url);
            return (
              <div className={styles.itemCard}>
                <div style={{ marginTop: "2rem" }}></div>
                <ItemCard
                  style={{ marginBottom: "4rem" }}
                  title={e.item_name}
                  description={e.item_desc}
                  price={e.item_price}
                  image={image_url}
                  item_details={e}
                ></ItemCard>
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};
