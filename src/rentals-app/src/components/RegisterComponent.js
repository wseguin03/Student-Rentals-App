import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import MainScreenComponent from './MainScreenComponent';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call your registration function here
        // For example: registerUser({ username, password, email });
    };

    return (
        <Container>
            <MainScreenComponent>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </MainScreenComponent>
        </Container>
    );
};

export default RegisterComponent;