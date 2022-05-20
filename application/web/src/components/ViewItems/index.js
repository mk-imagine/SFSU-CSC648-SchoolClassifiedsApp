import React, { useState, useEffect } from "react";
import { Row, Container, Col, Dropdown } from "react-bootstrap";
import ItemCard from "../ItemCard";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import axios from "axios";

/**
 * Loads all items in a grid
 * @param {*} props
 * @returns HTML that loads all item data
 */
export const ViewItems = (props) => {
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [numberOfItems, setTotalNumberOfItems] = useState("");
  const [dropdownName, setDropdownName] = useState("Time: Newest to Oldest");
  const [heading, setHeading] = useState("All Items");

  const columnsPerRow = 3;

  const totolItems = props.totolItems;
  const searchTerm = props.searchTerm;
  const category_name = props.category;
  const caseId = props.caseId;
  const actualItemData = props.actualItemData;

  //const navigate = useNavigate();
  // const base_url = "/api";
  const base_url = "http://localhost:3100/api";
  // eslint-disable-next-line
  useEffect(() => {
    setItems(props.items);

    setTotalNumberOfItems(props.numberOfItems);
    toggleFunction();
  }, [props.items, props.numberOfItems, props.actualItemData]);

  const toggleFunction = () => {
    console.log("number of items", numberOfItems);

    // if (numberOfItems === "-1") {
    //   setToggle(false);
    //   setHeading(`No items found. Have a look at our other items`);
    // } else if (items.length > 0 && items.length < parseInt(totolItems)) {
    //   console.log("Here");
    //   setToggle(true);
    //   setHeading(`${numberOfItems} items found`);
    // } else {
    //   setToggle(false);
    //   setHeading(`All Items`);
    // }

    console.log("actual data length", actualItemData.length);
    setHeading("All Items");
    if (actualItemData.length === 0) {
      console.log("inside if");
      setHeading(`No items found. Have a look at our other items`);
    } else if (items.length > 0 && items.length < parseInt(totolItems)) {
      console.log("Here");
      setHeading(`${numberOfItems} items found`);
    }

    console.log("actual item data", actualItemData);
  };

  const getLatestItems = () => {
    //get latest items
    setDropdownName("Time: Newest to Oldest");

    if (caseId === "1" || caseId === "5") {
      axios
        .get(`${base_url}/items/date/desc`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    } else if (caseId === "2") {
      axios
        .get(`${base_url}/searchitems/${searchTerm}/date/desc`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    } else if (caseId === "3") {
      axios
        .get(`${base_url}/searchcategory/${category_name}/date/desc`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    } else if (caseId === "4") {
      axios
        .get(
          `${base_url}/itemwithcategory/${searchTerm}/${category_name}/date/desc`
        )
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    }
  };

  const getPriceHighToLow = () => {
    //get price high to low
    setDropdownName("Price: High to Low");

    if (caseId === "1" || caseId === "5") {
      axios
        .get(`${base_url}/items/price/desc`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    } else if (caseId === "2") {
      axios
        .get(`${base_url}/searchitems/${searchTerm}/price/desc`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    } else if (caseId === "3") {
      axios
        .get(`${base_url}/searchcategory/${category_name}/price/desc`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    } else if (caseId === "4") {
      axios
        .get(
          `${base_url}/itemwithcategory/${searchTerm}/${category_name}/price/desc`
        )
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    }
  };

  const getPriceLowToHigh = () => {
    //get low to high
    setDropdownName("Price: Low to High");
    if (caseId === "1" || caseId === "5") {
      axios
        .get(`${base_url}/items/price/asc`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    } else if (caseId === "2") {
      axios
        .get(`${base_url}/searchitems/${searchTerm}/price/asc`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    } else if (caseId === "3") {
      axios
        .get(`${base_url}/searchcategory/${category_name}/price/asc`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    } else if (caseId === "4") {
      axios
        .get(
          `${base_url}/itemwithcategory/${searchTerm}/${category_name}/price/asc`
        )
        .then((res) => {
          setItems(res.data);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    }
  };

  // {toggle ? (
  //   <div className={styles.searchResult}>
  //     {/* {numberOfItems} items found */}
  //     {heading}
  //   </div>
  // ) : (
  //   <div className={styles.heading}>{heading}</div>
  // )}

  return (
    <div>
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col className={styles.headingCol}>
            <div className={styles.searchResult}>{heading}</div>
          </Col>
          <Col></Col>
          <Col></Col>

          <Col>
            <Dropdown value="Status" className={styles.statusDropdown}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {dropdownName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="" onClick={getLatestItems}>
                  Time: Newest to Oldest
                </Dropdown.Item>
                <Dropdown.Item eventKey="" onClick={getPriceHighToLow}>
                  Price: High to Low
                </Dropdown.Item>
                <Dropdown.Item eventKey="" onClick={getPriceLowToHigh}>
                  Price: Low to High
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row xs={1} md={columnsPerRow}>
          {items.map((e) => {
            let image_url = `${base_url}/images/${e.item_thumbnail}`;
            const hr_img_url = `${base_url}/images/${e.item_pic}`;
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
                  hr_image={hr_img_url}
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
