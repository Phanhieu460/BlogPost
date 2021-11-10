import * as types from "../types/authType";

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
});
export const resetUser = () => ({
  type: types.RESET_USER,
});
export const loginUser = (data) => {
  return (dispatch) => {
    dispatch(setUser(data));
  };
};
