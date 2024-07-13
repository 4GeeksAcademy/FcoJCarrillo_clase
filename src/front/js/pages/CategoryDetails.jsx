import React, { useContext, useState,useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const CategoryDetails = () => {
    const {category, uid} = useParams();
    const navigate = useNavigate()
    const [image,setImage] = useState("");
    const {store, actions} = useContext(Context);
    const [currentMap, setCurrentMap] = useState()

    const handleImgError = (event) =>{
        //people,species y planet
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }

    const datos = async () => {
        const data = await actions.getCategoryDetails(category, uid);
        setCurrentMap(data);
        console.log(data);
    }
    useEffect(() => {
        datos();
    },[category, uid])
    return (
        <div className="container">
            <h1>Holaaaa</h1>
            {/* {currentMap && currentMap.map((item) => {
                retrun (
                <Card className="mx-2 my-2" style={{ width: '18rem' }} key={item.url}>
                    <Card.Img variant="top" src={`${image}/${item.uid}.jpg`}
                        onError={handleImgError} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            {item.name}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body className="d-flex justify-content-evenly">
                        <Button variant="primary"><i className="far fa-heart"></i></Button>
                    </Card.Body>
                </Card>
                )
            })}; */}
        </div>
    )
}