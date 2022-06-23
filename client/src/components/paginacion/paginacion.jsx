import React from 'react';
import './paginacion.css'

export default function Paginacion({dogPerPage, allDogs,paginacion}){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allDogs/dogPerPage); i++){
        pageNumbers.push(i);
    }


    return (
        <nav>
                <ul className='pagin'>
                        {pageNumbers && pageNumbers.map(number =>(
                            <li className='number2' key={number}>
                            <button className='number' onClick={() => paginacion(number) }> {number}
                            </button>
                            
                            </li>
                        ))}



                </ul>






        </nav>
        
    )

}