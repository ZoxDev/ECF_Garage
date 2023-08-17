import '../components/css/footer.css'
import '../../src/index.css'

import Schedule from '../components/schedule';

import { useState } from 'react';



export default function Footer() {

const [] = useState("");
const [] = useState("");
const [message, setMessage] = useState("");
const [note, setNote] = useState("");



    return (
        <>
            <footer id='foot' className='foot'>
                <p className="text-footer pres-text">VOUS VOULEZ SAVOIR OU ON EST ? NOUS LAISSE UN AVIS ?<br />TOUT EST LÀ</p>
                <button className='button-footer'>UN AVIS ?</button>

                <form className='notice-form'>
                    <input type='text' placeholder='Nom'/>
                    <input type='text' placeholder='Prénom'/>
                    <input type='text' placeholder='Message'/>
                    <input type='text' placeholder='Note'/>
                    <button>ENVOYÉ</button>
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
                <p className='text-footer copy-text'>© GarageVParrot / All Rights Reserved</p>
            </footer>
        </>
    );
}