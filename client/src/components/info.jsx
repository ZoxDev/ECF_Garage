// Eslint problems
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { useState, useEffect} from 'react';
import '../components/css/info.css';
// anime.js or gsap

export default function Info(props) {
    // Get info in an array 
    const [info, setInfo] = useState([]);
    
    // Request
    const getText = async () =>{
        try {
            const response = await fetch("http://localhost:5000/infos");
            const jsonData = await response.json();
            console.log(jsonData);
            setInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    // Request do once
    useEffect(() => {
        getText();
        }, [])


    // Get the id of the to select the good index of arry then in return get his infotext
    const selectedInfo = info[props.infid];
    const infotext = selectedInfo ? selectedInfo.infotext : "";
    const infotitle = selectedInfo ? selectedInfo.infotitle : "";
   
    return (
        <>
        <article className='container'>
        <img className='image' src={props.url} />
            
            <div className='text-box'>     
            <h1>{infotitle}</h1>     
                    <p className='textinfo'>{infotext}</p>         
            </div>
        </article>
        </>
    )
}