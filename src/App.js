import React, { Component } from "react";
import Layout from "./components/Layout/Layout.js";
import BurgerBuilder from "./container/BurgerBuilder/BurguerBuilder";
import Checkout from "./container/Checkout/Checkout.js";
import { Route, Switch } from "react-router-dom";
import Orders from "./container/Orders/Orders.js";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
