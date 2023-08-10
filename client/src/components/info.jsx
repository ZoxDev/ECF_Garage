import { Component } from 'react';
import '../components/css/info.css';
import styled from 'styled-components';
// anime.js or gsap

export default function Info(props) {
    // index props 
    const getText = async () =>{
        
    }

    return (
        <>
        <article className='container'>
        <img className='image' src={props.url} onLoad={getText}/>
            <div className='text-box'>
                {/* Content get table (hard) */}
                <p> 
                    
                </p>
            </div>
        </article>
          
        </>
    )
}