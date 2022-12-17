import React, {Component} from 'react';
import { connect, useSelector } from 'react-redux';
import * as actions from '../actions';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    renderSignButton(){
        if (this.props.authenticated){
            return (
                <li className="nav-item pr-sm-5 pl-sm-5 mr-sm-5 ml-sm-5 p-md-1">
                    <NavLink className="nav-link" to="/signout" style={{ color:'black' }}><strong>Sign out</strong></NavLink>
                </li>
            )
        }else{
            return (
                [
                    // <li className="nav-item" key="1">
                    //     <NavLink to="/signin" className="nav-link">Sign in</NavLink>
                    // </li>,
                    // <li className="nav-item" key="2">
                    //     <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                    // </li>
                ]
            )
        }
    }
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor:"#928D72" }}>
            <img src="statics/pinterest_profile_image.png" width="50" height="50" class="d-inline-block align-top mr-2" alt="" />
            <NavLink className="navbar-brand" to="/"><strong>Event Brisk</strong></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item pr-sm-5 pl-sm-5 mr-sm-5 ml-sm-5 p-md-1">
                            <NavLink className="nav-link" to="/" style={{ color:'black' }}><strong>Home</strong></NavLink>
                        </li>

                        <li className="nav-item pr-sm-5 pl-sm-5 mr-sm-5 ml-sm-5 p-md-1">
                            <NavLink className="nav-link" to="/contact" style={{ color:'black' }}><strong>Contact Us</strong></NavLink>
                        </li>
                        {
                            !this.props.authenticated &&
                            <li className="nav-item pr-sm-5 pl-sm-5 mr-sm-5 ml-sm-5 p-md-1">
                                <NavLink className="nav-link" to="/register" style={{ color:'black' }}><strong>Register</strong></NavLink>
                            </li>
                        }
                        {
                            this.props.auth_type == 'admin' &&
                            <li className="nav-item pr-sm-5 pl-sm-5 mr-sm-5 ml-sm-5 p-md-1">
                                <NavLink className="nav-link" to="/venue/" style={{ color:'black' }}><strong>Venues</strong></NavLink>
                            </li>
                        }
                        {
                            this.props.auth_type == 'serviceprovider' &&
                            <li className="nav-item pr-sm-5 pl-sm-5 mr-sm-5 ml-sm-5 p-md-1">
                                <NavLink className="nav-link" to="/service/" style={{ color:'black' }}><strong>Services</strong></NavLink>
                            </li>
                        }
                                                {
                            this.props.auth_type == 'user' &&
                            <li className="nav-item pr-sm-5 pl-sm-5 mr-sm-5 ml-sm-5 p-md-1">
                                <NavLink className="nav-link" to="/event" style={{ color:'black' }}><strong>Booking History</strong></NavLink>
                            </li>
                        }
                        {this.renderSignButton()}
                </ul>
                {/* <ul className="navbar-nav">
                    {this.renderSignButton()}
                </ul> */}
            </div>
            </nav>
        )
    }
}

function mapStateToProps({auth}){
    return {
        authenticated: auth.authenticated,
        auth_type: auth.auth_type
    }
}

export default connect(mapStateToProps, actions)(Header)