import React, { Component } from "react";
import Layout from "./components/Layout/Layout.js";
import BurgerBuilder from "./container/BurgerBuilder/BurguerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./container/Auth/Logout/Logout.js";
import { connect } from "react-redux";
import * as actions from "./store/actions/index.js";
import asyncComponent from "./hoc/asyncComponent/asyncComponent.js";

const asyncCheckout = asyncComponent(() => {
  return import("./container/Checkout/Checkout.js");
});
const asyncOrders = asyncComponent(() => {
  return import("./container/Orders/Orders.js");
});
const asyncAuth = asyncComponent(() => {
  return import("./container/Auth/Auth.js");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
