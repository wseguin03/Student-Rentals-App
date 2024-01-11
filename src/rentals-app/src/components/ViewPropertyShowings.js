import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Row,Container } from 'react-bootstrap';
import axios from 'axios';
import MainScreenComponent from './MainScreenComponent';

const ViewPropertyShowings = () => {
    const [propertyShowings, setPropertyShowings] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        console.log("USERNAME"+userInfo.username);
        const fetchData = async () => {
            const response = await axios.get(`/api/rental/showing?username=${userInfo.username}`);
            setPropertyShowings(response.data);
        };

        fetchData();
    }, []);

    return (
        <MainScreenComponent title="Booked Showings">
            {propertyShowings.map((showing, index) => (
                <Container>
                    <Card key={index} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{showing.propertyType} - {showing.address}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Price: {showing.price}</ListGroup.Item>
                                <ListGroup.Item>Tenant: {showing.fName} {showing.lName}</ListGroup.Item>
                                <ListGroup.Item>Email: {showing.email}</ListGroup.Item>
                                <ListGroup.Item>Phone Number: {showing.phoneNum}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Container>
            ))}
        </MainScreenComponent>
    );
};

export default ViewPropertyShowings;