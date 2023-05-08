import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarToggler, } from 'reactstrap';
// import '../styles/header.scss';

const BsNavLink = props => {
  const { href, title } = props;
  return (
    <NavLink href={href} className="nav-link port-navbar-link">{title}</NavLink>
    )
  }
  
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar
        className="port-navbar port-default absolute"
        color="transparent"
        dark
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand" href="/">AthletiFi</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <NavItem className="port-navbar-item">
              <BsNavLink href="/" title="Home"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/about" title="About"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/marketplace" title="Marketplace"/>
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/mint" title="Mint"/>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  )
}

export default Header;


