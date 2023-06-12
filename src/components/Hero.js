import React from "react";

const Hero = (props) =>{
    return (
    <div>
        <h1>Hello {props.name} a.k.a {props.hero}</h1>
        <p>{props.children}</p>
    </div>)
}

export default Hero;