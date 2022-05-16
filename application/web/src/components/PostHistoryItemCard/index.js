import React from "react";
// import { Card, ListGroup } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const PostHistoryItemCard = (props) => {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <div
            style={{
              display: "flex",
              alignItem: "center",
              justifyContent: "center"
            }}
          >
            <CardMedia
              style={{
                display: "block",
                maxWidth: "400px",
                maxHeight: "400px",
                width: "auto",
                height: "auto"
              }}
              component="img"
              image={props.image}
              alt="image here"
            />
          </div>

          <CardContent>
            <Typography variant="h5">{props.itemName}</Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${props.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {props.categoryName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {props.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {props.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {props.approved}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default PostHistoryItemCard;
