import React from "react";
import { HomeMain } from "../HomeMain";
import Search from "../Search/";

const Home = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <Search />
      <HomeMain />
    </div>
  );
};

export default Home;
