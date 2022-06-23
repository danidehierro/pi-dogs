import React from "react";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByTemp, getDogs, getTemperament, filterCreated,orderName, orderWeight } from "../../action";
import Card from "../Card/card";
import Search from "../Search/search";
import Paginacion from "../paginacion/paginacion";



export default function Home (){
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.Dogs)
    const temperament = useSelector((state) => state.temperaments)
   
    const [orden,setOrden]= useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [dogPerPage] = useState(9)
    const indexOfLastDog = currentPage * dogPerPage // 6
    const indexOfFirstDog = indexOfLastDog - dogPerPage // 0
    const currentDog = allDogs?allDogs.slice(indexOfFirstDog, indexOfLastDog ):false
    
    const paginacion =(pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
      dispatch(getDogs())
    },[dispatch])
   
     useEffect (() => {
        dispatch(getTemperament())
     },[dispatch])

     function handleFilterTemperament(e){
        dispatch(filterByTemp(e.target.value))
        
        
    }
    function handleSort (e){
        e.preventDefault();
        dispatch(orderName(e.target.value))
        setCurrentPage(1);
        setOrden(`orden ${e.target.value}`);
    }
    function handleSort2 (e){
        e.preventDefault();
        dispatch(orderWeight(e.target.value))
        setCurrentPage(1);
        setOrden(`orden ${e.target.value}`);
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    }

    return (
        <div className="navcontainer">
    
      <Link to= '/create'>
          <button className="my_button">Create</button>
      </Link>
      <Link  to= '/'>
      <button className="my_button"> start over </button>
      </Link>
        <div>
            <div className="search">
            <select className="abc" onChange={e => handleSort(e)}>
               <option value= 'asc'> A to Z  </option>
               <option value= 'des'> Z to A </option>
               <option value= 'low'> For Low weight </option>
               <option value= 'high'> BY High weight </option>
               </select>
               <select className="abc" onChange={e => handleFilterCreated(e)}>
                <option value= 'All'> All Dogs </option>
                <option value= 'api'> Existing </option>
                <option value= 'created'> Created  </option>
               </select>
                 
                 <select className="abc" onChange={e => handleFilterTemperament(e) }>
                 <option value='All'>All</option>
                 {temperament?.map((el,index) => {
                     return(
                         <option key={index} value={el.name}>{el.name}</option>
                     )
                 })}
                 </select>
    
               <Search/>
               </div>
               
            </div>
            <Paginacion 
            dogPerPage= {dogPerPage}
            allDogs={allDogs.length}
            paginacion={paginacion}/>
                {console.log(allDogs)}
               <div className="container">
              {
             
    
         currentDog?  currentDog.map((el , index) => {
                        return(
                            
                            <div className="cardContainer" key={index}>
                               <Link className="linkGames" to={`/detail/${el.id}`}>
                                <Card 
                                id={el.id}
                                name={el.name}
                                img={el.img}
                                weight={el.weight}
                                temperament={el.temperament}
                                />
                             
                        </Link>
                           </div>    
                        
                        );
    
                    }): <div> 
                    <img src="https://i.stack.imgur.com/hzk6C.gif" alt="#" width={"400vh"} height={"300vh"} /></div>
                       
    
                
                }
                    </div>
    
            </div>
            
        
        
        )}

