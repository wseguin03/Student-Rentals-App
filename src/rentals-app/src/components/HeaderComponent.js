import React, { useEffect, useState } from 'react';
import './HeaderComponent.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
function HeaderComponent() {
   const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
        <Link to = '/'>
        Rental Central
                </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {userInfo && (
          <>
            {userInfo.userType == 'Tenant' && (
              <Nav>
                <Nav.Link href='/showing'>
                  <Link to='/showing'>
                    Book a Showing
                  </Link>
                </Nav.Link>
              </Nav>
            )}
            <Nav.Link href = '/message'>
              <Link to = '/message'>
                Messages
              </Link>
            </Nav.Link>
            {userInfo.userType == 'propertyManager' && (
            <Nav>
                <Nav.Link href='/showing/view'>
                  <Link to='/showing/view'>
                    View Booked Showings
                  </Link>
                </Nav.Link>
              </Nav>
            )} 
            <Nav>
                <Nav.Link href='/managers'>
                  <Link to='/managers'>
                    View Rental Central Managers
                  </Link>
                </Nav.Link>
              </Nav>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/my-profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item
                onClick={()=>{
                  localStorage.removeItem('userInfo')
                  window.location.reload()
                }}
                href="/"
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </>
        )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;