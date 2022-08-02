import React from "react"
import {Link} from "react-router-dom"
import "./landingPage.css"

export default function LandingPage(){
    return (
        <div className="background">
            
            <Link to = "/home">
                <button className="button">Home</button>
            </Link>
        </div>
    )
}