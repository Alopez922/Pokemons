const {getAllPokemons,getApiInfo,DbInfo, getSinglePokemon, pokemonToDb } = require("./services.js")

const getPokemon = async(req,res)=>{
    const {name} = req.query
    const buscarPokemon = await getAllPokemons()

    if(name && buscarPokemon){
        const pokemonFound = await buscarPokemon.find(el => el.name === name)
        return pokemonFound? res.send(pokemonFound):res.status(404).send("Pokemon Not Found")
    }
    res.status(200).json(buscarPokemon)
    

}

const singlePokemon = async(req,res)=>{
    const {id}= req.params
    if(id.length<=3){
        const found = await getSinglePokemon(id)
        return res.send(found)
    
    }

    const dbPokemon = await DbInfo()
    const singlePokemon = dbPokemon.find((poke)=>poke.id ===id)
    
    if(!singlePokemon){
        return res.status(404).send("Pokemon not found")
    }

    return res.send(singlePokemon)   
}


const postPokemon = async(req,res)=>{
    const foundOrCreated = await pokemonToDb(req.body)
    if(!foundOrCreated){
        return res.status(400).send({message:"Pokemon already exists"})
    }
        return res.status(201).send({message:"Pokemon Created"})
}

module.exports = {getPokemon,singlePokemon,postPokemon}

