// css
import '../components/css/noticepage.css'


// Components
import Footer from './footer'
import Navbar from '../components/navbar';

// Hook
import { useState } from 'react';
import { useFetchPost } from '../hooks/querypost';

export default function Noticepage() {
    // Data to sent
    const [noticeusername, setName] = useState("");
    const [noticeuserlastname, setLastName] = useState("");
    const [noticeusermessage, setMessage] = useState("");
    const [noticeusernote, setNote] = useState("");

    // Fetch api
    const { callback: postNotice } = useFetchPost("http://localhost:5000/noticemessage");

    // await for the callback and post the data
    const sendFormFoot = async (e) => {
        e.preventDefault();
        await postNotice({
            noticeusername,
            noticeuserlastname,
            noticeusermessage,
            noticeusernote,
        });
    }

    return (
        <>
            <Navbar/>

            <section className='notice-page-section'>
                <div className="circles" />
                <div className="circles" />
                <div className="circles" />
                <h3>Un avis ?</h3>
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
                    

                    <button className='form-button' type='submit' >ENVOYÉ</button>
                </form>
            </section>

            <Footer></Footer>
        </>
    )
}