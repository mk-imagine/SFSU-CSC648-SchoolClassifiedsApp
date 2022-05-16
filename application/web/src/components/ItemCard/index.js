import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./index.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Load Item Card Component
 * @param {*} props
 * @returns HTML of Item Card Component
 */
const ItemCard = (props) => {
  const navigate = useNavigate();

  const goToMessagePage = () => {
    console.log("message button clicked");
    console.log(props.item_details);
    navigate("/message", {
      state: { item_details: props.item_details, image: props.hr_image }
    });
  };

  const goToItemDetailPage = () => {
    navigate("/item", {
      state: { item_details: props.item_details, image: props.hr_image }
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={goToItemDetailPage}>
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
          <Typography gutterBottom variant="h6" noWrap="true" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {props.price}
            <br></br>
            <p className={styles.itemDescription}>
              Description: {props.description}
            </p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={styles.buttonWrap}>
        <Button className={styles.messageButton} onClick={goToMessagePage}>
          Message Seller
        </Button>
      </div>
    </Card>
  );
};

/**
 * Load Category Card Component
 * @param {*} props
 * @returns HTML of Category Card Component
 */
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
