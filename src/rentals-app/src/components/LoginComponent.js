import React, { useState } from 'react';
import { Container, Form, Button, Dropdown, Row } from 'react-bootstrap';
import MainScreenComponent from './MainScreenComponent';
import Loading from './Loading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LoginComponent() {
    const [userType, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginState, setLoginState] = useState(false);
    const handleSelect = (selectedKey) => {
        setUserType(selectedKey);
    };
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
      
        try {
          const config = {
            headers: {
              'Content-type': 'application/json'
            }
          }
          setLoading(true)
          console.log(userType, username, password)
          const { data } = await axios.post('/api/rental/login', {userType, username, password }, config)
          
          console.log(data);
          localStorage.setItem('userInfo', JSON.stringify(data));
      
          setLoading(false)
          navigate('/') // Redirect to '/home'
        //   setError(false)
          setLoginState(true);
        //   navigate('/') // Redirect to '/'
        } catch (error) {
          console.error(error)
        //   setError(error.response.data.message)
          setLoading(false)
        }
      }
    return (
        <Container>
            <MainScreenComponent title='Login'>
            {loading && <Loading/>}
                <Form onSubmit={submitHandler}>
                    
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formRole">
                        <Form.Label><strong>Login As</strong></Form.Label>
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {userType === '' ? 'Select Role' : userType}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Tenant">Tenant</Dropdown.Item>
                                <Dropdown.Item eventKey="propertyManager">Property Manager</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Row><br></br></Row>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </MainScreenComponent>
        </Container>
    );
}

export default LoginComponent;