import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Profile =()=>{
    const { actions } = useContext(Context);
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate()
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs md lg={6}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" value={userLogin} onChange={(event) => setUserLogin(event.target.value)} />
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