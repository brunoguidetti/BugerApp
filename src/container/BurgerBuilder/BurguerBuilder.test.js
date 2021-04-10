import { BurgerBuilder } from "./BurguerBuilder.js";
import BuildControls from "../../components/Burger/BuildControls/BuildControls.js";

import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it("Should render <BuildControls/> when receiving Ingredients", () => {
    wrapper.setProps({ ing: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
