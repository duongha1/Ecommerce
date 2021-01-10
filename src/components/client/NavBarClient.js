import React, { Component } from 'react'
import {Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText} from 'reactstrap'
import {Link, NavLink} from 'react-router-dom'
import Login from '../../assets/icons/login'
import Cart from '../../assets/icons/cart'
import Search from '../../assets/icons/search'
import { connect } from 'react-redux'


class NavBarClient extends Component {
    render() {
        const toggle = false;
        const isOpen = false;
        return (
            <div id="navbar">
                <Navbar className="pt-4" expand="md">
                <div className="d-flex m-auto">
                    <Link exact to="/products" className="mr-3">
                        <img className="logo" src="https://media.istockphoto.com/vectors/abstract-letter-m-logotype-modern-logotype-idea-sign-universal-emblem-vector-id1130887938?k=6&m=1130887938&s=612x612&w=0&h=Nua2niFDo61BES_T9JrUE7tBL8bqh3zsxwE8oS8rsAA=" alt="homeLogo"></img>
                    </Link>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink to="/products">NEW</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/products">COLLECTIONS</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                PRODUCTS
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        NEW ARRIVAL
                                    </DropdownItem>
                                    <DropdownItem>
                                        IN STOCK
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        TOPWEARS
                                    </DropdownItem>
                                    <DropdownItem>
                                        HEADWEARS
                                    </DropdownItem>
                                    <DropdownItem>
                                        BOTTOMS
                                    </DropdownItem>
                                    <DropdownItem>
                                        DENIM
                                    </DropdownItem>
                                    <DropdownItem>
                                        OUTERWEAR
                                    </DropdownItem>
                                    <DropdownItem>
                                        ACCESSORIES
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink to="/products">SALE</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/products">CONTACT</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText className="icons">
                            <NavLink exact to="/user_login">
                                <Login/>
                            </NavLink>
                            <div id="navCart">
                                <NavLink exact to="/cart">
                                    <Cart/>
                                    <div className="cart_qty">{this.props.cart_total}</div>
                                </NavLink>
                            </div>
                            <Search/>
                        </NavbarText>
                    </Collapse>
                </div>
            </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    const cart_total = state.cart.reduce((sum,product)=>{
        return sum = product.quantity + sum
    }, 0)
    return {
        cart_total
    }
}

export default connect(mapStateToProps)(NavBarClient)