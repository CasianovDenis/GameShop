import React, { useEffect, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import user_icon from '../public_files/user_icon.png';
import logo from './Logo.png';

import './NavMenu.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GetCookie from '../public_files/GetCookie.js';

import Mongo_upload_file from './Mongo_upload_file';
import Modal_add_game from './Modal_add_game';


export default function NavMenu(props) {

    const [collapsed, setCollapsed] = useState(true);
    const [admin_rights, setAdminRights] = useState(null);

    
    const username = GetCookie("username");


    const redirect = useHistory();
    const toggleNavbar = () => setCollapsed(!collapsed);



    useEffect(() => {

        

        if (GetCookie("status_account") == "online") {

           

                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                    
                };


                fetch('http://localhost:56116/api/get_user_role/'+username , requestOptions)
                    .then(response => response.json())
                    .then((responseData) => {

                        if (responseData == "admin")
                            setAdminRights("block");
                        else
                            setAdminRights("none");

                        
                    });
            
        }
        else
            redirect.push('/');



    }, []);


   const ExitFromAccount = () => {

       var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);



        document.cookie = "username= ; expires =" + now.toUTCString();

        document.cookie = "status_account=; expires = " + now.toUTCString();

       document.cookie = "rights_token=; expires = " + now.toUTCString();

       redirect.go('/');
    }

    if (admin_rights != null) {

        return (

            <div>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3" light style={{ backgroundColor: "#2a2a2a" }}>
                    <Container>
                        <NavbarBrand tag={Link} to="/" ><img src={logo} style={{width: "60px", height: "50px" }} /></NavbarBrand>
                        <NavbarToggler onClick={toggleNavbar} className="mr-2" />

                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
                            <ul className="navbar-nav flex-grow" >

                                <div class="nav_buttons">

                                    <div style={{ display: admin_rights }}>
                              
                                        <Modal_add_game />
                                      
                                    </div>


                                    <div style={{ display: admin_rights }}>
                                    
                                        <Mongo_upload_file />
                                    </div>
                           

                                <div class="discover_games">
                           
                                    <NavLink tag={Link} to="/AllGames" style={{color:"white"} }>Discover</NavLink>

                              
                                </div>

                                    </div>
                                <NavItem >
                                    <div class="dropdown">

                                        <img src={user_icon} class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false" style={{ width: "50px", height: "50px", cursor: "pointer" }} />

                                        <div class="dropdown-menu" id="dropdown_menu" aria-labelledby="dropdownMenuButton" >

                                            <p class="dropdown-item" style={{ cursor: "pointer" }}>Name : {username}</p>
                                            <NavLink tag={Link} class="dropdown-item " to="/UserGames" >My Games</NavLink>
                                            <NavLink tag={Link} class="dropdown-item " to="/Settings" >Settings</NavLink>
                                            <NavLink tag={Link} class="dropdown-item " onClick={ExitFromAccount} >Exit</NavLink>
                                        </div>

                                      

                                    </div>

                                </NavItem>
                            </ul>
                        </Collapse>


                    </Container>
                </Navbar>
            </div>
        );
    
       
}
    else
    return (
        <div>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3" light style={{ backgroundColor: "#2a2a2a" }}>
                    <Container>
                    <NavbarBrand tag={Link} to="/" style={{ color: "white" }}><img src={logo} style={{ width: "60px", height: "50px" }} />GameShop</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
                            <ul className="navbar-nav flex-grow">

                                <NavItem>
                                    <NavLink tag={Link} to="/SignIn"
                                        style={{  color: "white" }}>Log In</NavLink>
                                </NavItem>

                               <NavItem>
                                    <NavLink tag={Link} to="/SignUp"
                                        style={{  color: "white" }}>Sign Up</NavLink>
                                </NavItem>

                           </ul>
                        </Collapse>
                    </Container>
                </Navbar>
        </div>
    );
}
