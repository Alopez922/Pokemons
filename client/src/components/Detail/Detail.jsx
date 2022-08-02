import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getDetail} from "../../actions/index"
import { useEffect } from "react";
import "./detail.css"

export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(()=>{
    dispatch(getDetail(props.match.params.id))
    },[])

const myPokemon = useSelector((state)=>state.detail)

return (
    <div className="detail-container"> 
    <div className="detail-card">
        <div>
       
    <div>
        <div>
            <h1>{myPokemon.name}</h1>
            <img src={myPokemon.img} 
            alt="Not Found" />
            <p>Id:{myPokemon.id}</p>
            <div>
                <p>Hp:{myPokemon.hp}</p>
            </div>
            <div>
                <p>Attack:{myPokemon.attack}</p>
            </div>
            <div>
                <p>Defense:{myPokemon.defense}</p>
            </div>
            <div>
                <p>Weight:{myPokemon.weight}</p>
            </div>
            <div>
                <p>Speed:{myPokemon.speed}</p>
            </div>
        </div>
        <Link to="/home">
        <button>Back</button>
        </Link>
    </div>
    </div>
    </div>
    </div>
)
}

