import React , { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { postDog , getTemperament} from '../../action/index';
import { Link } from 'react-router-dom';
import './createDog.css'
/* import  validate  from './validations'; */

export default function Create() {

    const dispatch = useDispatch();
    let t = useSelector(state => state.temperaments)

    const [input,setInput] = useState({
        name: '',
        minWeight: '',
        maxWeight: '',
        minHeight: '',
        maxHeight: '',
        minAge: '',
        maxAge: '',
        img: '',
        temperament: []
    })
    
    const [errors,setErrors] = useState({});

    useEffect(()=>{
        dispatch(getTemperament())
    }, [dispatch])

    const handleChange = function (e){
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
      let validate = (value) => {
        let errors = {}
        if(value.name){
            if(!/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(value.name)){
                errors.name = 'Name cannot contain numbers or special characters.';
                console.log(errors)
            }
            else errors.name = '';
        }
        else errors.name = 'Name is required.';
    
        if(parseInt(value.minWeight) && parseInt(value.maxWeight)){
            if(parseInt(value.minWeight) <= 0 || parseInt(value.maxWeight) <= 0){
                errors.weight= 'Weight cannot be negative or zero.'
            }
            else if(parseInt(value.minWeight) > parseInt(value.maxWeight)){
                errors.weight= 'Minimum weight cannot be greater than maximum weight.'
            }
             else if(parseInt(value.minWeight) > 120 || parseInt(value.maxWeight) > 120){
               errors.weight= 'weight cannot be greater than 120'
             }
            else errors.weight = '';
        }
        else errors.weight = 'Weight is required.';
    
        if(parseInt(value.minHeight) && parseInt(value.maxHeight)){
            if(parseInt(value.minHeight) <= 0 || parseInt(value.maxHeight) <= 0){
                errors.height= 'Height cannot be negative or zero.'
            }
            else if(parseInt(value.minHeight) > parseInt(value.maxHeight)){
                errors.height= 'Minimum height cannot be greater than maximum height.'
            }
            else if(parseInt(value.minHeight) > 120 || parseInt(value.maxHeight) > 120){
                errors.height= 'height cannot be greater than 120'
            }
            else errors.height = '';
        }
        else errors.height = 'Height is required.';
    
        if(parseInt(value.minAge) && parseInt(value.maxAge)){
            if(parseInt(value.minAge) <= 0 || parseInt(value.maxAge) <= 0){
                errors.age= 'Age cannot be negative or zero.'
            }
            else if(parseInt(value.minAge) > parseInt(value.maxAge)){
                errors.age= 'Minimum age cannot be greater than maximum age.'
            }
            else if(parseInt(value.minAge) > 35 || parseInt(value.maxAge) > 35){
                errors.height= 'Age cannot be greater than 35'
             }
            else errors.age = '';
        }
        else errors.age = 'Age is required.';
    
        if(/^(ftp|http|https):\/\/[^ "]+$/.test(value.img)){
            errors.img = '';
        }else errors.img = 'Must have a valid link image.'
    
        return errors;
    }

      setErrors(validate({ 
          ...input,
          [e.target.name]: e.target.value
        }))
    }

    const hadleChangeTemp = function(e){
        e.preventDefault();
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        });
    }

    function handleDelete(e) {
        e.preventDefault();
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== e.target.value)
        })
    };

    let id = 0
    function addKey(){
        return id++
    }
  
    function handleSubmit(e) {
        
        let completeheight = [input.minHeight, input.maxHeight];
    completeheight = completeheight.join(" - ");

    let completeweight = [input.minWeight, input.maxWeight];
    completeweight = completeweight.join(" - ");

    let completeyears = [input.minAge, input.maxAge];
    completeyears = completeyears.join(" - ");
    completeyears = completeyears + " years ";
    let addDog = {
        name: input.name[0].toUpperCase() + input.name.slice(1, input.name.length).toLocaleLowerCase(),
        img: input.img,
        temperament: input.temperament,
        height: completeheight,
        weight: completeweight,
        age: completeyears,
      };
      e.preventDefault();
      if(input.name && input.img && completeheight &&  completeweight &&
          completeyears && input.temperament.length > 0){
        dispatch(postDog(addDog))
        alert("Breed was created successfully");

        setInput({
            name: '',
            minWeight: '',
            maxWeight: '',
            minHeight: '',
            maxHeight: '',
            minAge: '',
            maxAge: '',
            img: '',
            temperament: []
        });

        }else{
            (alert('Must fill all the inputs.'));
        }
    }

    return (
        <div className='containe'>
        <div className='containerdogs'>
          <form id="breedForm" className='divForm' onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input name='name' value={input.name} onChange={handleChange} />
                {errors.name && (<p className='danger'>{errors.name}</p>)}
            </div>
            <div>
                <p>Weight(1 to 120Kg):</p>
                <label>Min: </label>
                <input type="number" name='minWeight' max="120" value={input.minWeight} onChange={handleChange}  />
                <label>Max: </label>
                <input type="number" name='maxWeight' max="120" value={input.maxWeight} onChange={handleChange} />
                {errors.weight && (<p className='danger'>{errors.weight}</p>)}
            </div>
            <div>
                <p>Height(1 to 120Cm):</p>
                <label>Min: </label>
                <input type="number" name='minHeight' max="120" value={input.minHeight} onChange={handleChange} />
                <label>Max: </label>
                <input type="number" name='maxHeight' max="120" value={input.maxHeight} onChange={handleChange} />
                {errors.height && (<p className='danger'>{errors.height}</p>)}
            </div>
            <div>
                <p>Age(1 to 35years): </p>
                <label>Min: </label>
                <input type='number' name='minAge' max='35' value={input.minAge} onChange={handleChange} />
                <label>Max: </label>
                <input type='number' name='maxAge' max='35' value={input.maxAge} onChange={handleChange} />
                {errors.age && (<p className='danger'>{errors.age}</p>)}
            </div>
            <div>
                <label>Image url: </label>
                <input type='text' name='img' placeholder='Paste your image link...' value={input.img} onChange={handleChange} />
                {errors.img && (<p className='danger'>{errors.img}</p>)}
            </div>
            <div>
                <label>Temperaments:  </label>
                    <select onChange={hadleChangeTemp} className='tempSelect'>
                        {t && t.map((t) => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                    </select>
            </div>

            <div>
                {input.temperament.map(e => (
                    <div  key={addKey()}>
                        <p>{e}</p>
                        <button className='delete' onClick={handleDelete} value={e}>X</button>
                    </div>
                ))}
            </div>
            <div>
                <button type='submit'>Create Dog</button> 
            </div>
          </form>
          <Link to= '/home'>
            <button className="btndet"> go Back</button>
        </Link>
        </div>
        </div>
    );
}

