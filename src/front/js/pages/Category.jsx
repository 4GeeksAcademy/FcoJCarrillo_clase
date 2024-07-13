import React, { useContext, useEffect,useState } from "react";
import { Context } from "../store/appContext.js";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from "react-router-dom";


export const Category = () => {
    const param = useParams();
    const [image,setImage] = useState("");
    const [category, setCategory] = useState("");
    const [currentMap, setCurrentMap] = useState("");

    const handleImgError = (event) =>{
        //people,species y planet
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }
    const handleProperties = async(parameter, uid) => {
        await actions.getCategoryDetails(parameter, uid);
        setCategory(parameter);
    }
    const data = async () => {
        setCurrentMap(await actions.getCategory(param.category));
        console.log(currentMap);
    }
    const addfavorite = async (parameter) => {
        await actions.addFavorite(parameter);
    }
    useEffect(()=>{
        if(param.category === "people") setImage("https://starwars-visualguide.com/assets/img/characters");
        else if(param.category === "species") setImage("https://starwars-visualguide.com/assets/img/species");
        else if(param.category === "planets") setImage("https://starwars-visualguide.com/assets/img/planets");
        
        data();
        
    },[param.category])
    const { store, actions } = useContext(Context);
    return (
        <div className="container">
            <div className="row">

            {currentMap && currentMap.map((item) => {
                return (
                    <Card className="mx-2 my-2" style={{ width: '18rem' }} key={item.uid}>
                        <Card.Img variant="top" src={`${image}/${item.uid}.jpg`}
                        onError={handleImgError} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                {item.name}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className="d-flex justify-content-evenly">
                        <Link to={`/${param.category}/${item.uid}`}>
                            <Button onClick={() =>handleProperties(param.category,item.uid)} variant="primary">More information</Button>
                            </Link>
                            <Button onClick={() =>addfavorite(item.name)} variant="primary"><i className="far fa-heart"></i></Button>
                        </Card.Body>
                    </Card>
                    //<i class="fas fa-id-card"></i>
                )
            })}
            </div>
        </div>
    )
}