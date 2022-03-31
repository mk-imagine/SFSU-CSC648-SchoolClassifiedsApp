import React from "react";
import Categories from "../Categories";
import ItemCard from "../ItemCard";
import { HomeMain } from "../ViewItems";
import anonPic from "../../images/anonPic.png";

const Home = () => {
  return (
    <div style={{ padding: "1rem" }}>
      {/* <ItemCard
        title="Dictionary"
        price="$10"
        description="This is a book"
        image={anonPic}
      /> */}
      <Categories />
    </div>
  );
};

export default Home;
