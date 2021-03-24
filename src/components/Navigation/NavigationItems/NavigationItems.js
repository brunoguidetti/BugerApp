import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem.js";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link={"/"}>
      Burguer Builder
    </NavigationItem>
    <NavigationItem link={"/orders"}>Orders</NavigationItem>
  </ul>
);

export default navigationItems;
