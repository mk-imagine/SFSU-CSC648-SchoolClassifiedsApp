import React from "react";
import Categories from "../Categories";
import { HomeMain } from "../ViewItems";
import Search from "../Search/";

const Home = () => {
  return (
    <div style={{ padding: "1rem" }}>
      {/* <Search />
      <HomeMain /> */}
      <Categories />
    </div>
  );
};

export default Home;
