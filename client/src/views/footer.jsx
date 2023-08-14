import '../components/css/footer.css'
import '../../src/index.css'

import { useEffect, useState } from 'react';
import Schedule from '../components/schedule';


export default function Footer() {



    return (
        <>
            <footer>
                <p className="text-footer">VOUS VOULEZ SAVOIR OU ON EST ? NOUS LAISSE UN AVIS ?<br />TOUT EST LÀ</p>
                <button className='button-footer'>UN AVIS ?</button>
                <div className='schedule'>
                    <table className=" text-white">
                        <thead>
                            <tr>
                                <th>Jours</th>
                                <th>Début</th>
                                <th>Pause-midi</th>
                                <th>Pause-midi</th>
                                <th>Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* In function of the name of day (todolater) */}
                            <Schedule dayid={0}/>
                            <Schedule dayid={1}/>
                            <Schedule dayid={2}/>
                            <Schedule dayid={3}/>
                            <Schedule dayid={5}/>
                            <Schedule dayid={4}/>
                        </tbody>
                    </table>
                </div>
            </footer>
        </>
    );
}