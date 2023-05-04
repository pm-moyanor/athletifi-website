import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import '../styles/header.scss';

const Header = () => {
  return (
<>
  <Navbar color="dark" dark expand="md">
    <NavbarBrand href="/">AthletiFi</NavbarBrand>
    <Nav className="mr-auto" navbar>
      <NavItem>
        <NavLink href="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/about">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/marketplace">Marketplace</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/mint">Mint</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
</>
  )
}

export default Header;