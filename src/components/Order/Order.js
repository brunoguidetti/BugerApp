import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  console.log(props);
  const ingredientsOrdered = [];
  for (let ingredientName in props.ingredients) {
    ingredientsOrdered.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredientsOrdered.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {" "}
        {ig.name}: {ig.amount}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients : {ingredientOutput}</p>
      <p>
        Price: <strong>USD {+props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
