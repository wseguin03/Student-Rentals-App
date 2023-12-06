import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Row, Col, Container  } from 'react-bootstrap';
import axios from 'axios';
import MainScreenComponent from './MainScreenComponent';

const ViewAllPMComponent = () => {
  const [propertyManagers, setPropertyManagers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/rental/manager/num-properties');
      setPropertyManagers(response.data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <MainScreenComponent title = 'Property Managers'>
        <Row>
          {propertyManagers.map((pm, index) => (
            <Col md={4} key={index}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Full Name: {pm.fName.charAt(0).toUpperCase() + pm.fName.slice(1)} {pm.lName.charAt(0).toUpperCase() + pm.lName.slice(1)}</Card.Title>                <ListGroup variant="flush">
                    <ListGroup.Item>Username: {pm.username}</ListGroup.Item>
                    <ListGroup.Item>Number of Listings: {pm.numListings}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              <br></br>
            </Col>
          ))}
        </Row>
      </MainScreenComponent>
    </Container>
  );
};

export default ViewAllPMComponent;