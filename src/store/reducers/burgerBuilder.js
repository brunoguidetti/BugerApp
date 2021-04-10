import * as actionsTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility.js";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientsName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientsName],
    building: true,
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: true,
    building: false,
  });
};

const fetchingIngredients = (state, action) => {
  return updateObject(state, {
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionsTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionsTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionsTypes.FETCHING_INGREDIENTS_FAILED:
      return fetchingIngredients(state, action);
    default:
      return state;
  }
};

export default reducer;
