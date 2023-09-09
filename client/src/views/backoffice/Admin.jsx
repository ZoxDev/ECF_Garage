// Css
import '../../components/css/admin.css'

// Components
import Navbar from '../../components/navbar';
import Loading from '../../components/loading';

// Utils
import { useFetch } from "../../hooks/queryget";
import { useState } from 'react';
import { useFetchPut } from '../../hooks/queryput';
import styled from 'styled-components';

const OpenModal = styled.div`
        display : ${props => props.showmodal ? 'flex' : 'none'};
        `
export default function AdminBack() {
    // UseState
    const [selectPanel, setSelectPanel] = useState("");

    // Info
    const Info = () => {
        // UseState
        const [infoTitle, setTitle] = useState("");
        const [infoText, setContent] = useState("");
        const [isOpen, setIsOpen] = useState(false);
        const [id, setId] = useState(0);



        // Put request
        const { callback: putData, dataPut } = useFetchPut("http://localhost:5000/infos/" + id);

        // Get to see on table (infoid | infotitle | infotext)
        const [data, loading, error] = useFetch("http://localhost:5000/infos")


        const sendFormInfos = async (e) => {
            e.preventDefault();
            await putData({
                infoTitle,
                infoText,
            });
        }

        if (dataPut.resStatus == 200) {
            setTitle("");
            setContent("");
            setIsOpen(!isOpen);
        }

        const closeBtn = () => {
            setIsOpen(!isOpen);
        }

        // Put to update (btn right to table)
        const onClickBtn = () => {
            setIsOpen(!isOpen);
        }

        // Get
        if (loading) {
            <Loading></Loading>
        }
        if (error) {
            return <p>Error: {error}</p>;
        }

        // Instance each rows of the table
        const rows = data.map((info) => (
            <tr key={info.infoid}>
                <td>{info.infoid}</td>
                <td>{info.infotitle}</td>
                <td>{info.infotext}</td>
                <td>
                    <button onClick={() => {
                        onClickBtn();
                        setId(info.infoid);
                    }}>
                        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.474 3.60677L21.3889 7.5217C21.5538 7.68663 21.5538 7.95573 21.3889 8.12066L11.9097 17.5998L7.88194 18.0469C7.34375 18.1076 6.88802 17.6519 6.94878 17.1137L7.39583 13.0859L16.875 3.60677C17.0399 3.44184 17.309 3.44184 17.474 3.60677ZM24.5052 2.61285L22.3872 0.494792C21.7274 -0.164931 20.6554 -0.164931 19.9913 0.494792L18.4549 2.03125C18.2899 2.19618 18.2899 2.46528 18.4549 2.63021L22.3698 6.54514C22.5347 6.71007 22.8038 6.71007 22.9687 6.54514L24.5052 5.00868C25.1649 4.34462 25.1649 3.27257 24.5052 2.61285ZM16.6667 15.0217V19.4401H2.77778V5.55122H12.7517C12.8906 5.55122 13.0208 5.49479 13.1207 5.39931L14.8568 3.66319C15.1866 3.33333 14.9523 2.77344 14.4878 2.77344H2.08333C0.93316 2.77344 0 3.7066 0 4.85677V20.1345C0 21.2847 0.93316 22.2179 2.08333 22.2179H17.3611C18.5113 22.2179 19.4444 21.2847 19.4444 20.1345V13.2856C19.4444 12.8212 18.8845 12.5911 18.5547 12.9167L16.8186 14.6528C16.7231 14.7526 16.6667 14.8828 16.6667 15.0217Z" fill="black" />
                        </svg>
                    </button>
                </td>
            </tr>
        ));


        //INFO SECTION
        return (
            <>
                <h1>Informations</h1>
                {/* Modal */}
                <OpenModal showmodal={isOpen}>
                    <div className='modal-update'>
                        <button onClick={closeBtn}>FERMER</button>
                        <form onSubmit={sendFormInfos}>
                            <input value={infoTitle} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Titre' />
                            <textarea value={infoText} onChange={(e) => setContent(e.target.value)} placeholder='Contenu' />
                            <button type='submit'>Envoyez</button>
                        </form>
                    </div>
                </OpenModal>
                <thead>
                    <tr>
                        <th>Info ID</th>
                        <th>Info Titre</th>
                        <th>Info Texte</th>
                        <th>Mettre à jour</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </>
        )
    }

    //Schedule 
    const Schedule = () => {
        // Schedule (hourstart, hourpause, hourstoppause, hourstop)
        // Use states
        const [hourstart, setHourStart] = useState("");
        const [hourpause, setHourPause] = useState("");
        const [hourstoppause, setHousrStopPause] = useState("");
        const [hourstop, setHourStop] = useState("");
        
        const [isOpen, setIsOpen] = useState(false);
        const [id, setId] = useState("");


        // Put fetch
        const { callback: putData, dataPut } = useFetchPut("http://localhost:5000/schedule/" + id);
        console.log("http://localhost:5000/infos/" + id)

        // Get fetch
        const [data, loading, error] = useFetch("http://localhost:5000/schedule")

        // Put
        const sendFormInfos = async (e) => {
            e.preventDefault();
            await putData({
                hourstart, 
                hourpause, 
                hourstoppause, 
                hourstop
            });
        }

        if (dataPut.resStatus == 200) {
            console.log("Put schedule work");
            setHourStart("");
            setHourPause("");
            setHousrStopPause("");
            setHourStop("");
            setIsOpen(!isOpen);
        }

        // btn
        const closeBtn = () => {
            setIsOpen(!isOpen);
        }

        const onClickBtn = () => {
            setIsOpen(!isOpen);
        }

        // Get
        if (loading) {
            <Loading></Loading>
        }
        if (error) {
            return <p>Error: {error}</p>;
        }

        // Instance each rows of the table
        const rows = data.map((schedule) => (
            <tr key={schedule.dayname}>
                <td>{schedule.dayname}</td>
                <td>{schedule.hourstart}</td>
                <td>{schedule.hourpause}</td>
                <td>{schedule.hourstoppause}</td>
                <td>{schedule.hourstop}</td>
                <td>
                    <button onClick={() => {
                        onClickBtn();
                        setId(schedule.dayname);
                    }}>
                        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.474 3.60677L21.3889 7.5217C21.5538 7.68663 21.5538 7.95573 21.3889 8.12066L11.9097 17.5998L7.88194 18.0469C7.34375 18.1076 6.88802 17.6519 6.94878 17.1137L7.39583 13.0859L16.875 3.60677C17.0399 3.44184 17.309 3.44184 17.474 3.60677ZM24.5052 2.61285L22.3872 0.494792C21.7274 -0.164931 20.6554 -0.164931 19.9913 0.494792L18.4549 2.03125C18.2899 2.19618 18.2899 2.46528 18.4549 2.63021L22.3698 6.54514C22.5347 6.71007 22.8038 6.71007 22.9687 6.54514L24.5052 5.00868C25.1649 4.34462 25.1649 3.27257 24.5052 2.61285ZM16.6667 15.0217V19.4401H2.77778V5.55122H12.7517C12.8906 5.55122 13.0208 5.49479 13.1207 5.39931L14.8568 3.66319C15.1866 3.33333 14.9523 2.77344 14.4878 2.77344H2.08333C0.93316 2.77344 0 3.7066 0 4.85677V20.1345C0 21.2847 0.93316 22.2179 2.08333 22.2179H17.3611C18.5113 22.2179 19.4444 21.2847 19.4444 20.1345V13.2856C19.4444 12.8212 18.8845 12.5911 18.5547 12.9167L16.8186 14.6528C16.7231 14.7526 16.6667 14.8828 16.6667 15.0217Z" fill="black" />
                        </svg>
                    </button>
                </td>
            </tr>
        ));


        // Schdule return
        return (
            <>
                <h1>Horraires</h1>
                {/* Modal */}
                <OpenModal showmodal={isOpen}>
                    <div className='modal-update'>
                        <button onClick={closeBtn}>FERMER</button>
                        <form onSubmit={sendFormInfos}>
                            <input value={hourstart} onChange={(e) => setHourStart(e.target.value)} type="text" placeholder='Début, Format : (HH:MM)' />
                            <input value={hourpause} onChange={(e) => setHourPause(e.target.value)} placeholder='Pause, Format : (HH:MM)' />
                            <input value={hourstoppause} onChange={(e) => setHousrStopPause(e.target.value)} type="text" placeholder='Fin pause, Format : (HH:MM)' />
                            <input value={hourstop} onChange={(e) => setHourStop(e.target.value)} type="text" placeholder='Fin journée, Format : (HH:MM)' />
                            <button type='submit'>Envoyez</button>
                        </form>
                    </div>
                </OpenModal>
                <thead>
                    <tr>
                        <th>Jour</th>
                        <th>Début</th>
                        <th>Pause</th>
                        <th>Fin pause</th>
                        <th>Fin journée</th>
                        <th>Mettre à jour</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </>
        )
    }


    // Employee & Notice




    // Buttons
    const onClickButton = event => {
        setSelectPanel(event.currentTarget.id);
    }
    // Get the id and Show the good panel
    const ShowPanel = () =>{
        switch (selectPanel){
            case "info" : 
                return <Info/>
            case "schedule" :
                return  <Schedule/>
            default :
                return <Info/>
        }
    }

    // THE PAGE
    return (
        <>
            <section className="admin-container">
                <Navbar />
                <div className="admin-menu">
                    <h2>Panel</h2>
                    <button onClick={onClickButton} id='info' className="btn-admin">Informations</button>
                    <button onClick={onClickButton} id='schedule' className="btn-admin">Horraires</button>
                    <button onClick={onClickButton} id='employee' className="btn-admin">Employées</button>
                    <button onClick={onClickButton} id='notice' className="btn-admin">Avis</button>

                </div>
                <div className="admin-content">
                    <ShowPanel/>
                </div>
            </section>
        </>
    )
}