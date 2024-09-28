import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Home } from "./Home.jsx";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Dashboard = () => {
    const { store } = useContext(Context);

    return (
        !store.currentUser ?
            <Home />
            :
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <Card.Img variant="top" style={{ width: '30rem' }} src={rigoImageUrl}/>
                    </Col>
                    <Col md={6}>
                        <Card className="mx-2 my-2" style={{ width: '18rem' }} key={store.currentUser.id}>
                            <Card.Title className="text-center font-weight-bold">{store.currentUser.firstname}</Card.Title>
                            <Card.Body>
                                <Card.Text><strong>Usuario actual: </strong>{store.currentUser.firstname}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
    );
}