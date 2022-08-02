const { Router } = require('express');
const {getPokemon,singlePokemon,postPokemon} = require("../controllers/pokemons");
const {getTypes}= require("../controllers/types")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons",getPokemon)
router.get("/types", getTypes)
router.get("/pokemons/:id",singlePokemon)
router.post("/pokemons", postPokemon)
module.exports = router;
