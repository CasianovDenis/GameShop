import React, { useEffect, useState , useContext} from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory , useLocation } from 'react-router-dom';
import { Context } from "../Context";

import user_icon from '../public_files/user_icon.png';
import logo from './Logo.png';

import './NavMenu.css';
import style from './NavMenu.module.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GetCookie from '../public_files/GetCookie.js';

import Mongo_upload_file from './Mongo_upload_file';
import Modal_add_game from './Modal_add_game';


export default function NavMenu(props) {

    const [collapsed, setCollapsed] = useState(true);
    const [admin_rights, setAdminRights] = useState(null);

    const [changes, setChanges] = useState(false);
    const [context, setContext] = useContext(Context);

    const [show_menu, setShowMenu] = useState(false);
    var button_status =[false , false ];

    const [active_button, setActiveButton] = useState([]);
    
    const username = GetCookie("username");


    const redirect = useHistory();
    const actual_location = useLocation();
    
    const toggleNavbar = () => setCollapsed(!collapsed);


    try {
        if (context == "success_entered")
            changes == false ? setChanges(true) : setChanges(false);
    }
    catch(ex) {
        console.log(ex);
    }

    useEffect(() => {
        
        setContext(null);

        let token = GetCookie("auth_token");

        if (GetCookie("status_account") == "online" && token.match(/^[A-Za-z0-9]*$/) && token.length == 25) {



            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }

            };


            fetch('http://localhost:56116/api/get_user_role/' + username, requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData == "admin")
                        setAdminRights("block");
                    else
                        setAdminRights("none");


                });



        }
        else {
            redirect.push('/');
            setAdminRights(null);
        }

       
  


    }, [changes]);

    useEffect(() => {



        if (actual_location.pathname == '/AllGames') { button_status[1] = true; setActiveButton(button_status); }
        else
            if (actual_location.pathname == '/') {
                button_status[0] = true; setActiveButton(button_status);
            }
            else {
                for (let index = 0; index < button_status.length; index++)
                    if (button_status[index] == true) button_status[index] = false;
                setActiveButton(button_status);
            }


    }, [actual_location.pathname]);


    const open_menu = () => {
        show_menu == false ? setShowMenu(true) : setShowMenu(false);
      
    }

    const redirect_home = () => {


        for (let index = 0; index < button_status.length; index++)
            if (button_status[index] == true) button_status[index] = false;

        button_status[0] = true;

        setActiveButton(button_status);
        redirect.push('/');
    }

    const redirect_allgames = () => {
      

        for (let index = 0; index < button_status.length; index++)
            if (button_status[index] == true) button_status[index] = false;

        button_status[1] = true;

        setActiveButton(button_status);
        redirect.push('/AllGames');
    }

   const ExitFromAccount = () => {
      

       var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);



        document.cookie = "username= ; expires =" + now.toUTCString();

        document.cookie = "status_account=; expires = " + now.toUTCString();

       document.cookie = "rights_token=; expires = " + now.toUTCString();

       document.cookie = "auth_token=; expires = " + now.toUTCString();

      
       
       changes == false ? setChanges(true) : setChanges(false);
       
    }

    if (admin_rights != null) {

        return (

            <div>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3" light style={{ backgroundColor: "#2a2a2a" }}>
                    <Container>
                        <NavbarBrand onClick={redirect_home} tag={Link} to="/" ><img src={logo} style={{width: "60px", height: "50px" }} /></NavbarBrand>
                        <NavbarToggler onClick={toggleNavbar} className="mr-2" style={{ backgroundColor: "white" }} />

                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
                            <ul className="navbar-nav flex-grow" >

                                <div class="nav_buttons">

                                    <div className={style.nav_button}  >

                                        <p onClick={redirect_home} >Home</p>
                                        <i style={{ backgroundColor: active_button[0] ? '#2196f3' : '' }}></i>

                                    </div>

                                    <div className={style.nav_button}  >

                                        <p onClick={redirect_allgames} >Discover</p>
                                        <i style={{ backgroundColor: active_button[1] ? '#2196f3' : '' }}></i>

                                    </div>

                                    
                                    <div  style={{ display: admin_rights }}>
                              
                                        <Modal_add_game />
                                        
                                      
                                    </div>


                                    <div  style={{ display: admin_rights }}>
                                    
                                        <Mongo_upload_file />
                                       
                                    </div>
                           

                                   

                                    

                                </div>

                                <NavItem >
                                    <div class="dropdown">

                                        <img src={user_icon} onClick={ open_menu}
                                           style={{ width: "50px", height: "50px", cursor: "pointer" }} />

                                        {show_menu && (
                                            <div class="dropdown-menu show" id="dropdownMenu"  >

                                            <p class="dropdown-item" style={{ cursor: "pointer" }}>Name : {username}</p>
                                            <NavLink tag={Link} className={style.nav_link} to="/UserGames" >My Games</NavLink>
                                            <NavLink tag={Link} className={style.nav_link} to="/Settings" >Settings</NavLink>
                                            <NavLink tag={Link} className={style.nav_link} onClick={ExitFromAccount} >Exit</NavLink>
                                        </div>
                                        )}
                                       

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
                    <NavbarBrand tag={Link} to="/"><img src={logo} style={{ width: "60px", height: "50px" }} /></NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" style={{ backgroundColor:"white" }} />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
                            <ul className="navbar-nav flex-grow">

                            <div class="nav_buttons">

                                <div className={style.nav_button}  >

                                    <p onClick={redirect_home} >Home</p>
                                    <i style={{ backgroundColor: active_button[0] ? '#2196f3' : '' }}></i>

                                </div>

                                <div className={style.nav_button}  >

                                    <p onClick={redirect_allgames} >Discover</p>
                                    <i style={{ backgroundColor: active_button[1] ? '#2196f3' : '' }}></i>

                                </div>

                            </div>

                                <NavItem>
                                <NavLink tag={Link} to="/SignIn"
                                    style={{ color: "white" }} className={ style.nav_link}>Log In</NavLink>
                                </NavItem>

                               <NavItem>
                                    <NavLink tag={Link} to="/SignUp"
                                    style={{ color: "white" }} className={style.nav_link}>Sign Up</NavLink>
                                </NavItem>

                           </ul>
                        </Collapse>
                    </Container>
                </Navbar>
        </div>
    );
}
