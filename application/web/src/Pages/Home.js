import React from "react";
import Categories from "../components/Categories";
import ItemCard from "../components/ItemCard";
import { HomeMain } from "../components/ViewItems";
import anonPic from "../images/anonPic.png";

const Home = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <Categories />
    </div>
  );
};

export default Home;
