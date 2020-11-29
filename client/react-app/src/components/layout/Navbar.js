import React, {Component} from "react";
import {Link} from "react-router-dom";

class Navbar extends Component{
    render(){
        return(
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper black">
                        <Link
                            to="/"
                            style={{
                                fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo left white-text"
                            >
                                Logan's Bakery
                            </Link>


                                <div className="row right col s12 center-align">
                                    <div className="col s6">
                                        <Link
                                            to="/register"
                                            style={{
                                                width: "100px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px"
                                            }}
                                            className="btn waves-effect white-text">
                                            Register
                                        </Link>
                                    </div>

                                    <div className="col s6">
                                        <Link
                                        to="/login"
                                            style={{
                                                width: "100px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px"
                                            }}
                                            className="btn waves-effect white-text">
                                            Log In
                                        </Link>
                                    </div>
                                    
                                </div>

                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;