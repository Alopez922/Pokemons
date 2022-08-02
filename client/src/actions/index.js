import axios from "axios";

export function getPokemons(){
    return async function(dispatch){
    var json = await axios.get("http://localhost:3001/pokemons",{

    });
    return dispatch({
        type:"GET_POKEMONS",
        payload:json.data
    })
}
}

export function getPokemonsTypes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/types');

        dispatch({
            type:"GET_POKEMONS_TYPES",
            payload: json.data
        })
    }
}




export function filterByTypes(payload){
    

    return{
        type:"FILTER_BY_TYPES",
        payload:payload
    }
}

export function filterByCreated(payload){
    return{
        type:"FILTER_BY_CREATED",
        payload
    }

}


export function OrderByName(payload){
    return{
        type:"ORDER_BY_NAME",
        payload
    }
}

export function SearchPokemon(payload){
    return{
        type:"SEARCH_POKEMON",
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
        return dispatch({
            type: "GET_DETAIL",
            payload: json.data
        })
    }
}



export function postPokemon(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/pokemons",payload);
        console.log(response)
        return response;
    }
}

