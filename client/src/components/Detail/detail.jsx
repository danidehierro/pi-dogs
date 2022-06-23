import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../action";
import { useEffect } from "react";
import './detail.css'


export default function Detail(props){
  const dispatch = useDispatch();
  const id = props.match.params.id;
  var dog = useSelector((state) => state.Detail)
  console.log("soy detail estado",dog)


  
 
  useEffect(() => {
    dispatch(getDetail(id));
  
  }, [dispatch, id]);
 

  console.log("soy el detalle",dog)
  return (
      <div className="detailContainer">
         {dog && dog.id == id ?  (
         <div className="detail">
             <img className="imgdetail" src={dog.img} alt= 'not found'/>
            <h1>{dog.name}</h1>
            <h2>{dog.temperament}</h2>
            <h2>{dog.age}</h2>
            <h2>{dog.weight}</h2>
             <h2>{dog.height}</h2>
         <Link to= '/home'>
            <button className="btndet"> go Back</button>
        </Link>

      </div>): 
      <div>
             
            <img src="https://i.stack.imgur.com/hzk6C.gif" alt="#" width={"400vh"} height={"300vh"} />
            <Link to= '/home'>
            <button className="btndet"> go Back</button>
        </Link>
      
      </div> 
      } 
  </div>
  )
    }