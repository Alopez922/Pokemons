const {Type} = require("../db.js")
const {typesToBd} = require("./services.js")

const getTypes = async(req,res)=>{
    await typesToBd()
    let types = await Type.findAll()
    
    // parse types to be an array of objects with name property
    types = types.map((type)=>type.toJSON())

    const response = types.map((type)=>{
        return{
            id:type.id,
            name:type.name
        }
    })
    res.send(response)
}

module.exports = {
    getTypes
}