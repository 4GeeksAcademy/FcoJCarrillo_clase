import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

export const CategoryDetails = () => {
    const { category, uid } = useParams();
    const navigate = useNavigate()
    const [image, setImage] = useState("");
    const { store, actions } = useContext(Context);
    const [currentObject, setObject] = useState(null);
    const propiedadesArray = [{}]

    const handleImgError = (event) => {
        //people,species y planet
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }

    const datos = async () => {
        const data = await actions.getCategoryDetails(category, uid);
        setObject(data);
        console.log(data);
    }
    const dataDetails = (category, currentObject) => {
        switch (category) {
            case "people":
                return (
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <Card.Img variant="top" style={{ width: '30rem' }} src={`${image}/${uid}.jpg`} onError={handleImgError} />
                            </Col>
                            <Col md={6}>
                                <Card className="mx-2 my-2" style={{ width: '18rem' }} key={currentObject.uid}>
                                    <Card.Title className="text-center">{currentObject.name}</Card.Title>
                                    <Card.Body>
                                        <Card.Text>
                                            {currentObject.gender}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                );
            case "species":
                return (
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <Card.Img variant="top" style={{ width: '30rem' }} src={`${image}/${uid}.jpg`} onError={handleImgError} />
                            </Col>
                            <Col md={6}>
                                <Card className="mx-2 my-2" style={{ width: '18rem' }} key={currentObject.uid}>
                                    <Card.Title className="text-center">{currentObject.name}</Card.Title>
                                    <Card.Body>
                                        <Card.Text>
                                            {currentObject.classification}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                );
            case "planets":
                return (
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6}>
                                <Card.Img variant="top" style={{ width: '30rem' }} src={`${image}/${uid}.jpg`} onError={handleImgError} />
                            </Col>
                            <Col md={6}>
                                <Card className="mx-2 my-2" style={{ width: '18rem' }} key={currentObject.uid}>
                                    <Card.Title className="text-center">{currentObject.name}</Card.Title>
                                    <Card.Body>
                                        <Card.Text>
                                            {currentObject.climate}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                );
            default:
                <h1>Opcion no disponible</h1>
        }
    }
    /*
    objetos planetas
"properties": {
            "diameter": "10465",
            "rotation_period": "23",
            "orbital_period": "304",
            "gravity": "1 standard",
            "population": "200000",
            "climate": "arid",
            "terrain": "desert",
            "surface_water": "1",
            "created": "2024-07-13T02:58:18.074Z",
            "edited": "2024-07-13T02:58:18.074Z",
            "name": "Tatooine",
            "url": "https://www.swapi.tech/api/planets/1"
            12
        }
        
            objetos people
                   "properties": {
            "height": "172",
            "mass": "77",
            "hair_color": "blond",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "19BBY",
            "gender": "male",
            "created": "2024-07-13T02:58:18.071Z",
            "edited": "2024-07-13T02:58:18.071Z",
            "name": "Luke Skywalker",
            "homeworld": "https://www.swapi.tech/api/planets/1",
            "url": "https://www.swapi.tech/api/people/1"
            13
        },
        objetos species
            "classification": "mammal",
            "designation": "sentient",
            "average_height": "180",
            "average_lifespan": "120",
            "hair_colors": "blonde, brown, black, red",
            "skin_colors": "caucasian, black, asian, hispanic",
            "eye_colors": "brown, blue, green, hazel, grey, amber",
            "homeworld": "https://www.swapi.tech/api/planets/1",
            "language": "Galactic Basic",
            "people": [
                "https://www.swapi.tech/api/people/66",
                "https://www.swapi.tech/api/people/67",
                "https://www.swapi.tech/api/people/68",
                "https://www.swapi.tech/api/people/74"
            ],
            "created": "2024-07-13T02:58:18.076Z",
            "edited": "2024-07-13T02:58:18.076Z",
            "name": "Human",
            "url": "https://www.swapi.tech/api/species/1"
    14
    */
    useEffect(() => {
        if (category === "people") setImage("https://starwars-visualguide.com/assets/img/characters");
        else if (category === "species") setImage("https://starwars-visualguide.com/assets/img/species");
        else if (category === "planets") setImage("https://starwars-visualguide.com/assets/img/planets");

        datos();
    }, [category, uid])

    return (
        <div className="container text-center">
            {currentObject ? dataDetails(category, currentObject) :
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
            {/* {currentObject ? (
                <Card className="mx-2 my-2" style={{ width: '50rem' }} key={currentObject.uid}>
                <Card.Img variant="top" src={`${image}/${uid}.jpg`}
                onError={handleImgError} />
                <Card.Body>
                    <Card.Title>{currentObject.name}</Card.Title>
                    <Card.Text>
                        {currentObject.name}
                    </Card.Text>
                </Card.Body>
            </Card>
            ) : (
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )} */}
        </div>
    );
};