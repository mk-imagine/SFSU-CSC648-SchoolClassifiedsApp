import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ItemCard from "../ItemCard";
import anonPic from "../../images/anonPic.png";
import axios from "axios";

//the page where we load the data
export const ViewItems = (props) => {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const columnsPerRow = 3;

  const base_url = "/api";
  //const base_url = "http://localhost:3100";
  useEffect(() => {
    setItems(props.items);
  });

  return (
    <div style={{ marginTop: "2rem", width: "100%", margin: "auto" }}>
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
                  image={anonPic}
                ></ItemCard>
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};
