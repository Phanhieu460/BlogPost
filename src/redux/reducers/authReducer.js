import * as type from "../types/authType";

const initialState = {
  user: null,
  isLogin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_USER:
      state = {
        user: action.payload.user,
        isLogin: true,
      };
      return state;
    case type.RESET_USER:
      return state;
    default:
      return state;
  }
};
export default authReducer;
