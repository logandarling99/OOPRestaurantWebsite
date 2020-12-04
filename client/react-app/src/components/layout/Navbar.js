import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component{

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render(){
        const { isAuthenticated, user } = this.props.auth;
        function admin() {
            if(user.name === "admin"){
                return true;
            }
            else{
                return false;
            }
        }

        const adminLinks = (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/inventory">
                    Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                    Orders
                </Link>
              </li>
            </ul>
        );

        const cart = (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                    Menu
                </Link>
            </li>
          </ul>
            
        );

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                {admin() ? adminLinks : cart}
              <li className="nav-item">
                <a href="/" onClick={this.onLogoutClick} className="nav-link">
                  <img
                    className="rounded-circle"
                    src={user.avatar}
                    alt=""
                    style={{}}
                  />
                  Logout
                </a>
              </li>
            </ul>
          );
      
          const guestLinks = (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          );
      
          return (
            <nav className="navbar navbar-expand-sm navbar-dark blue bg-dark mb-4">
              <div className="container">      
                <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        {" "}
                        Home
                      </Link>
                    </li>
                  </ul>
                  {isAuthenticated ? authLinks : guestLinks}
                </div>
              </div>
            </nav>
          );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar);