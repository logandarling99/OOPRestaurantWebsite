import { connect } from "react-redux";
import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class Register extends Component{
    //initializing state of user
    constructor(){
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
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
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

    render(){
        const errors = this.state.errors;

        return(
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link
                            to="/"
                            className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                        <div className="col s12" style={{paddingLeft: "11.250px"}}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey-text text-darken-1">Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {invalid: errors.name})}
                                />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {invalid: errors.email})}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {invalid: errors.password})}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.passwordConf}
                                    error={errors.passwordConf}
                                    id="passwordConf"
                                    type="password"
                                    className={classnames("", {invalid: errors.passwordConf})}
                                />
                                <label htmlFor="passwordConf">Confirm Password</label>
                                <span className="red-text">{errors.passwordConf}</span>
                            </div>
                            <div className="col s12" style={{paddingLeft: "11:250px"}}>
                                <button
                                    style={{
                                        width:"150px",
                                        borderRadius:"3px",
                                        letterSpacing:"1.5px",
                                        marginTop:"1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                        Sign up
                                    </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));