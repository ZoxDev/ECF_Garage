// CSS
import './contactcars.css'
import styled from 'styled-components'

// Hook
import { useState } from 'react';
import { useFetchPost } from '../../hooks/querypost';

// Styled div
const MyModal = styled.div`
    display: ${props => props.show ? `block` : `none`};
`
// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Utils
import emailjs from '@emailjs/browser';


export default function Contactcars(props) {
    // Data to sent
    const [caruserlastname, setNom] = useState("");
    const [carusername, setPrenom] = useState("");
    const [carusermail, setMail] = useState("");
    const [carusermessage, setMessage] = useState("");
    const carbrand = props.carName;
    const carmodel = props.carModel;

    const serviceID = import.meta.env.VITE_EMAIL_SERVICE;
    const templateID = import.meta.env.VITE_EMAIL_TEMPLATE;
    const publicKey = import.meta.env.VITE_EMAIL_PUBLIC;

    // Requête 
    const { callback: postMessage } = useFetchPost("/carsmessage")

    const handleUnsetInput = () => {
        setNom("");
        setPrenom("");
        setMail("");
        setMessage("");
    }

    const sendForm = async (e) => {
        e.preventDefault();

        if (carusermail.includes("@") === false || carusermail.includes(".") === false) {
            toast.warning("Veuillez entrer une adresse mail valide");
            handleUnsetInput();
            return;
        }
        if (caruserlastname.length > 50 || carusername.length > 50 || caruserlastname.length < 1 || carusername.length < 1) {
            toast.warning("Le nom et le prénom doivent être compris entre 1 et 50 caractères");
            handleUnsetInput();
            return;
        }
        if (carusermessage.length > 250) {
            toast.warning("J'imagine que vous avez beaucoup de choses à dire mais 250 caractères maximum");
            handleUnsetInput();
            return;
        }
        if (caruserlastname === "" || carusername === "" || carusermail === "" || carusermessage === "") {
            toast.warning("Veuillez remplir tous les champs");
            handleUnsetInput();
            return;
        }

        await postMessage({
            caruserlastname,
            carusername,
            carusermail,
            carusermessage,
            carbrand,
            carmodel
        });

        emailjs.send(serviceID, templateID, {
            carbrand: carbrand,
            carmodel: carmodel,
            carusername: carusername,
            to_email: carusermail,
        }, publicKey);

        toast.success("Réussi ! Votre message a bien été envoyé");
        handleUnsetInput();
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
                    <h3 className='modal-header'>Vous souhaitez en savoir plus sur là {carbrand} {carmodel} ?</h3>
                    <form className='modal-form' onSubmit={sendForm}>
                        <label className='input-text'>
                            <h4 className='name-text'>Nom</h4>
                            <input className='input-style' type='text' placeholder='Nom' defaultValue={caruserlastname} onChange={e => setNom(e.target.value)} />
                        </label>
                        <label className='input-text'>
                            <h4 className='name-text'>Prénom</h4>
                            <input className='input-style' type='text' placeholder='Prénom' value={carusername} onChange={e => setPrenom(e.target.value)} />
                        </label>
                        <label className='input-text'>
                            <h4 className='name-text'>Mail</h4>
                            <input className='input-style' placeholder='Mail' type='text' value={carusermail} onChange={e => setMail(e.target.value)} />
                        </label>
                        <label className='input-text'>
                            <h4 className='name-text'>Message</h4>
                            <textarea className='text-area' placeholder='Votre message' value={carusermessage} onChange={e => setMessage(e.target.value)} />
                        </label>

                        <button className='button-form' type='submit'>ENVOYÉ</button>

                    </form>
                </div>
            </MyModal>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
