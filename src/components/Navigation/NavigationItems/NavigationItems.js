import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem.js";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={"/"} active>
      Burguer Builder
    </NavigationItem>
    <NavigationItem link={"/"}>Checkout</NavigationItem>
  </ul>
);

export default navigationItems;