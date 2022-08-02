import React from "react";
import "./card.css"
export default function Card({img,name,types,hp}){
    
   const type = types.join("-")
    
    return (
       
        <div className="card-container">
           
            <h1 className="titulo">{name}</h1>
            <h3>{hp}</h3>
            <h5>{type}</h5>
            <img src={img} alt="img not found" width="400px" height="300px"/>
            
            
        </div>
        
    )
}