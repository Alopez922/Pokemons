import {useState} from "react"
import {useDispatch} from "react-redux"
import React from "react"
import { SearchPokemon } from "../../actions"
import "./search.css"

export default function SearchBar({setCurrentPage}){ //aca le paso el estado que estoy usando en el home
                                                    //no sabia como se hacia esto me lo enseñaron en el grupo
   
const dispatch = useDispatch()
const [name, setName]= useState("")


function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    
}


function handleSubmit(e){
    e.preventDefault()
    dispatch(SearchPokemon(name))
    setName("")
    setCurrentPage(1)
}
return(
    <div className="search-container">
        <div className="search-box">  
        <input  value={name} type="text"  placeholder="Buscar..." onChange={(e)=>handleInputChange(e)}/>
        <button type ="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button>
    </div>
    </div>
    
)

}






// import { useState } from 'react'
// import PropTypes from 'prop-types'


// export default function SearchBar ({ onSearch }) {
//   SearchBar.propTypes = {
//     onSearch: PropTypes.func
//   }
//   // pasar al onSearch el local state
//   const [pokemonSearch, setSearchPokemon] = useState('')
//   // disable-eslint-next-line-no-unused-vars
//   const handleSearchPokemon = (e) => {
//     setSearchPokemon(e.target.value)
//   }
//   function handleSubmit (e) {
//     e.preventDefault()
//     onSearch(pokemonSearch)
//     setSearchPokemon('')
//   }

//   return (
//     <div>
   

//     <button onClick={handleSubmit} >Buscar</button>
//     <input type="text" value={pokemonSearch} onChange={handleSearchPokemon}  placeholder="Type to Search..."></input>

//   </div>
 
//   )
// }

