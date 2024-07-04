//1.Importar el hook useC
import React, {useContext} from "react";
//3.desebtructurar stoes,actions desde Context
import {Context} from "../store/appContext.js";

export const User = () =>{
    //desestructuras 
const{store,actions} = useContext(Context);

    <div className="container">
        <h1>Cohorte:{store.Cohorte}</h1>
        <h2>User:{store.User}</h2>
    </div>
}