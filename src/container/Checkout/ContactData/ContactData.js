import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button.js";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner.js";
import Input from "../../../components/UI/Input/Input.js";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler.js";
import * as actions from "../../../store/actions/index.js";
import { updateObject, checkValidity } from "../../../shared/utility.js";

class ContactData extends Component {
  state = {
    orderForm: {
      name: this.formHandler("Your Name", true),
      street: this.formHandler("Street", true),
      zipCode: this.formHandler("ZIP Code", true),
      country: this.formHandler("Country", true),
      email: this.formHandler("Your Mail", true, "email"),
      deliveryMode: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  formHandler(
    placeholder,
    validation = false,
    type = "text",
    input = "input",
    value = "",
    valid = false,
    touched = false
  ) {
    const obj = {
      elementType: input,
      elementConfig: {
        type: type,
        placeholder: placeholder,
      },
      value: value,
      validation: {
        required: validation,
      },
      valid: valid,
      touched: touched,
    };
    return obj;
    // console.log(obj);
  }

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let formElIdentifier in this.state.orderForm) {
      formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
    }

    const order = {
      ingredients: this.props.ing,
      price: +this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputID) => {
    const updatedFormEl = updateObject(this.state.orderForm[inputID], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.orderForm[inputID].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputID]: updatedFormEl,
    });

    let formIsValid = true;
    for (let inputID in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputID].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElArray = [];
    for (let key in this.state.orderForm) {
      formElArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
      // console.log(key);
    }

    // console.log(this.state.orderForm);

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElArray.map((el) => {
          // console.log(el);
          return (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              invalid={!el.config.valid}
              shouldValidate={el.config.validation}
              changed={(event) => this.inputChangedHandler(event, el.id)}
              touched={el.config.touched}
              valueType={el.id}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
