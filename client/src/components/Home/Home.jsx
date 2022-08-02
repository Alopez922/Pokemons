import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getPokemons, getPokemonsTypes,filterByTypes, OrderByName, filterByCreated,SearchPokemon  } from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom";

import "./home.css"


export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons) //esto es lo mismo de hacer mapstatetoProps
    const allTypes= useSelector((state)=> state.types)


   // estoy haciendo el paginado aqui
   //     [Estado actual,seteandoestado]
    const [currentPage, setCurrentPage]= useState(1) //definimos estados locales donde le paso estado actual y cual va a ser la pagina actual 
    const [pokemonsPerPage]=useState(12) //estado local donde estan los pokemones por page y empezara en 6
    const indexOfLastPokemon = currentPage * pokemonsPerPage  //6   seteo el index del ultimo pokemon y le digo sobre la pagina actual multiplicar la pagina actual * pokemones por pagina   
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // el indice del ultimo pokemon - pokemones por pagina me va a dar el indice del primer pokemon
    const currentPokemons =  allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon)//

    const [orden,setOrden]=useState("")

    const paginado = (pageNumber)=>{ //esta constante paginado me ayudara con el renderizado
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getPokemons())  //me llena en el estado pokemons con todos los pokemones
        dispatch(getPokemonsTypes())//me llena el estado types con todos los types
        
    },[dispatch])

function handleClick(e){
e.preventDefault();
dispatch(getPokemons())
}
//ESTE HANDLECLICK ME RESETEA LA PAGINA

function handleFilterTypes(e){
    e.preventDefault()
dispatch(filterByTypes(e.target.value))
setCurrentPage(1)
}

function handleFilterCreated(e){
    e.preventDefault()
    dispatch(filterByCreated(e.target.value))
    setCurrentPage(1)
}

function handleSort(e){
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
};



 

    //para traernos del estado los pokemones cuando el componente se monte
    return(
        <div className="Home-container">
           
            
            <h1 className="titulo-Home">Pokemons</h1>
           <SearchBar setCurrentPage ={setCurrentPage} />
           
            <div>
                <select onChange={e => handleSort(e)} >
                    
                    <option value="asc">Ascendente</option> 
                    <option value="desc">Descendente</option>
                </select>

        
                <select onChange={e => handleFilterTypes(e)}>
                    <option value="All">all</option>
                   {
                    allTypes.map((el)=>(
                        <option value={el.name} key={el.id}>{el.name}</option> 
                    ))


                   }
                </select>

                <select onChange={e=>handleFilterCreated(e)}>
                    <option value="All">todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existentes</option>
                </select>
                   

                <Paginado
                pokemonsPerPage={pokemonsPerPage} //props que necesita
                allPokemons={allPokemons.length}  // el paginado para                             
                paginado={paginado}               // funcionar
                />


                

                    <div className="botones"> 
            <button onClick={e=>{handleClick(e)}}>  cargar pokemones     </button>
            <Link to="/create"> 
            <button>
            Crear Pokemon
            </button>
            </Link>
                    </div>



                   
                   <div className="positions">    
                {

                 currentPokemons?.map((el) =>{
                    
                    
                   return(
                    <div key={el.id}> 
                    <Link to={`/pokemons/`+ el.id}>
                    <Card name={el.name}
                    img ={el.img}  
                    types={el.types} 
                    key={el.id} 
                    hp={el.hp} /> 
                    </Link>
                    </div>
                  );
                  
                   
                })}
                 </div>
                
            </div>
        </div>

    )


}