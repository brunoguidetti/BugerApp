import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../store/actions/index.js";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout(this.props.histor);
  }

  render() {
    return <Redirect to={"/"} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
