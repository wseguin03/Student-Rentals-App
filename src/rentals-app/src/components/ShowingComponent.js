import React, { useState } from 'react';
import { Container, Form, Col, Dropdown } from 'react-bootstrap';
import MainScreenComponent from './MainScreenComponent';
function ShowingComponent() {
    const [time, setTime] = useState('');
    const [propertyType, setPropertyType] = useState('Select Property Type');
    const handleTimeChange = (event) => {
        const value = event.target.value;
        const hours = Number(value.split(':')[0]);

        if (hours < 9 || hours > 17) {
            return;
        }

        setTime(value);
    };

    const handleSelect = (selectedKey) => {
        setPropertyType(selectedKey);
    };
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
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {propertyType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Town house">Town house</Dropdown.Item>
                                <Dropdown.Item eventKey="Apartment">Apartment</Dropdown.Item>
                                <Dropdown.Item eventKey="House">House</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </Form>
        </MainScreenComponent>
        </Container>
    );
}

export default ShowingComponent;