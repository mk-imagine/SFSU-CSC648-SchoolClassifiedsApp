import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./index.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ItemCard = (props) => {
  const navigate = useNavigate();

  const goToMessagePage = () => {
    console.log("message button clicked");
    console.log(props.item_details);
    navigate("/message", {
      state: { item_details: props.item_details, image: props.image }
    });
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={props.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {props.price}
            <br></br>
            Description: {props.description}
          </Typography>
          <Button onClick={goToMessagePage}>Message</Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const ItemTopCategoryCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <div className={styles.title}>{props.title}</div>
      </CardContent>
      <CardMedia
        component="img"
        alt="images"
        height="160"
        image={props.image}
      />
    </Card>
  );
};

export default ItemCard;
