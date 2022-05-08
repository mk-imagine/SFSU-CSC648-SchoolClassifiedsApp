import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const PostHistoryItemCard = (props) => {
  return (
    <Card style={{ width: "18rem", heigh: "1rem", margin: "auto" }}>
      <Card.Img height="400" variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.itemName}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>Price: ${props.price}</ListGroup.Item>
        <ListGroup.Item>Category: {props.categoryName}</ListGroup.Item>
        <ListGroup.Item>Date: {props.date}</ListGroup.Item>
        <ListGroup.Item>Status: {props.approved}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default PostHistoryItemCard;
