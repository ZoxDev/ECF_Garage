import { useFetch } from '../hooks/useFetch';
import Loading from '../components/loading';
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import '../components/css/info.css';
// anime.js or gsap

const TextModal = styled.div`
display: ${props => props.isOpen ? `active` : `none`};
`

export default function Info(props) {
    // Get info in an array 
    const [info, setInfo] = useState([]);
    const [modal, setModal] = useState(false);

    // Request
    const [data, loading, error] = useFetch("/infos");
    useEffect(() => {
        setInfo(data)
    }, [data])


    if (loading) {
        <Loading></Loading>
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    // Modal
    const clickModal = () => {
        setModal(!modal);
    }


    // Get the id of the to select the good index of arry then in return get his infotext
    const selectedInfo = info.find((element) => element.infoid == props.infid);
    const infotext = selectedInfo ? selectedInfo.infotext : "";
    const infotitle = selectedInfo ? selectedInfo.infotitle : "";

    return (
        <>
            <article className='container' >
                <img className='image' alt={props.url} src={props.url} />
                <div className='text-box'>
                    <h1>{infotitle}</h1>
                </div>
                <button className='about-btn' onClick={clickModal}>EN SAVOIR PLUS</button>
            </article>

            <TextModal isOpen={modal}>
                <div className='modal-info'>
                    <button onClick={clickModal}> <svg width="20" height="20" viewBox="0 0 117 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M108.533 9.31885L8.68677 109.165" stroke="black" strokeWidth="16.641" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.68677 9.31885L108.533 109.165" stroke="black" strokeWidth="16.641" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> </button>
                    <div className='modal-info-container'>
                        <img className='image-modal' alt={props.url} src={props.url} />
                        <p className='modal-info-text'>{infotext}</p>
                    </div>
                </div>
            </TextModal>
        </>
    )
}