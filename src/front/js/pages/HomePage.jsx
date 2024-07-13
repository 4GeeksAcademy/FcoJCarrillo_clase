import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const HomePage = () => {
    const { store, actions } = useContext(Context);
    return (
        //https://starwars-visualguide.com/#/
        <div className="container">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100 h-25" src="https://starwars-visualguide.com/assets/img/films/4.jpg" alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100 h-25" src="https://starwars-visualguide.com/assets/img/films/5.jpg" alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100 h-25" src="https://starwars-visualguide.com/assets/img/films/6.jpg" alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}