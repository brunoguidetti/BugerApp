import * as actionTypes from "./actionTypes.js";
import axios from "../../axios-orders.js";

export const purchaseBurgerSucess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCESS,
    orderData: orderData,
    orderId: id,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

export const purchseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchseBurgerStart());
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then((res) => {
        dispatch(purchaseBurgerSucess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFailed(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSucess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCESS,
    orders: orders,
  };
};
export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get(`/orders.json`, {
        params: {
          auth: token,
          orderBy: '"userId"',
          equalTo: `"${userId}"`,
        },
      }) //It's wrong in the server
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSucess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
