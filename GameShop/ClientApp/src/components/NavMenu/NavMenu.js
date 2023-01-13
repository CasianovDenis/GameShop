import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import { Link } from 'react-router-dom';

import user_icon from '../public_files/user_icon.png';
import logo from './Logo.png';

import './NavMenu.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GetCookie from '../public_files/GetCookie.js';
import Mongo_upload_file from './Mongo_upload_file';
import Modal_add_game from './Modal_add_game';

export class NavMenu extends Component {
    static displayName = NavMenu.name;


    constructor(props) {
        
        super(props);

        

        this.toggleNavbar = this.toggleNavbar.bind(this);

        
        let user_name = GetCookie("username");
        let requestdata="";

        if (GetCookie("status_account") == "online") {


            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "Username":user_name
                })
            };


           
            //call api from backend and send json data,which create before
            
                fetch('http://localhost:56116/api/get_user_role', requestOptions)
                    .then(response => response.json())
                    .then((responseData) => {

                        requestdata = responseData;
                      
                        console.log(requestdata);
                    });

            


            if (requestdata == "admin") {

                this.state = {
                    collapsed: true,
                    status_link: "none",
                    status_dropdown: "block",
                    username: user_name,
                    role_dropdown: "block"
                };
            }

            else {
               
                this.state = {
                    collapsed: true,
                    status_link: "none",
                    status_dropdown: "block",
                    username: user_name,
                    role_dropdown: "none"
                };
            }

            
        }
        else {
            this.state = {
                collapsed: true,
                status_link: "block",
                status_dropdown: "none",
                role_dropdown: "none"
            };
        }



    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    Exit = () => {
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);

        window.localStorage.clear();

        document.cookie = "username= ; expires =" + now.toUTCString();

        document.cookie = "status_account=; expires = " + now.toUTCString();

        this.history.push('/');
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3" light style={{ backgroundColor: "#2a2a2a" }}>
                    <Container>
                        <NavbarBrand tag={Link} to="/" style={{ color: "white" }}><img src={logo} style={{ width: "60px", height: "50px" }} />GameShop</NavbarBrand>                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">

                                <NavItem>
                                    <NavLink tag={Link} to="/SignIn"
                                        style={{ display: this.state.status_link, color: "white" }}>Log In</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink tag={Link} to="/SignUp"
                                        style={{ display: this.state.status_link, color: "white" }}>Sign Up</NavLink>
                                </NavItem>

                                <NavItem style={{ display: this.state.status_dropdown }}>
                                    <div class="dropdown">

                                        <img src={user_icon} class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false" style={{width:"50px",height:"50px",cursor:"pointer"} } />

                                        <div class="dropdown-menu " aria-labelledby="dropdownMenuButton" >

                                            <p class="dropdown-item" style={{ cursor: "pointer" }}>Name : {this.state.username}</p>
                                            <NavLink tag={Link} class="dropdown-item" to="/Account" >Account</NavLink>
                                            <NavLink tag={Link} class="dropdown-item" to="/Settings" >Settings</NavLink>

                                            <div style={{ display: this.state.role_dropdown }}>
                                            <Modal_add_game  />
                                                <Mongo_upload_file  />
                                            </div>

                                            <NavLink tag={Link} class="dropdown-item" onClick={this.Exit} >Exit</NavLink>
                                        </div>
                                    </div>

                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}