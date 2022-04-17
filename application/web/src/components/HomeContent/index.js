import React from "react";
import { ViewItems } from "../ViewItems";
import { myContext } from "../Navbar";

const HomeContent = () => {
  return (
    <div>
      <div>{/* <Navbar /> */}</div>
      <myContext.Consumer>
        {(value) => <ViewItems items={value} />}
      </myContext.Consumer>
    </div>
  );
};

export default HomeContent;
