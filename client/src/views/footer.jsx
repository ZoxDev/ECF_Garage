// CSS
import '../components/css/footer.css'
import '../../src/index.css'

// Component
import Schedule from '../components/schedule';

// Hook
import { useState } from 'react';
import { useFetchPost } from '../components/querypost';


export default function Footer() {
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

            <footer id='foot' className='foot'>
                <p className="text-footer pres-text">VOUS VOULEZ SAVOIR OU ON EST ? NOUS LAISSE UN AVIS ?<br />TOUT EST LÀ</p>
                <button className='button-footer'>UN AVIS ?</button>

                <form className='notice-form' onSubmit={sendFormFoot}>
                    <div className='form-container'>
                        <p>Un avis ?</p>
                        <div className='form-user-info'>
                            <input className='form-user-info-box' type='text' placeholder='Prénom' value={noticeuserlastname} onChange={e => setLastName(e.target.value)} />
                            <input className='form-user-info-box' type='text' placeholder='Nom' value={noticeusername} onChange={e => setName(e.target.value)} />
                        </div>
                        <textarea className='form-message' type='text' placeholder='Message' value={noticeusermessage} onChange={e => setMessage(e.target.value)} />
                        <input className='form-user-note' type='number' placeholder='Note' value={noticeusernote} onChange={e => setNote(e.target.value)} />

                        <button type='submit' className='form-button'>ENVOYÉ</button>
                    </div>
                </form>

                <div className='schedule'>
                    <table className="table-style text-white">
                        <thead>
                            <tr>
                                <th>Jours</th>
                                <th>Début</th>
                                <th>Pause</th>
                                <th>Fin-pause</th>
                                <th>Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* In function of the name of day (todolater) */}
                            <Schedule dayid={0} />
                            <Schedule dayid={1} />
                            <Schedule dayid={2} />
                            <Schedule dayid={3} />
                            <Schedule dayid={5} />
                            <Schedule dayid={4} />
                        </tbody>
                    </table>
                </div>
                {/* See how to render a map */}
                <p className='text-footer credits-text'>Made by : ZoxxxDev</p>
                <div className='footer-links'>
                    <p className='footer-link'>Se connecter</p>
                    <p className='footer-link'>Nos services</p>
                    <p className='footer-link'>Ventes</p>
                </div>
                <p className='text-footer copy-text'>© GarageVParrot / All Rights Reserved</p>
            </footer>
        </>
    );
}