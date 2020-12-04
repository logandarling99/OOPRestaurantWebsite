import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { addCartItem } from "../../actions/cartActions";
import bread from "./bread-399286_640.jpg";
import water from "./waterfreepooscrop.jpeg";
import danish from "./danishPOOS.jpg"


class Dashboard extends Component {
  //intitial state for cart items
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      errors: {}
    };
    //binding functions to state
    this.cartBread = this.cartBread.bind(this);
    this.cartWater = this.cartWater.bind(this);
    this.cartDanish = this.cartDanish.bind(this);
  }
  //logging out function
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  //checking errors
  componentWillReceiveProps(newProps) {
    if (newProps) {
      this.setState({ errors: newProps.errors });
    }
  }
  //when values changes check the values
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //bread into cart
  cartBread() {
    const { user } = this.props.auth;

    const newItem = {
      name: "Bread",
      price: 5,
      id: user.id
    };

    this.props.addCartItem(newItem);

  };

  //water into cart
  cartWater() {
    const { user } = this.props.auth;
    const newItem = {
      name: "Water",
      price: 1,
      id: user.id
    };

    this.props.addCartItem(newItem);

  };

  //danish into cart
  cartDanish() {
    const { user } = this.props.auth;

    const newItem = {
      name: "Danish",
      price: 3,
      id: user.id
    };

    this.props.addCartItem(newItem);

  };

  render() {
    function may() {
      return true;
    }
    //determining if bread/water/danish button
    const addBreadCart = (
      <span onClick={this.cartBread} className="btn"> Add to Cart</span>
    );

    const addWaterCart = (
      <span onClick={this.cartWater} className="btn"> Add to Cart</span>
    );

    const addDanishCart = (
      <span onClick={this.cartDanish} className="btn"> Add to Cart</span>
    );

    return (
      <div className="section">
        <div className="row">
          <h5>BREAD</h5>
          <div className="col m3">
            <div className="card">
              <div className="card-title center-align text-darken-4" style={{ fontSize: "40px" }}>Sourdough Bread</div>
              <div className="card-image">
                <img src={bread} style={{ width: "380px", margin: "auto", display: "block" }} />
              </div>
              <div className="card-content center-align">
                <p style={{ fontSize: "25px" }}>The best sourdough bread in town!</p>
                <p style={{ fontSize: "30px" }}>$5</p>
              </div>
              <div className="card-action center-align">
                {may() ? addBreadCart : console.log("BAD")}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h5>DRINKS</h5>
          <div className="col m3">
            <div className="card">
              <div className="card-title center-align text-darken-4" style={{ fontSize: "40px" }}>Water</div>
              <div className="card-image">
                <img src={water} style={{ width: "380px", margin: "auto", display: "block" }} />
              </div>
              <div className="card-content center-align">
                <p style={{ fontSize: "25px" }}>Delicious refreshing water straight from the tap!</p>
                <p style={{ fontSize: "30px" }}>$1</p>
              </div>
              <div className="card-action center-align">
                {may() ? addWaterCart : console.log("BAD")}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h5>DESSERT</h5>
          <div className="col m3">
            <div className="card">
              <div className="card-title center-align text-darken-4" style={{ fontSize: "40px" }}>Cream Cheese Danish</div>
              <div className="card-image">
                <img src={danish} style={{ height: "300px", width: "380px", margin: "auto", display: "block" }} />
              </div>
              <div className="card-content center-align">
                <p style={{ fontSize: "25px" }}>Fluffy and made fresh every order!</p>
                <p style={{ fontSize: "30px" }}>$3</p>
              </div>
              <div className="card-action center-align">
                {may() ? addDanishCart : console.log("BAD")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//creating props for add items, logout user, auth
Dashboard.propTypes = {
  addCartItem: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, addCartItem }
)(Dashboard);