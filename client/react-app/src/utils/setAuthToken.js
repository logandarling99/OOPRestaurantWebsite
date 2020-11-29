import axios from "axios";


//gives users logged in access
const setAuthToken = token => {
    //if user is logged in, give auth token when making requests
    if(token){
        axios.defaults.headers.common["Authorization"] = token;
    } 
    //else remove the auth token from requests
    else{
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;