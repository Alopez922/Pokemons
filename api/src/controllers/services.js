const {Pokemon,Type} = require ("../db.js")
const axios = require("axios")


const getApiInfo = async()=>{
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100')
    const pokemoninfo = apiUrl.data.results.map(async(pokemon)=>axios.get(pokemon.url))
    const results = await axios.all(pokemoninfo)
    const pokemon = results.map((el)=>{
        return{
            id: el.data.id,
            name:el.data.name,
            hp: el.data.stats[0].base_stat,
            attack: el.data.stats[1].base_stat,
            defense:el.data.stats[2].base_stat,
            speed: el.data.stats[5].base_stat,
            weight: el.data.weight,
            types: el.data.types.map((e)=>e.type.name),
            img: el.data.sprites.other["dream_world"].front_default,
        }
    })

    return pokemon
}

const DbInfo = async() =>{
    const pokemonDB = await Pokemon.findAll({
        include:{
            model: Type,
            attributes:["name"]
        }
    })

    const pokemonMap = pokemonDB.map((poke)=>{
        return{
            id: poke.dataValues.id,
            name: poke.dataValues.name,
            height: poke.dataValues.height,
            hp: poke.dataValues.hp,
            attack: poke.dataValues.attack,
            defense: poke.dataValues.defense,
            speed: poke.dataValues.speed,
            weight: poke.dataValues.weight,
            types: poke.dataValues.types.map((e)=> e.dataValues.name),
            img: poke.dataValues.img
        }
    })
    return pokemonMap
}

const getAllPokemons = async()=>{
  const  apiInfo = await getApiInfo()
  const  dbInfo = await DbInfo()
  const infoTotal = apiInfo.concat(dbInfo)
  return infoTotal
}

const getSinglePokemon = async(id)=>{
    const resPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = {
        
      id: resPokemon.data.id,
      name: resPokemon.data.name,
      height: resPokemon.data.height,
      hp: resPokemon.data.stats[0].base_stat,
      attack: resPokemon.data.stats[1].base_stat,
      defense: resPokemon.data.stats[2].base_stat,
      speed: resPokemon.data.stats[5].base_stat,
      weight: resPokemon.data.weight,
      types: resPokemon.data.types.map((e) => e.type.name),
      img: resPokemon.data.sprites.other["dream_world"].front_default  
        }
        return pokemon  
    }



const typesToBd = async()=>{
    const respuesta = await axios.get("https://pokeapi.co/api/v2/type")
    const typeInfo = respuesta.data.results.map((type)=>{return {name:type.name}})
    
    const typesfromDb = await Type.findAll()
    if(typesfromDb.length===0){
        await Type.bulkCreate(typeInfo)
    }
}

const pokemonToDb = async(data)=>{
    const {name, height , hp, attack, defense, speed, weight, types, img} = data
    
    const [pokemon, created] = await Pokemon.findOrCreate({
        where:{name}, 
        defaults:{
        height,
        hp, 
        attack, 
        defense, 
        speed, 
        weight, 
        types, 
        img
    }
    })
    if(created){
        const foundTypes = await Type.findAll({
            where:{
                name:types
                // {
                //     [Op.in]:types
                // }
            }
        })

        await pokemon.addTypes(foundTypes)
        return pokemon
    }
    
}   


module.exports ={
getAllPokemons,
getApiInfo,
DbInfo,
typesToBd,
getSinglePokemon,
pokemonToDb,


}

































// esto es de get all pokemons
//   const dbDataTypes = await dbInfo.map((poke)=>{
//     return {
//         id: poke.dataValues.id,
//         name: poke.dataValues.name,
//         height: poke.dataValues.height,
//         hp: poke.dataValues.hp,
//         attack: poke.dataValues.attack,
//         defense: poke.dataValues.defense,
//         speed: poke.dataValues.speed,
//         weight: poke.dataValues.weight,
//         types: poke.dataValues.types.map((e)=> e.dataValues.name),
//         img: poke.dataValues.img
//     }
//   })
//   return [...apiInfo, ...dbDataTypes]
// }

