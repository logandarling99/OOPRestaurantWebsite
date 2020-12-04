import { connect } from "react-redux";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class Register extends Component {
    //initializing state of user
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            passwordConf: "",
            errors: {}
        };
    }

    //when register is loaded, check if you have token, if so go to menu
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    //checks errors in next set of propery updates
    componentWillReceiveProps(nextProps) {
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

    //when button submmited, create new user and send it to action handler
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConf: this.state.passwordConf
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const errors = this.state.errors;

        return (
            <div className="container">
                <div className="row">
                    <div className="col offset-s2">
                        <h2>Register</h2>
                    </div>
                </div>
                {/*form with input fields that changes state values and routes them on the bottom button submit*/}
                <form noValidate onSubmit={this.onSubmit}>

                    <label style={{ fontSize: "20px" }}>
                        <div className="input-field">
                            Name:
                            <input
                                id="name"
                                type="text"
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}

                                className={classnames("", {
                                    invalid: errors.name
                                })}
                            />
                            <span className="red-text">
                                {errors.name}
                            </span></div>
                    </label>


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
                                    invalid: errors.email
                                })}
                            />
                            <span className="red-text">
                                {errors.email}
                            </span></div>
                    </label>


                    <label style={{ fontSize: "20px" }}>
                        <div className="input-field">
                            Password:
                            <input
                                id="password"
                                type="password"
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                className={classnames("", {
                                    invalid: errors.password
                                })}
                            />
                            <span className="red-text">
                                {errors.password}
                            </span>
                        </div>
                    </label>

                    <label style={{ fontSize: "20px" }}>
                        <div className="input-field">
                            Password Confirmation:
                            <input
                                id="passwordConf"
                                type="password"
                                onChange={this.onChange}
                                value={this.state.passwordConf}
                                error={errors.passwordConf}
                                className={classnames("", {
                                    invalid: errors.passwordConf
                                })}
                            />
                            <span className="red-text">
                                {errors.passwordConf}
                            </span>
                        </div>
                    </label>

                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

//properties of register including register user function, auth token, and errors
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

//store auth and error changes used to connect from route
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));