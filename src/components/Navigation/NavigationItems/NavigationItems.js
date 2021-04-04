import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem.js";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link={"/"}>
      Burguer Builder
    </NavigationItem>
    {props.isAuth ? (
      <NavigationItem link={"/orders"}>Orders</NavigationItem>
    ) : null}
    {props.isAuth ? (
      <NavigationItem link={"/logout"}>Logout</NavigationItem>
    ) : (
      <NavigationItem link={"/auth"}>Authentication</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
