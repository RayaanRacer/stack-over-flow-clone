import * as api from "../api";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, updateData) => async (dispatch) => {
  console.log(updateData)
  try {
    const { data } = await api.updateUser(id, updateData);
    dispatch({ type: "UPDATE_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};
