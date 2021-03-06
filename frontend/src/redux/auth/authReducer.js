import * as actions from "./authActionTypes";

const initialState = {
  loading: false,
  jwt: "",
  auth: {},
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        auth: action.payload.auth,
        jwt: action.payload.jwt,
        error: "",
      };
    case actions.USER_LOGIN_FAILURE:
      return {
        loading: false,
        jwt: "",
        auth: {},
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
