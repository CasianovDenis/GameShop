import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Mongo_upload_file from './Mongo_upload_file';
import Modal_add_game from './Modal_add_game';
import logo from './Logo.png';

import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3" light style={{ backgroundColor:"#2a2a2a"}}>
                    <Container>
                        <NavbarBrand tag={Link} to="/" style={{color:"white"} }><img src={logo} style={{width:"60px",height:"50px"} }/>GameShop</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">


                                <Modal_add_game />
                                
                                    <Mongo_upload_file />
                                

                                {/*<NavItem>*/}
                                {/*    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>*/}
                                {/*</NavItem>*/}
                                {/*<NavItem>*/}
                                {/*    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>*/}
                                {/*</NavItem>*/}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
