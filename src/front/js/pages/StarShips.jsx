import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const StarShips = () => {
    const handleImgError = (event) =>{
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <div className="row">

            {store.vehicles && store.vehicles.map((item) => {
                return (
                    <Card className="mx-2 my-2" style={{ width: '18rem' }} key={item.uid}>
                        <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/starships/${item.uid}.jpg`}
                        onError={handleImgError} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                {item.name}
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                )
            })}
            </div>
        </div>
    )
}