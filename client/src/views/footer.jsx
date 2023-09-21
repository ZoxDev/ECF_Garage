// CSS
import '../components/css/footer.css'
import '../../src/index.css'

// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component
import Schedule from '../components/schedule';

// Utils
import { styled } from 'styled-components';

// Hook
import { useState, useEffect } from 'react';
import { useFetchPost } from '../hooks/querypost';

const FooterForm = styled.div`
        display : ${props => props.isActive ? 'flex' : 'none'};
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row: 2;
        `
const FooterSucces = styled.div`
        display : ${props => props.isActive ? 'none' : 'flex'};
        color: green;
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row: 2;
        font-size: 42px;
        justify-content: center;
        align-items: center;
        width: 750px;
        height: 450px;
        `

export default function Footer() {
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
        if (noticeuserlastname.length < 50 || noticeusername.length > 50) {
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
            noticeusernote
        });

        setIsActive(!isActive);
    }

    return (
        <>
            <footer id='foot' className='foot'>

                <p className="text-footer pres-text">BESOIN D'INFORMATIONS COMPLÉMENTAIRES<br />TOUT EST LÀ !</p>
                <a href='/avis' className='button-footer'>UN AVIS ?</a>

                <FooterSucces isActive={isActive}>
                    <p>Avis envoyé !</p>
                </FooterSucces>
                <FooterForm isActive={isActive}>
                    <form className='notice-form' onSubmit={sendFormFoot}>
                        <div className='form-container'>
                            <h1 className='notice-hone'>Un avis ?</h1>
                            <div className='form-user-info'>
                                <input className='form-user-info-box' type='text' placeholder='Prénom' value={noticeuserlastname} onChange={e => setLastName(e.target.value)} />
                                <input className='form-user-info-box' type='text' placeholder='Nom' value={noticeusername} onChange={e => setName(e.target.value)} />
                            </div>
                            <textarea className='form-message' type='text' placeholder='Message' value={noticeusermessage} onChange={e => setMessage(e.target.value)} />
                            <input className='form-user-note' type='number' placeholder='Note' value={noticeusernote} onChange={e => setNote(e.target.value)} />
                            <button type='submit' className='form-button'>ENVOYÉ</button>
                        </div>
                    </form>
                </FooterForm>


                <div className='schedule'>
                    <table className="table-style text-white">
                        <thead>
                            <tr>
                                <th>Jours</th>
                                <th>Matinée</th>
                                <th>Après-midi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* In function of the name of day (todolater) */}
                            <Schedule dayid={"Lundi"} />
                            <Schedule dayid={"Mardi"} />
                            <Schedule dayid={"Mercredi"} />
                            <Schedule dayid={"Jeudi"} />
                            <Schedule dayid={"Vendredi"} />
                            <Schedule dayid={"Samedi"} />
                        </tbody>
                    </table>
                </div>
                {/* See how to render a map */}
                <p className='text-footer credits-text'>Made by : ZoxxxDev</p>
                <div className='footer-links'>
                    <a href='' className='footer-link'>Se connecter</a>
                    <a href='#second' className='footer-link'>Nos services</a>
                    <a href='/ventes' className='footer-link'>Ventes</a>
                </div>
                <p className='text-footer copy-text'>© GarageVParrot / All Rights Reserved</p>
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
            </footer>
        </>
    );
}