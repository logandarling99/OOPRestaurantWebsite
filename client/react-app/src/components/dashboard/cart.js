import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCart, removeCartItem } from "../../actions/cartActions";

class cart extends Component {
    //initial state of cart item
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: ""
        };
        //this.removeItem = this.removeItem.bind(this);
    }

   /* removeItem = (name, price) => {
        const {user} = this.props.auth;
        const item = {
            id: user.id,
            name: name,
            price: price
            
        }
        this.props.removeCartItem(item);
    };*/

    //when cart is loaded, get the cart
    componentDidMount() {
        this.props.getCart(this.props.auth.user.id);
    }

    componentWillReceiveProps(newProps) {
        if (newProps) {
            this.setState({ errors: newProps.errors });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    //creating a map of list items for cart
    render() {
        var key = 0;
        var cartCost = 0;
        const cart = this.props.cart.cart;
        const items = cart.map(item => {
            console.log(item);
            cartCost += parseInt(item[0].price);
            return (
                <ul key={key++}>
                    <li style={{ fontSize: "25px" }} key={key++}>Name: {item[0].name}</li>
                    <li style={{ fontSize: "25px" }} key={key++}>Price: ${item[0].price}</li>
                    <li className="btn" key={key++}>Remove Item</li>
                    <br />
                </ul>
            )
        })

        return (
            <div className="col-sm-6 col-md-4">
                <div className="container">
                    <div className="row" id="ads">
                        {console.log(cart)}
                        <h2>Cart</h2>
                        <br />
                        {items}
                        <h5>Total cost: ${cartCost - (cartCost * 0.065)}</h5>
                    </div>
                </div>
            </div>
        )
    }


}

//props for getting cart, auth
cart.propTypes = {
    //removeCartItem: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart
});

export default connect(
    mapStateToProps,
    {getCart}
)(cart);