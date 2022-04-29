import React from "react";
import { ViewItems } from "../ViewItems";
import { myContext } from "../Navbar";
import styles from "./index.module.css";

const HomeContent = () => {
  return (
    <div>
      <div>{/* <Navbar /> */}</div>
      {/* <div className={styles.greeting}>Welcome to PurpleMarket </div> */}
      <div className={styles.introduction}>
        A Market place that connects to people only associated with SFSU to sell
        or purchase items
      </div>
      <myContext.Consumer>
        {/* {(value) => console.log(value)} */}
        {(value) => <ViewItems items={value.value} numberOfItems ={value.value2} totolItems={value.value3}/>}
      </myContext.Consumer>
    </div>
  );
};

export default HomeContent;
