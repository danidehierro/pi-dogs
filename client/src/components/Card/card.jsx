import React from "react";
import './card.css';


export default function Card({name,img,temperament,weight}){

        return (
            <div className="Card">
                <h4 className="cardTitle">{name}</h4>
                <img src={img} alt="img not found" className="image" />
                <h5 className="generos2">{weight}</h5>
                <h5 className="generos"> {temperament}</h5>
            </div>



        ) 




}