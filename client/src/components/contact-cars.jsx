// CSS
import '../components/css/contactcars.css'
import styled from 'styled-components'

// Hook
import { useState } from 'react';
import { useFetchPost } from '../hooks/querypost';

// Styled div
const MyModal = styled.div`
    display: ${props => props.show ? `block` : `none`};
`

export default function Contactcars(props) {
    // Data to sent
    const [caruserlastname, setNom] = useState("");
    const [carusername, setPrenom] = useState("");
    const [carusermail, setMail] = useState("");
    const [carusermessage, setMessage] = useState("");

    // Requête 
    const { callback: postMessage } = useFetchPost("http://localhost:5000/carsmessage")
    const sendForm = async (e) => {
        e.preventDefault();
        await postMessage({
            caruserlastname,
            carusername,
            carusermail,
            carusermessage,
        });
    }

    // Modal
    const [showModal, setModal] = useState(false);

    const toogleModal = () => {
        setModal(!showModal);
    }

    return (
        <>
            <div className='btn' onClick={toogleModal}>
                CONTACTEZ
            </div>
            <MyModal show={showModal}>
                <div className='modal'>
                    <span onClick={toogleModal} className='btn-close'><svg width="20" height="20" viewBox="0 0 117 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M108.533 9.31885L8.68677 109.165" stroke="black" strokeWidth="16.641" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.68677 9.31885L108.533 109.165" stroke="black" strokeWidth="16.641" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    </span>
                    <div className='modal-header'>
                        <h3>Vous souhaitez en savoir plus sur là {props.carName} ?</h3>
                    </div>
                    <form className='modal-form' onSubmit={sendForm}>
                        <div className='input-text'>
                            <h4 className='name-text'>Nom</h4>
                            <input className='input-style' type='text' placeholder='Nom' defaultValue={caruserlastname} onChange={e => setNom(e.target.value)} />
                        </div>
                        <div className='input-text'>
                            <h4 className='name-text'>Prénom</h4>
                            <input className='input-style' type='text' placeholder='Prénom' value={carusername} onChange={e => setPrenom(e.target.value)} />
                        </div>
                        <div className='input-text'>
                            <h4 className='name-text'>Mail</h4>
                            <input className='input-style' placeholder='Mail' type='text' value={carusermail} onChange={e => setMail(e.target.value)} />
                        </div>
                        <div>
                            <textarea className='text-area' placeholder='Votre message' value={carusermessage} onChange={e => setMessage(e.target.value)} />
                        </div>

                        <button className='button-form' type='submit'>ENVOYÉ</button>

                    </form>
                </div>
            </MyModal>
        </>
    );
}
