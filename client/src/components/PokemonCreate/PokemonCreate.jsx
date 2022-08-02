import React, { useState, useEffect} from "react";
import { Link, useHistory} from "react-router-dom";
import { postPokemon, getPokemonsTypes } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./pokemoncreate.css"

function validate(input){
  const errors ={}
  let regexName = new RegExp("^[a-zA-Z]{2,30}$");
  let regexNum = new RegExp("^[1-9]+$")
  let regexImg = new RegExp("^(jpg|gif|png|jpg|svg)$")

  if(!input.name){
    errors.name = "Name is required";
  }else if(!regexName.test(input.name)){
    errors.name ="Name is invalid"
   }else if (!input.hp ){
  errors.name = "Se require un valor para Hp"
   }else if(!regexNum.test(input.hp)){
    errors.name = "Solo numeros positivos para Hp"
  }else if (!input.attack){
  errors.name = "Se require un valor para attack"
}else if(!regexNum.test(input.attack)){
  errors.name = "Solo numeros positivos para attack"
}else if (!input.defense){
  errors.name = "Se require un valor para defense"
}else if(!regexNum.test(input.defense)){
  errors.name = "Solo numeros positivos para defense"
}else if (!input.speed){
  errors.name = "Se require un valor para Speed"
}else if(!regexNum.test(input.speed)){
  errors.name = "Solo numeros positivos para speed"
}else if (!input.weight){
  errors.name = "Se require un valor para Weight"
}else if(!regexNum.test(input.weight)){
  errors.name = "Solo numeros positivos para weight"
}else if(!input.img){
  errors.name ="se require una imagen" 
}else if(input.types.length ===0){
  errors.types = "Se require un tipo"
}
return errors;
}


export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory()
  const types = useSelector((state) => state.types);
  const [input, setInput] = useState({
    name:"",
    hp:"",
    attack:"",
    defense:"",
    speed:"",
    weight:"",
    height:"",
    types: [],
    img:"",
  });
  
  
  const [errors,setErrors] = useState({});


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value,
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    console.log(input)
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types:[...new Set([...input.types, e.target.value])]
    });
  }

  function handleDelete(el){
    setInput({
      ...input,
      types: input.types.filter(types =>types !== el)
    })
  }



  function handleSubmit(e){
      e.preventDefault()
      dispatch(postPokemon(input))

       alert("POKEMON CREADO!!")

    setInput({
      name:"",
      hp:"",
      attack:"",
      defense:"",
      speed:"",
      weight:"",
      height:"",
      types: [],
      img:"",
    })
   
    //el history push estaba puesto aca
    history.push("/home")
  }

const [disableButton,setDisableButton] =useState(true)

  useEffect(() => {
    dispatch(getPokemonsTypes());
    if(input.name ==="" || 
    /[1-9]/.test(input.name)||
    /[\s]/.test(input.name)||
    /[^\w\s]/.test(input.name)|| 
    input.types.length < 1 ||
    input.hp.length < 1 ||
    input.attack.length < 1 ||
    input.defense.length < 1 ||
    input.weight.length < 1 ||
    input.height.length < 1   

    ){
      setDisableButton(true)
    }else{
      setDisableButton(false);
    }
    
  }, [errors,input,setDisableButton]);



  return (
    <div className="contenedor"> 
    <div className="fondoCreate">
      <form onSubmit={(e)=>handleSubmit()}  className="form">
      <h1>crea tu Pokemon</h1>
        <div>
          <label>Nombre:</label>
          <input
            className={errors.name && "danger"}
            type="text"
            defaultValue={input.name}
            name="name"
            onChange={handleChange}
          />

        </div>

        <div>
          <label>Hp:</label>
          <input
            className={errors.hp && "danger"}
            type="number"
            min="1"
            // max="10000"
            defaultValue={input.hp}
            name="hp"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Attack:</label>
          <input
            className={errors.attack && "danger"}
            type="number"
            min="1"
            defaultValue={input.attack}
            name="attack"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Defense:</label>
          <input
            className={errors.defense && "danger"}
            type="number"
            min="1"
            defaultValue={input.defense}
            onChange={handleChange}
            name="defense"
          />
        </div>

        <div>
          <label>Speed:</label>
          <input
            className={errors.speed && "danger"}
            type="number"
            defaultValue={input.speed}
            name="speed"
            min="1"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Weight:</label>
          <input
            className={errors.weight && "danger"}
            type="number"
            defaultValue={input.weight}
            name="weight"
            min="1"
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Height:</label>
          <input
            className={errors.height && "danger"}
            type="number"
            defaultValue={input.height}
            name="height"
            min="1"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>img:</label>
          <input 
          className={errors.img && "danger"} 
          type="text" 
          defaultValue={input.img} 
          name="img" 
          onChange={handleChange} />
        </div>
        {/* {errors.name?<h4><small>{errors.name}</small></h4>:false} */}

      
      <select  name ="types" onChange={(e) => handleSelect(e)} >
          {types.map((el) => (
            <option  className="optionType" value={el.name} key={el.id}>{el.name}</option>
          ))}


        </select>
       
      
        {input.types.map(el=>
          
          <div className="cajita-type" key={el}>
            {el} 
          <button type="button" className="button-cajita" onClick={()=>handleDelete(el)}>X</button>
         
         </div>
         )}
         
       
             
     
        {errors.name &&(
            <p>{errors.name}</p>
          )}
       
        <div className="botones-ordenados">  
        <button type="submit" onClick={(e)=>handleSubmit(e)} disabled={disableButton}>Crear personaje </button>
        <Link to="/home">
        <button>Go Back</button>
      </Link>
      </div>
      </form>
      
            
      </div>
    </div>
  );
}
















// voy por una hora de los videos de selene del jueves
{/* <select  name ="types" onChange={(e) => handleSelect(e)} >
          {types.map((el) => (
          // <div key={el.id}> 
            <option  className="optionType" value={el.name} key={el.id}>{el.name}</option>
            // </div>
          ))}


        </select>
       
       
        { input.types.map(el=>
         <p> {el} </p>
         )}
       
             
     
        {errors.name &&(
            <p>{errors.name}</p>
          )} */}