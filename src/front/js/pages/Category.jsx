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
    const { store, actions } = useContext(Context);

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
    const addFavouriteApi = async(favourite) =>{
        const token = localStorage.getItem('token');

        // Imprimir el token en la consola
        console.log(token);
        const dataToSend = {
            "item": favourite,
        };
        // 1. fetch al /api/login enviando en el body el dataToSend
        const uri = process.env.BACKEND_URL + 'api/favourites'
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            // Tratamos el error
            console.log('Error: ', response.status, response.statusText);
            if (response.status == 401) {
                const data = await response.json()
                console.log("Error: " + response.status + response.statusText)
            }
            else if(response.status == 409){
                console.log("El favorito ya existe");
            }
            return
        }

    }
    useEffect(()=>{
        if(param.category === "people") setImage("https://starwars-visualguide.com/assets/img/characters");
        else if(param.category === "species") setImage("https://starwars-visualguide.com/assets/img/species");
        else if(param.category === "planets") setImage("https://starwars-visualguide.com/assets/img/planets");
        
        data();
        
    },[param.category])
    
    return (
        <div className="container">
            <div className="row">
            <h1 className="text-center">{param.category.toUpperCase()}</h1>
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
                            {/* <Button onClick={() =>addfavorite(item.name)} variant="primary"><i className="far fa-heart"></i></Button> */}
                            <Button onClick={() =>addFavouriteApi(item.name)} variant="primary"><i className="far fa-heart"></i></Button>
                        </Card.Body>
                    </Card>
                    //<i class="fas fa-id-card"></i>
                )
            })}
            </div>
        </div>
    )
}