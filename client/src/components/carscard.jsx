// Css
import '../components/css/carscard.css'

// Utilites
import { useState, useEffect } from 'react'

export default function Carscard() {

    const getCars = async () => {
        try {
            const response = await fetch("http://localhost:5000/cars");
            const jsonData = await response.json();

            console.log(jsonData)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getCars();
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