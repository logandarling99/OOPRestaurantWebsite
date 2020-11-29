import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import{GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData)
    //when registered, redirected to login page
    axios.then(res => history.push("/login"))
    .catch(err => dispatch({type: GET_ERRORS, payload: err.repose.data}));
};

//Login User, gets user token
export const LoginUser = userData => dispatch => {
    axios.post("/api/users/login", userData)
    axios.then(res => {
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
    axios.catch(err =>
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

//Loading user
export const setUserLoading = () => {
    return{
        type: USER_LOADING
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