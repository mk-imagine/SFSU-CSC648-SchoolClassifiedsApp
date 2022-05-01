import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
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
  const columnsPerRow = 3;
  const numberOfItems = props.numberOfItems;
  const totolItems = props.totolItems;

  //const navigate = useNavigate();
  const base_url = "/api";
  // const base_url = "http://localhost:3100/api";
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

  return (
    <div style={{ marginTop: "2rem", width: "80%", margin: "auto" }}>
      {/* <div className={styles.heading}>Lastest items</div> */}
      {toggle ? (
        <div className={styles.heading}>
          {numberOfItems} of {totolItems} items found
        </div>
      ) : (
        <div className={styles.heading}>Lastest items</div>
      )}
      <Container>
        <Row xs={1} md={columnsPerRow}>
          {items.map((e) => {
            let image_url = `${base_url}/images/${e.item_pic}`;
            //console.log("image_url: ", image_url);
            return (
              <div>
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
