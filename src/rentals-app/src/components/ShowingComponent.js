import React, { useEffect, useState } from 'react';
import { Container, Form, Dropdown, Button, Card, Row, Col} from 'react-bootstrap';
import MainScreenComponent from './MainScreenComponent';
import axios from 'axios';

function ShowingComponent() {
    const [time, setTime] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [numBedrooms, setNumBedrooms] = useState('');
    const [numBathrooms, setNumBathrooms] = useState('');
    const [distanceToCampus, setDistanceToCampus] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [userData, setUserData] = useState(null);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`api/rental/tenant?username=${userInfo.username}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [userInfo.username]);

    const handleTimeChange = (event) => {
        const value = event.target.value;
        const hours = Number(value.split(':')[0]);

        if (hours < 9 || hours > 17) {
            return;
        }

        setTime(value);
    };

    const handleSelect = (selectedKey, event) => {
        const { name } = event.target;
        if (name === 'propertyType') {
            setPropertyType(selectedKey);
        } else if (name === 'priceRange') {
            setPriceRange(selectedKey);
        } else if (name === 'numBedrooms') {
            setNumBedrooms(selectedKey);
        } else if (name === 'numBathrooms') {
            setNumBathrooms(selectedKey);
        } else if (name === 'distanceToCampus') {
            setDistanceToCampus(selectedKey);
        }
    };
// useEffect(() => {
//     console.log(propertyType);
//     console.log(priceRange);
//     console.log(numBedrooms);
//     console.log(numBathrooms);
//     console.log(distanceToCampus);

// }, [propertyType, priceRange, numBedrooms, numBathrooms, distanceToCampus]);


const fetchFilteredProperties = async () => {
    try {
        const response = await axios.get('api/rental/property/filter', {
            params: {
                minPrice: priceRange.split('-')[0],
                maxPrice: priceRange.split('-')[1],
                numBedrooms: numBedrooms,
                numBathrooms: numBathrooms,
                propertyType: propertyType,
                distanceToCampus: distanceToCampus,
            },
        });

        console.log(response.data);
        setProperties(response.data);

    } catch (error) {
        console.error('Failed to fetch filtered properties:', error);
    }
};

useEffect(() => {
    fetchFilteredProperties();
}, [priceRange, numBedrooms, numBathrooms, propertyType, distanceToCampus]);

    return (
        <Container>
            <MainScreenComponent title='Book a Showing'>
                <Form>
                    <Form.Group controlId="formTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="time" value={time} onChange={handleTimeChange} />
                    </Form.Group>
                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group controlId="formPropertyType">
                        <Form.Label>Property Type</Form.Label>
                        <Dropdown onSelect={(e) => setPropertyType(e)} name="propertyType">
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {propertyType? propertyType : 'Property type'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Town house">Town house</Dropdown.Item>
                                <Dropdown.Item eventKey="Appartment">Apartment</Dropdown.Item>
                                <Dropdown.Item eventKey="House">House</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                                    <Form.Group controlId="formPriceRange">
                                            <Form.Label>Price Range (monthly)</Form.Label>
                                            <Dropdown onSelect={(e) => setPriceRange(e)}>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                    {priceRange? priceRange : 'Price range'}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="1000-2000">1000-2000</Dropdown.Item>
                                                    <Dropdown.Item eventKey="2000-3000">2000-3000</Dropdown.Item>
                                                    <Dropdown.Item eventKey="3000-4000">3000-4000</Dropdown.Item>
                                                    <Dropdown.Item eventKey="4000-5000">4000-5000</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>

                                        <Form.Group controlId="formNumBedrooms">
                                            <Form.Label>Number of Bedrooms</Form.Label>
                                            <Dropdown onSelect={(e) => setNumBedrooms(e)}>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                    {numBedrooms? numBedrooms : 'Number of bedrooms'}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {[...Array(7).keys()].map((value) =>
                                                        <Dropdown.Item eventKey={value + 1} key={value + 1}>{value + 1}</Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>

                                        <Form.Group controlId="formNumBathrooms">
                                            <Form.Label>Number of Bathrooms</Form.Label>
                                            <Dropdown onSelect={(e) => setNumBathrooms(e)}>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                    {numBathrooms? numBathrooms : 'Number of bathrooms'}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {[...Array(7).keys()].map((value) =>
                                                        <Dropdown.Item eventKey={value + 1} key={value + 1}>{value + 1}</Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>

                                        <Form.Group controlId="formDistanceToCampus">
                                            <Form.Label>Distance to Campus (km)</Form.Label>
                                            <Dropdown onSelect={(e) => setDistanceToCampus(e)}>
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                    {distanceToCampus? distanceToCampus : 'Distance to campus'}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {[...Array(10).keys()].map((value) =>
                                                        <Dropdown.Item eventKey={value + 1} key={value + 1}>{value + 1}</Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <br />
                                            
                                        </Form.Group>
                                    </Form>
                                        <Row>
                                            {properties.map((property) => (
                                                <Col md={3} key={property.propertyID}>
                                                    <Card style={{ width: '18rem' }}>
                                                        <Card.Body>
                                                            <Card.Title>{property.propertyType}</Card.Title>
                                                            <Card.Subtitle className="mb-2 text-muted">{property.address}</Card.Subtitle>
                                                            <Card.Text>
                                                                Price: {property.price} <br />
                                                                Bedrooms: {property.numBedrooms} <br />
                                                                Bathrooms: {property.numBathrooms} <br />
                                                                Distance to Campus: {property.distanceToCampus}km
                                                            </Card.Text>
                                                            <Button variant="primary">Book a Showing</Button>
                                                        </Card.Body>
                                                    </Card>
                                                    <br></br>
                                                </Col>
                                            ))}
                                        </Row>
                                </MainScreenComponent>
                                
                            </Container>
                        );
                    }

                    export default ShowingComponent;