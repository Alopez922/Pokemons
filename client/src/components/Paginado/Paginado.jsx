import React from "react";
import "./paginado.css"


export default function Paginado({pokemonsPerPage,allPokemons,paginado}){
    const pageNumbers = []

    for(let i= 1; i<= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <nav className="paginador">
            <ul className="number">
                {pageNumbers && pageNumbers.map(number =>(
                    <li className="number" key={number}> 
                            <button onClick={()=>paginado(number)}> {number}  </button>   
                    </li>
                ))}
            </ul>
        </nav>
    )

}