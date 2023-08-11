import { Component, useState, useEffect} from 'react';
import '../components/css/info.css';
import styled from 'styled-components';
// anime.js or gsap

export default function Info(props) {
    const [info, setInfo] = useState([]);
    
    const getText = async () =>{
        try {
            const response = await fetch("http://localhost:5000/infos");
            const jsonData = await response.json();

            setInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getText();
    }, [])

    // Get the id of the to select the good index of arry then in return get his infotext
    // Bug return 3 times the info
    const id = (info[props.infid]);
   
    return (
        <>
        <article className='container'>
        <img className='image' src={props.url}/>
            <div className='text-box'>
                {info.map(info => 
                    <p className='textinfo'>{id.infotext}</p>
                )}
            </div>
        </article>
        </>
    )
}