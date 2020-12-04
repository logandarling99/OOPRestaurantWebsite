import axios from "axios";
import{GET_ERRORS} from "./types";

//removes items from cart WIP
export const removeCartItem = (data) => dispatch =>{
    axios
        .post("http://localhost:5000/users/removecart", JSON.stringify(data))
        .then(res => console.log(res))
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

//adds item to cart
export const addCartItem = (data) => dispatch => {
    console.log(data);
    axios
        .post("http://localhost:5000/users/cart", JSON.stringify(data))
        .then(res => console.log(res))
        .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

//gets all items from cart
export const getCart = data => dispatch => {
    console.log(data);
    
    axios
      .get(`http://localhost:5000/users/getCart/${data}`)
      .then(res =>
        dispatch({
          type: "GET_CART",
          payload: res.data
        })
      )
      .catch(err => {
          console.log("ERROR NULL CART");
          dispatch({
          type: "GET_CART",
          payload: null
        })
      }
        
      );
  };