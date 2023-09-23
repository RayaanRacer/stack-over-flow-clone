import { combineReducers } from "redux";
import authReducer from "./authReducer";
import questionReducer from "./questionReducer.js"
import usersReducer from "./usersReducer";
import { currentUserReducer } from "./currentUserReducer";

export default combineReducers({
    authReducer, questionReducer,currentUserReducer, usersReducer
})