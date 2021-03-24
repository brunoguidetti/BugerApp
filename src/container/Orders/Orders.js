import React, { Component } from "react";
import Order from "../../components/Order/Order.js";
import axios from "../../axios-orders.js";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.js";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/ordres.json") //It's wrong in the server
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          console.log(res.data[key]);
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
