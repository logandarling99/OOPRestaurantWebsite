import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import{GET_ERRORS, SET_CURRENT_USER} from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("users/register", userData)
    //when registered, redirected to login page
        .then(res => history.push("/login"))
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

//Login User, gets user token
export const loginUser = userData => dispatch => {
    axios
        .post("/users/login", userData)
        .then(res => {
        //saving token
        const {token} = res.data;
        localStorage.setItem("jwtToken", token);
        //setting token to authorized
        setAuthToken(token);
        //Getting user data from token
        const decoded = jwt_decode(token);
        //setting user
        dispatch(setCurrentUser(decoded));
    })
        .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

//setting logged in user
export const setCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


//Logging user out
export const logoutUser = () => dispatch => {
    //Deleting token
    localStorage.removeItem("jwtToken");
    //Deleting token for authorization
    setAuthToken(false);
    //setting to empty user
    dispatch(setCurrentUser({}));
};