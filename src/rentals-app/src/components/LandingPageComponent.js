import React, { useEffect, useState } from 'react';
import './LandingPageComponent.css';
import { Container, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPageComponent = () => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    console.log(userInfo);
    
    return (
        <div className='landing-page-main d-flex align-items-center justify-content-center'>
            <Container className='login-box'>
                <Row>
                    <h5>Welcome to Rental-Central, a place for all your student rentals.</h5>
                </Row>

                {!userInfo ? (
                    <Row>
                        <Link to="/login">
                            <Button variant="primary" >Login</Button>
                        </Link>
                        {/* <Link to="/register">
                            <Button className = 'register-btn'variant="primary" >Register</Button>
                        </Link> */}
                    </Row>
                ) : (
                    <>
                        <Row>
                            <h6>Welcome {userInfo.username}!</h6>
                        </Row>
                        <Row>
                            {userInfo.userType == 'Tenant' ? (
                            <Link to="/showing">
                                <Button variant="primary">Book Property Showing</Button>
                            </Link>
                            ) : null}
                             {userInfo.userType == 'propertyManager' ? (
                            <Link to="/showing/view">
                                <Button variant="primary">View Booked Showings</Button>
                            </Link>
                            ) : null}
{/*                          
                          <Link to="/property-listings">
                                  <Button id="property-btn"variant="primary">View Properties</Button>
                              </Link> */}
                       
                            </Row>
                    </>
                )}
            </Container>
        </div>
    );
}

export default LandingPageComponent;
