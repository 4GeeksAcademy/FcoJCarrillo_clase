import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const { actions } = useContext(Context);
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const navigate = useNavigate()

    const handleRegister = async (event) => {
        event.preventDefault();
        console.log(userLogin, userPassword,userPasswordConfirm);
        // if(userPassword != userPasswordConfirm){
        //     actions.setAlert({ visible: true, back: 'info', text: "Las contraseñas no coinciden" })
        //     console.log("No coinciden las contraseñas");
        //     return
        // }
        // fetch a /api/signup enviando dataToSend
        const dataToSend = { "email":userLogin, 
                            "password":userPassword};
        const uri = process.env.BACKEND_URL + 'api/signup';
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            // tratar el error
            console.log('Error: ', response.status, response.statusText);
            return
        }
        const data = await response.json()
        console.log(data);
        // guardar el token y user en el localStorage
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.results))
        // actions: si está logueado, datos del usuario, el mensaje
        actions.setIsLoged(true);
        actions.setCurrentUser(data.results);
        //actions.token(data.access_token);
        actions.setAlert({ visible: true, back: 'info', text: data.message })
        navigate('/dashboard')
    }
    return (
        <Container className="border border-primary p-4 mt-4" style={{ width: '50%', maxWidth: '600px', height: 'auto' }}>
            <Row className="justify-content-md-center">
                <Col xs md lg={6}>
                    <h1 className="text-center">
                        <Badge bg="info">Register</Badge>
                    </h1>
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>User</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" value={userLogin} onChange={(event) => setUserLogin(event.target.value)} />
                            {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
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