import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  //initializing state for holding login credentials
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  //when register is loaded, check if you have token, if so go to menu
  componentDidMount() {
    //if you are logged in, you will go to menu
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  //checks errors in next set of propery updates
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  //when data changes, set the state id to value
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  //when login info submitted, add info to variable and send it to action handler
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col offset-s2">
            <h2>Login</h2>
          </div>
        </div>
        {/*form with input fields that changes state values and routes them on the bottom button submit*/}
        <form noValidate onSubmit={this.onSubmit}>
          <label style={{ fontSize: "20px" }}>
            <div className="input-field">
              Email:
              <input
                id="email"
                type="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}

                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span></div>
          </label>


          <label style={{ fontSize: "20px" }}>
            <div className="input-field">
              Password:
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })}
              />
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>


          </label>

          <button type="submit">Login</button>
        </form>
      </div>
    );

  }
}

//properties of register including register user function, auth token, and errors
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//store auth and error changes used to connect from route
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);