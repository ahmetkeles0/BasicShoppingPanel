import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';



const NavBar = ({ onSearch }) => {
  return (
    <Navbar bg="primary" variant="dark" fixed="top">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Navbar.Brand href="#home">Eteration</Navbar.Brand>
          <SearchBar onSearch={onSearch}/>
        </div>
        <Nav className="ml-auto">
          <Nav.Link href="#pricing">
            <FontAwesomeIcon icon={faBagShopping} style={{ color: '#ffffff' }} /> 117.000₺
          </Nav.Link>
          <Nav.Link href="#home">
            <FontAwesomeIcon icon={faUser} style={{ color: '#ffffff' }} /> Ahmet
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
