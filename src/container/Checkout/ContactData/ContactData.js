import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button.js";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner.js";
import Input from "../../../components/UI/Input/Input.js";
import { elementType } from "prop-types";

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
        value: "",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
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
    console.log(this.props.price);
    this.setState({ loading: true });

    const formData = {};
    for (let formElIdentifier in this.state.orderForm) {
      formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: +this.props.price,
      orderData: formData,
    };
    axios
      .post("/ordres.json", order)
      .then((res) => {
        console.log(res);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  checkValidity(value, rules) {
    // console.log(value, rules);
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    // if(rules.minLenght){
    //   isValid= value.length >= rules.minLenght
    // }

    return isValid;
  }

  inputChangedHandler = (event, inputID) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormEl = { ...updatedOrderForm[inputID] };
    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    updatedFormEl.touched = true;
    updatedOrderForm[inputID] = updatedFormEl;
    console.log(updatedFormEl);

    let formIsValid = true;
    for (let inputID in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputID].valid && formIsValid;
      console.log(updatedOrderForm[inputID], inputID);
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
    if (this.state.loading) {
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

export default ContactData;
