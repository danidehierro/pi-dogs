import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../../action";
import "./search.css"

export default function Search(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault()
        if(name){
        dispatch(getNameDog(name[0].toUpperCase() + name.slice(1, name.length).toLocaleLowerCase()));}
        setName("");
        document.getElementsByClassName("search2")[0].value= "";
        
    }
    return (
        <div>
            <input
            className="search2"
            type='text'
            placeholder="Search Dog..."
            onChange={(e) => handleInputChange(e)}/>
             
            <button className="btnserch" type='submit' onClick={(e) => handleSubmit(e)}>Search</button>


        </div>


    )
}