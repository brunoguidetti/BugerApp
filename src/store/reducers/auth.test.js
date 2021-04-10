import reducer from "./auth.js";
import * as actionTypes from "../actions/actionTypes.js";

describe("auth reducer", () => {
  it("should return inicial State", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userID: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
  it("should store token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userID: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: "sometoken",
          userID: "someuser",
        }
      )
    ).toEqual({
      token: "sometoken",
      userID: "someuser",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
