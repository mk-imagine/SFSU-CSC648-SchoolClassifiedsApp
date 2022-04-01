import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import ItemCard from "../ItemCard";

//the page where we load the data
export const ViewItems = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(props.items);
    console.log("in view items use effect", items);
  });

  return (
    <div style={{ paddingTop: "2rem" }}>
      {items.map((e) => {
        return (
          <div>
            <Row>
              <Col style={{ paddingTop: "3rem" }}>
                <Row>
                  <h3>{e.item_name}</h3>
                </Row>
                <Row>
                  <p>{e.item_desc}</p>
                </Row>
                <Row>
                  <p style={{ fontWeight: "bold" }}>{e.item_price}</p>
                </Row>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
};
