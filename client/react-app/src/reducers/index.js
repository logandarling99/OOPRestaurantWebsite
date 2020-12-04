import {combineReducers} from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import cartReducer from "./cartReducers";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    cart: cartReducer
});