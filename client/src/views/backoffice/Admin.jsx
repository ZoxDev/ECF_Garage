// Css
import '../../components/css/admin.css'

// Components
import Navbar from '../../components/navbar';
import Loading from '../../components/loading';

// Utils
import { useFetch } from "../../hooks/queryget";
import { useState } from 'react';
import { useFetchPut } from '../../hooks/queryput';
import { useFetchPost } from '../../hooks/querypost';
import styled from 'styled-components';

const OpenModal = styled.div`
        display : ${props => props.showmodal ? 'flex' : 'none'};
        `

const OpenModalAdd = styled.div`
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


    // Employee 
    const Employee = () => {
        // Schedule (hourstart, hourpause, hourstoppause, hourstop)
        // Use states
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [role, setRole] = useState("");
        const [isAdd, setIsAdd] = useState(false);
        const [id, setId] = useState("");


        // Post fetch
        const { callback: postData } = useFetchPost("http://localhost:5000/auth/createemployee")

        // Delete


        // Get fetch
        const [data, loading, error] = useFetch("http://localhost:5000/auth/getemployee")

        // Post data (name, email, password, role)
        const sendFormPost = async (e) => {
            e.preventDefault();
            await postData({
                name,
                email,
                password,
                role
            });
        }

        // Delete to do



        // btn
        const closeAdd = () => {
            setIsAdd(!isAdd);
        }


        const onClickAdd = () => {
            setIsAdd(!isAdd);
        }
        // Get
        if (loading) {
            <Loading></Loading>
        }
        if (error) {
            return <p>Error: {error}</p>;
        }

        // Instance each rows of the table (user_id | user_name | user_email | user_paswword)
        const rows = data.map((user) => (
            <tr key={user.user_id}>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>{user.user_paswword}</td>
                <td>
                    <button onClick={() => {
                        setId(user.user_id);
                    }}>
                        <svg width="191" height="212" viewBox="0 0 191 212" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M74.5481 169.083C77.3468 169.083 80.031 167.971 82.01 165.992C83.989 164.013 85.1009 161.329 85.1009 158.53V95.2135C85.1009 92.4147 83.989 89.7306 82.01 87.7515C80.031 85.7725 77.3468 84.6607 74.5481 84.6607C71.7493 84.6607 69.0651 85.7725 67.0861 87.7515C65.1071 89.7306 63.9953 92.4147 63.9953 95.2135V158.53C63.9953 161.329 65.1071 164.013 67.0861 165.992C69.0651 167.971 71.7493 169.083 74.5481 169.083ZM180.076 42.4495H137.865V31.8967C137.865 23.5003 134.529 15.4479 128.592 9.51081C122.655 3.57371 114.603 0.238281 106.206 0.238281H85.1009C76.7045 0.238281 68.6521 3.57371 62.715 9.51081C56.7779 15.4479 53.4425 23.5003 53.4425 31.8967V42.4495H11.2313C8.43249 42.4495 5.74834 43.5613 3.76931 45.5403C1.79028 47.5194 0.678467 50.2035 0.678467 53.0023C0.678467 55.8011 1.79028 58.4852 3.76931 60.4642C5.74834 62.4433 8.43249 63.5551 11.2313 63.5551H21.7841V179.636C21.7841 188.032 25.1195 196.085 31.0566 202.022C36.9937 207.959 45.0461 211.294 53.4425 211.294H137.865C146.261 211.294 154.314 207.959 160.251 202.022C166.188 196.085 169.523 188.032 169.523 179.636V63.5551H180.076C182.875 63.5551 185.559 62.4433 187.538 60.4642C189.517 58.4852 190.629 55.8011 190.629 53.0023C190.629 50.2035 189.517 47.5194 187.538 45.5403C185.559 43.5613 182.875 42.4495 180.076 42.4495ZM74.5481 31.8967C74.5481 29.0979 75.6599 26.4138 77.6389 24.4347C79.6179 22.4557 82.3021 21.3439 85.1009 21.3439H106.206C109.005 21.3439 111.689 22.4557 113.668 24.4347C115.647 26.4138 116.759 29.0979 116.759 31.8967V42.4495H74.5481V31.8967ZM148.418 179.636C148.418 182.435 147.306 185.119 145.327 187.098C143.348 189.077 140.664 190.189 137.865 190.189H53.4425C50.6437 190.189 47.9595 189.077 45.9805 187.098C44.0015 185.119 42.8897 182.435 42.8897 179.636V63.5551H148.418V179.636ZM116.759 169.083C119.558 169.083 122.242 167.971 124.221 165.992C126.2 164.013 127.312 161.329 127.312 158.53V95.2135C127.312 92.4147 126.2 89.7306 124.221 87.7515C122.242 85.7725 119.558 84.6607 116.759 84.6607C113.96 84.6607 111.276 85.7725 109.297 87.7515C107.318 89.7306 106.206 92.4147 106.206 95.2135V158.53C106.206 161.329 107.318 164.013 109.297 165.992C111.276 167.971 113.96 169.083 116.759 169.083Z" fill="#FF0000" />
                        </svg>
                    </button>
                </td>
            </tr>
        ));


        // Employee return
        return (
            <>
                <h1>Epmployés</h1>
                <button onClick={onClickAdd}>AJOUTEZ</button>
                {/* Modal */}
                <OpenModalAdd showmodal={isAdd}>
                    <div className='modal-update'>
                        <button onClick={closeAdd}>FERMER</button>
                        <form onSubmit={sendFormPost}>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nom d'utilisateur" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Mot-De-Pasee' />
                            <input value={role} onChange={(e) => setRole(e.target.value)} type="text" placeholder='Role' />
                            <button type='submit'>Envoyez</button>
                        </form>
                    </div>
                </OpenModalAdd>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Mot-De-Passe</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </>
        )
    }



    // Notice




    // Buttons
    const onClickButton = event => {
        setSelectPanel(event.currentTarget.id);
    }
    // Get the id and Show the good panel
    const ShowPanel = () => {
        switch (selectPanel) {
            case "info":
                return <Info />
            case "schedule":
                return <Schedule />
            case "employee":
                return <Employee />
            default:
                return <Info />
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
                    <ShowPanel />
                </div>
            </section>
        </>
    )
}