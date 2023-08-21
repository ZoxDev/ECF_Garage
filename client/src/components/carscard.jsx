// Css
import '../components/css/carscard.css'

// Utilites
import { useState, useEffect } from 'react'
import { useFetch } from './queryget';

export default function Carscard() {

    const [data, loading, error] = useFetch("http://localhost:5000/cars")

    useEffect(() =>{
        console.log(data)
    }, [])



    return (
        <>
            <div className='cards-container'>
                <div className='card-image'>
                    IMAGE
                </div>
                <div className='card-content'>

                </div>
            </div>
        </>
    )
}