import React, { useEffect } from 'react'
import { Container, Form, Button, Dropdown, Row,Col, ListGroup } from 'react-bootstrap';
import MainScreenComponent from './MainScreenComponent';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const MessageComponent = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [tenantSenderBool, setTenantSenderBool] = useState(userInfo.userType == 'Tenant' ? 1 : 0);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [tenantUser, setTenantUser] = useState('');
    const [propManUser, setPropManUser] = useState('');
    const [propertyInfo , setPropertyInfo] = useState([]);
    const {propertyID} = useParams();




    const handleSubmit = async (e) => {
        e.preventDefault();
        const date = new Date();

        const sendDate = date.toISOString().split('T')[0]; // returns date in 'YYYY-MM-DD' format        
        const sendTime = date.toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/New_York' }).split(':').slice(0, 2).join(':');
        // console.log(sendDate);
        // console.log(sendTime);
        try {
            const response = await axios.post('http://localhost:3000/api/rental/message', {
                subject: subject,
                message: message,
                sendDate: sendDate,
                sendTime: sendTime,
                tenantUser: tenantUser,
                propManUser: propManUser,
                tenantSenderBool: tenantSenderBool,
            });

            console.log(response.data);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };


const fetchMessages = async (tenantSenderBool) => {
console.log(userInfo.username)
console.log(tenantSenderBool)
    try {
        const response = await axios.get('http://localhost:3000/api/rental/message', {
            params: {
                username: userInfo.username,
                tenantSenderBool: tenantSenderBool,
            },
        });

        setMessages(response.data);
        console.log(response.data)
    } catch (error) {
        console.error('Failed to fetch messages:', error);
    }
};

const fetchPropertyInfo = async (propertyID) => {
   
        try {
            const response = await axios.get(`http://localhost:3000/api/rental/property?id=${propertyID}`, {
                params: {
                    propertyID: propertyID,
                },
            });
    
            setPropertyInfo(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch property info:', error);
        }
    };


useEffect(() => {
    if (propertyID)
    fetchPropertyInfo(propertyID);
   


}, [propertyID]);

useEffect(() => {
    if (propertyInfo.length > 0) {
        setPropManUser(propertyInfo[0].propManUser);
        setSubject(`Regarding proeperty at:  ${propertyInfo[0].address}`);
    }
}, [propertyInfo]);

useEffect(() => {
    if(userInfo){
        if (userInfo.userType == 'Tenant'){
            setTenantUser(userInfo.username);
        }
        else{
            setTenantUser('');
            setPropManUser(userInfo.username);
        }
        // setTenantUser(userInfo.username ? userInfo.username : '')
        fetchMessages(tenantSenderBool);

    }

    
}, [tenantSenderBool]
)

  return (
  <Container>
     <Row>
         
         <Col md = {6}>
           <MainScreenComponent title='Send Messages'>
           <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formTenantUser">
                <Form.Label>Tenant User</Form.Label>
                <Form.Control type="text" value={tenantUser}  onChange={(e) => setTenantUser(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPropManUser">
                <Form.Label>Property Manager User</Form.Label>
                <Form.Control type="text" value={propManUser} onChange={(e) => setPropManUser(e.target.value)} />
            </Form.Group>
            <br></br>       
            <Button variant="primary" type="submit">
                Send Message
            </Button>
        </Form>
           </MainScreenComponent>
         </Col>
         <Col md = {6}>
           <MainScreenComponent title='View Messages'>
            
           <ListGroup>
            {messages.length>0 ? null : <h3>No Messages</h3>}
            {messages.map((message) => (
                <>
                    <Row>
                        <ListGroup.Item key={message.id}>
                            <Row>
                                <Col md={6}>
                                    <h5>{message.subject}</h5>
                                    <p>{message.message}</p>
                                    <small>Sent by: {message.tenantSenderBool ? message.tenantUser : message.propManUser}</small>
                                    <br></br>
                                    <small>Sent on {message.sendDate.split('T')[0]} at {message.sendTime}</small>
                                </Col>
                                <Col md={6}>
                                    <h5>Sender Info</h5>
                                    <p>Full Name: {message.fName.charAt(0).toUpperCase() + message.fName.slice(1)} {message.lName.charAt(0).toUpperCase() + message.lName.slice(1)}</p>                                    <small>Phone Number: {message.phoneNum}</small>
                                    <br></br>
                                    <small>Email: {message.email}</small>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <br></br>
                    </Row>
                </>
            ))}

        </ListGroup>
           </MainScreenComponent>
         </Col>
     </Row>
  </Container>
  )
}

export default MessageComponent