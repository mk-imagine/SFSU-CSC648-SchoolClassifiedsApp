import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./index.module.css";
const ItemCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
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
