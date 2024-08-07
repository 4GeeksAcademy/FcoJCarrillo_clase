import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';

export const Login = () => {
    const { actions } = useContext(Context);
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate()
    
    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(userLogin, userPassword);
        const dataToSend = {"email":userLogin, 
                            "password":userPassword};
        // 1. fetch al /api/login enviando en el body el dataToSend
        const uri = process.env.BACKEND_URL + '/api/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            // Tratamos el error
            console.log('Error: ', response.status, response.statusText);
            if (response.status == 401) {
                const data = await response.json()
                // let alert = {
                //     visible: true,
                //     back: 'danger',
                //     text: data.message
                // }
                // actions.setAlert(alert)
                console.log("Error: "+response.status+ response.statusText)
            }
            return
        }
        const data = await response.json()
        // Almaceno los datos en localStorage y en flux (store)
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.results));
        actions.setCurrentUser(data.results);
        actions.setIsLoged(true)
        actions.setAlert({ visible: true, back: 'info', text: data.message })
        // Me voy al dashboard
        navigate('/dashboard')
    };

    return  (
        <Container className="border border-primary p-4 mt-4" style={{ width: '50%', maxWidth: '600px', height: 'auto' }}>
            <Row className="justify-content-md-center">
                <Col xs md lg={6}>
                <h1 className="text-center">
        <Badge bg="info">LOGIN</Badge>
      </h1>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" value={userLogin} onChange={(event) => setUserLogin(event.target.value)} />
                            {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="summit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>

        </Container>

    )
}