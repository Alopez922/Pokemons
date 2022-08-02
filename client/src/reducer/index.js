//en el reducer lo primero que se crea es el estado inicial

//en este caso empezamos declarando el estado inicial pokemons
const initialState= {
    pokemons:[],
    types:[],
    allPokemons:[],
    detail:[]
    
    
}

function rootReducer(state = initialState, action){
 switch(action.type){
    case "GET_POKEMONS":
    return {
        ...state,
        pokemons: action.payload,
        allPokemons:action.payload
        
    }

    case "GET_POKEMONS_TYPES":
    return {
        ...state,
        types: action.payload
    }

     case "FILTER_BY_TYPES":
            
          
        return {
            ...state,
            pokemons:state.allPokemons.filter(function (el) {
                
                if(action.payload ==="All"){
                    return state.allPokemons
                }
                else if (el.types.length === 1) {
                    return el.types[0].includes(action.payload)
                } else if (el.types.length === 2) {
                    return el.types[0].includes(action.payload) || el.types[1].includes(action.payload)
                } else {
                
                }
            })
        }
     case "ORDER_BY_NAME":
        let sortedArr = action.payload === "asc"?
        state.pokemons.sort(function(a, b){
            if(a.name >b.name){
                return 1;
            }
            if(b.name >a.name){
                return -1;
            }
            return 0;
        }):
        state.pokemons.sort((a, b) => {
            if (a.name > b.name) {
                return -1
            }
            if (b.name > a.name) {
                return 1
            }
        })
        return{
           ...state,
           pokemons: sortedArr
        }
   //este no me funciona mañana lo reviso
    
      case "FILTER_BY_CREATED":
        return{
             ...state,
            pokemons: state.allPokemons.filter((el) => {
                if (action.payload === "All") {
                    return state.allPokemons
                } else if (action.payload === "created" && typeof el.id === "string") {
                    return el.id
                } else if (action.payload === "api" && typeof el.id === "number") {
                    return el.id
                }

            })
        }

      case "SEARCH_POKEMON":
        return{
            ...state,
            pokemons: state.allPokemons.filter((poke)=>poke.name.toLowerCase().includes(action.payload.toLowerCase()))
        }

        case "POST_POKEMON":
            return{
                ...state,
            }

        case "GET_DETAIL":
            return{
                ...state,
                detail:action.payload
            }

       

    default:  return state;
 } 

}

export default rootReducer;