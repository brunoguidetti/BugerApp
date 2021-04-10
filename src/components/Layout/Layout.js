import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliar/Auxiliar.js";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar.js";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer.js";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toolbarToggleHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuth}
          clicked={this.toolbarToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
