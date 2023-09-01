

import { useState, useEffect } from 'react';
import styled from 'styled-components'
import '../components/css/info.css';
// anime.js or gsap

export default function Info(props) {
    // Get info in an array 
    const [info, setInfo] = useState([]);
    const [modal, setModal] = useState(false);

    // Request
    const getText = async () => {
        try {
            const response = await fetch("http://localhost:5000/infos");
            const jsonData = await response.json();

            setInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    // Request do once
    useEffect(() => {
        getText();
    }, [])

    // Modal
    const clickModal = () => {
        setModal(!modal);
    }
    
    const TextModal = styled.div`
    display: ${modal ? `block` : `none`};
    `

    // Get the id of the to select the good index of arry then in return get his infotext
    const selectedInfo = info[props.infid];
    const infotext = selectedInfo ? selectedInfo.infotext : "";
    const infotitle = selectedInfo ? selectedInfo.infotitle : "";

    return (
        <>
            <article className='container' onClick={clickModal}>
                <img className='image' alt={props.url} src={props.url}/>
                <div className='text-box'>
                        <h1>{infotitle}</h1>
                </div>
            </article>

            <TextModal>
                <div className='modal-info'>
                    <p className='modal-info-text'>{infotext}</p>
                </div>
            </TextModal>
        </>
    )
}