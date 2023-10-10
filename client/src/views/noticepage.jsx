// css
import '../components/css/noticepage.css'

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Components
import Footer from './footer'
import Navbar from '../components/navbar';

// Utils
import styled from 'styled-components'

// Hooks
import { useState } from 'react';
import { useFetchPost } from '../hooks/querypost';

const FooterForm = styled.div`
        display : ${props => props.isActive ? 'flex' : 'none'};
        width: 100%;
        height: 100%;
        margin-top: 50px;
        justify-content: center;
        align-items: center;
        grid-template-rows: 4;
        `
const FooterSucces = styled.div`
        display : ${props => props.isActive ? 'none' : 'flex'};
        color: #ffffff;
        font-size: 32px;
        width: 90%;
        height: 50%;
        background-color: #666666;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        position: absolute;
        top: calc(50% - 25%);
        `

export default function Noticepage() {
    // Data to sent
    const [noticeusername, setName] = useState("");
    const [noticeuserlastname, setLastName] = useState("");
    const [noticeusermessage, setMessage] = useState("");
    const [noticeusernote, setNote] = useState("");

    const [isActive, setIsActive] = useState(true);
    // Fetch api
    const { callback: postNotice } = useFetchPost("/noticemessage");


    const handleUnsetInput = () => {
        setName("");
        setLastName("");
        setMessage("");
        setNote("");
    }

    // await for the callback and post the data
    const sendFormFoot = async (e) => {
        e.preventDefault();
        if (noticeusernote > 5 || noticeusernote < 0) {
            toast.warning("La note doit être comprise entre 0 et 5");
            handleUnsetInput();
            return;
        }
        if (noticeuserlastname.length > 50 || noticeusername.length > 50) {
            toast.warning("Le nom et le prénom doivent être compris entre 1 et 50 caractères");
            handleUnsetInput();
            return;
        }
        if (noticeusermessage.length > 250) {
            toast.warning("J'imagine que vous avez beaucoup de choses à dire mais 250 caractères maximum");
            handleUnsetInput();
            return;
        }
        if (noticeuserlastname === "" || noticeusername === "" || noticeusermessage === "" || noticeusernote === "") {
            toast.warning("Veuillez remplir tous les champs");
            handleUnsetInput();
            return;
        }

        await postNotice({
            noticeusername,
            noticeuserlastname,
            noticeusermessage,
            noticeusernote,
        });
        setIsActive(!isActive);
    }

    return (
        <>
            <Navbar />
            <section className='notice-page-section'>
                <div className="circles" />
                <div className="circles" />
                <div className="circles" />

                <FooterSucces isActive={isActive}>
                    <p>Avis envoyé !</p>
                </FooterSucces>
                <FooterForm isActive={isActive}>
                    <form className='form-notice' onSubmit={sendFormFoot}>
                        <div className='perso-info'>
                            <label>
                                <h3 className='label-text'>Prénom</h3>
                                <input className='perso-info-text' type='text' placeholder='Prénom' value={noticeuserlastname} onChange={e => setLastName(e.target.value)} />
                            </label>
                            <label>
                                <h3 className='label-text'>Nom</h3>
                                <input className='perso-info-text' type='text' placeholder='Nom' value={noticeusername} onChange={e => setName(e.target.value)} />
                            </label>
                        </div>
                        <label className='message-box'>
                            <h3 className='label-text'>Message</h3>
                            <textarea className='message' type='text' placeholder='Message' value={noticeusermessage} onChange={e => setMessage(e.target.value)} />
                        </label>

                        <label className='number-box'>
                            <h3 className='label-text'>Note</h3>
                            <input className='number' type='number' placeholder='Note' value={noticeusernote} onChange={e => setNote(e.target.value)} />
                        </label>

                        <button className='form-button' type='submit' >ENVOYER</button>
                    </form>
                </FooterForm>
            </section>

            <footer id='footer'>
                <Footer />
            </footer>
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
    )
}