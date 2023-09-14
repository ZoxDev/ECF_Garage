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
import { useFetchDelete } from '../../hooks/querydelete';
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
                <OpenModal className='modal-panel' showmodal={isOpen}>
                    <div className='modal-update'>
                        <button className='btn-panel' onClick={closeBtn}>
                            <svg width="30" height="30" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.92328 3.64741C4.6373 1.93391 6.96169 0.971323 9.38531 0.971323C11.8089 0.971323 14.1333 1.93391 15.8473 3.64741L64.2257 52.0258L112.604 3.64741C113.447 2.77444 114.456 2.07813 115.571 1.59911C116.686 1.12009 117.885 0.867947 119.099 0.857401C120.313 0.846855 121.516 1.07811 122.639 1.53768C123.763 1.99725 124.783 2.67593 125.641 3.53412C126.5 4.3923 127.178 5.41281 127.638 6.53609C128.097 7.65937 128.329 8.86293 128.318 10.0765C128.308 11.2902 128.055 12.4895 127.576 13.6046C127.097 14.7198 126.401 15.7283 125.528 16.5715L77.1498 64.9498L125.528 113.328C127.193 115.052 128.114 117.361 128.094 119.757C128.073 122.154 127.111 124.446 125.417 126.141C123.722 127.836 121.43 128.797 119.033 128.818C116.637 128.838 114.328 127.917 112.604 126.252L64.2257 77.8739L15.8473 126.252C14.1235 127.917 11.8147 128.838 9.4182 128.818C7.0217 128.797 4.72926 127.836 3.03462 126.141C1.33998 124.446 0.378723 122.154 0.357898 119.757C0.337073 117.361 1.25834 115.052 2.92328 113.328L51.3017 64.9498L2.92328 16.5715C1.20978 14.8574 0.247192 12.5331 0.247192 10.1094C0.247192 7.68582 1.20978 5.36143 2.92328 3.64741Z" fill="#0D0D0D" />
                            </svg>
                        </button>
                        <form className='form-panel' onSubmit={sendFormInfos}>
                            <label className='label-panel'>
                                Titre
                                <input value={infoTitle} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Titre' />
                            </label>
                            <label className='label-panel'>
                                Contenu
                                <textarea value={infoText} onChange={(e) => setContent(e.target.value)} placeholder='Contenu' />
                            </label>
                            <button type='submit'>Envoyez</button>
                        </form>
                    </div>
                </OpenModal>
                <table>
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
                </table>

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
                <td>{schedule.hourstart} / {schedule.hourpause}</td>
                <td>{schedule.hourstoppause} / {schedule.hourstop}</td>
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
                <OpenModal className='modal-panel' showmodal={isOpen}>
                    <div className='modal-update'>
                        <button className='btn-panel' onClick={closeBtn}>
                            <svg width="30" height="30" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.92328 3.64741C4.6373 1.93391 6.96169 0.971323 9.38531 0.971323C11.8089 0.971323 14.1333 1.93391 15.8473 3.64741L64.2257 52.0258L112.604 3.64741C113.447 2.77444 114.456 2.07813 115.571 1.59911C116.686 1.12009 117.885 0.867947 119.099 0.857401C120.313 0.846855 121.516 1.07811 122.639 1.53768C123.763 1.99725 124.783 2.67593 125.641 3.53412C126.5 4.3923 127.178 5.41281 127.638 6.53609C128.097 7.65937 128.329 8.86293 128.318 10.0765C128.308 11.2902 128.055 12.4895 127.576 13.6046C127.097 14.7198 126.401 15.7283 125.528 16.5715L77.1498 64.9498L125.528 113.328C127.193 115.052 128.114 117.361 128.094 119.757C128.073 122.154 127.111 124.446 125.417 126.141C123.722 127.836 121.43 128.797 119.033 128.818C116.637 128.838 114.328 127.917 112.604 126.252L64.2257 77.8739L15.8473 126.252C14.1235 127.917 11.8147 128.838 9.4182 128.818C7.0217 128.797 4.72926 127.836 3.03462 126.141C1.33998 124.446 0.378723 122.154 0.357898 119.757C0.337073 117.361 1.25834 115.052 2.92328 113.328L51.3017 64.9498L2.92328 16.5715C1.20978 14.8574 0.247192 12.5331 0.247192 10.1094C0.247192 7.68582 1.20978 5.36143 2.92328 3.64741Z" fill="#0D0D0D" />
                            </svg>
                        </button>
                        <form className='form-panel' onSubmit={sendFormInfos}>
                            <label className='label-panel'>
                                Début de journée
                                <input value={hourstart} onChange={(e) => setHourStart(e.target.value)} type="text" placeholder='Début, Format : (HH:MM)' />
                            </label>
                            <label className='label-panel'>
                                Début de pause
                                <input value={hourpause} onChange={(e) => setHourPause(e.target.value)} placeholder='Pause, Format : (HH:MM)' />
                            </label>
                            <label className='label-panel'>
                                Fin de pause
                                <input value={hourstoppause} onChange={(e) => setHousrStopPause(e.target.value)} type="text" placeholder='Fin pause, Format : (HH:MM)' />
                            </label>
                            <label className='label-panel'>
                                Fin de journée
                                <input value={hourstop} onChange={(e) => setHourStop(e.target.value)} type="text" placeholder='Fin journée, Format : (HH:MM)' />
                            </label>
                            

                            <button type='submit'>Envoyez</button>
                        </form>
                    </div>
                </OpenModal>
                <table>
                    <thead>
                        <tr>
                            <th>Jour</th>
                            <th>Matinée</th>

                            <th>Après-midi</th>
                            <th>Mettre à jour</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
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
        const [isOpen, setIsOpen] = useState(false);
        const [isAdd, setIsAdd] = useState(false);
        const [id, setId] = useState("");

        // Post fetch
        const { callback: postData } = useFetchPost("http://localhost:5000/auth/createemployee")

        // Delete
        const { callback: deleteData, dataDelete } = useFetchDelete("http://localhost:5000/auth/delete/" + id)

        // Get fetch
        const [data, loading, error] = useFetch("http://localhost:5000/auth/getemployee")

        // Delete
        const clickDelete = async () => {
            await deleteData();

            if (dataDelete == 200) {
                console.log("less go");
            }
            // If res = 200 then filter the data to delete the good one for update data.
        }

        // Post data (name, email, password, role)
        const sendFormPost = async () => {
            await postData({
                name,
                email,
                password
            });
        }

        // btn
        const closeDelete = () => {
            setIsOpen(!isOpen);
        }

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
                <td>
                    <button onClick={() => {
                        setIsOpen(!isOpen);
                        setId(user.user_id);
                    }}>
                        <svg width="27" height="30" viewBox="0 0 191 212" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <button className='btn-add' onClick={onClickAdd}>AJOUTEZ</button>
                {/* Modal */}
                <OpenModalAdd className='modal-panel' showmodal={isAdd}>
                    <button className='btn-panel' onClick={closeAdd}>
                        <svg width="30" height="30" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.92328 3.64741C4.6373 1.93391 6.96169 0.971323 9.38531 0.971323C11.8089 0.971323 14.1333 1.93391 15.8473 3.64741L64.2257 52.0258L112.604 3.64741C113.447 2.77444 114.456 2.07813 115.571 1.59911C116.686 1.12009 117.885 0.867947 119.099 0.857401C120.313 0.846855 121.516 1.07811 122.639 1.53768C123.763 1.99725 124.783 2.67593 125.641 3.53412C126.5 4.3923 127.178 5.41281 127.638 6.53609C128.097 7.65937 128.329 8.86293 128.318 10.0765C128.308 11.2902 128.055 12.4895 127.576 13.6046C127.097 14.7198 126.401 15.7283 125.528 16.5715L77.1498 64.9498L125.528 113.328C127.193 115.052 128.114 117.361 128.094 119.757C128.073 122.154 127.111 124.446 125.417 126.141C123.722 127.836 121.43 128.797 119.033 128.818C116.637 128.838 114.328 127.917 112.604 126.252L64.2257 77.8739L15.8473 126.252C14.1235 127.917 11.8147 128.838 9.4182 128.818C7.0217 128.797 4.72926 127.836 3.03462 126.141C1.33998 124.446 0.378723 122.154 0.357898 119.757C0.337073 117.361 1.25834 115.052 2.92328 113.328L51.3017 64.9498L2.92328 16.5715C1.20978 14.8574 0.247192 12.5331 0.247192 10.1094C0.247192 7.68582 1.20978 5.36143 2.92328 3.64741Z" fill="#0D0D0D" />
                        </svg>
                    </button>
                    <div>
                        <form className='form-panel' onSubmit={sendFormPost}>
                            <label className='label-panel'>
                                Nom d'utilisateur
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nom d'utilisateur" />
                            </label>
                            <label className='label-panel'>
                                Mail
                                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' />
                            </label>
                            <label className='label-panel'>
                                Mot-de-passe
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Mot-De-Pasee' />
                            </label>
                            <button type='submit'>Envoyez</button>
                        </form>
                    </div>
                </OpenModalAdd>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Supprimer</th>
                            <OpenModal showmodal={isOpen}>
                                <h1>Vraiment supprimer ?</h1>
                                <button onClick={() => {
                                    clickDelete();
                                    setIsOpen(!isOpen);
                                }}>
                                    Oui
                                </button>
                                <button onClick={closeDelete}>Non</button>
                            </OpenModal>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </>
        )
    }

    // Notice
    const Notice = () => {
        // Notice (noticeid | noticeusername | noticeuserlastname | noticeusermessage | noticeusernote )
        // Use states
        const [isOpen, setIsOpen] = useState(false);
        const [id, setId] = useState("");

        // Delete fetch
        const { callback: deleteData } = useFetchDelete("http://localhost:5000/noticemessage/" + id)

        // Get fetch
        let [data, loading, error] = useFetch("http://localhost:5000/noticemessage")

        // Delete
        const clickDelete = async () => {
            await deleteData();
            console.log()
            data = data.filter(notice => notice.noticeid == id);
            console.log(data);
        }

        // btn
        const closeDelete = () => {
            setIsOpen(!isOpen);
        }

        // Get
        if (loading) {
            <Loading></Loading>
        }
        if (error) {
            return <p>Error: {error}</p>;
        }

        // Instance each rows of the table (noticeid | noticeusername | noticeuserlastname | noticeusermessage | noticeusernote )
        const rows = data.map((user) => (
            <tr key={user.noticeid}>
                <td>{user.noticeuserlastname}</td>
                <td>{user.noticeusername}</td>
                <td>{user.noticeusermessage}</td>
                <td>{user.noticeusernote}</td>
                <td>
                    <button onClick={() => {
                        setIsOpen(!isOpen);
                        setId(user.noticeid);
                    }}>
                        <svg width="27" height="30" viewBox="0 0 191 212" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M74.5481 169.083C77.3468 169.083 80.031 167.971 82.01 165.992C83.989 164.013 85.1009 161.329 85.1009 158.53V95.2135C85.1009 92.4147 83.989 89.7306 82.01 87.7515C80.031 85.7725 77.3468 84.6607 74.5481 84.6607C71.7493 84.6607 69.0651 85.7725 67.0861 87.7515C65.1071 89.7306 63.9953 92.4147 63.9953 95.2135V158.53C63.9953 161.329 65.1071 164.013 67.0861 165.992C69.0651 167.971 71.7493 169.083 74.5481 169.083ZM180.076 42.4495H137.865V31.8967C137.865 23.5003 134.529 15.4479 128.592 9.51081C122.655 3.57371 114.603 0.238281 106.206 0.238281H85.1009C76.7045 0.238281 68.6521 3.57371 62.715 9.51081C56.7779 15.4479 53.4425 23.5003 53.4425 31.8967V42.4495H11.2313C8.43249 42.4495 5.74834 43.5613 3.76931 45.5403C1.79028 47.5194 0.678467 50.2035 0.678467 53.0023C0.678467 55.8011 1.79028 58.4852 3.76931 60.4642C5.74834 62.4433 8.43249 63.5551 11.2313 63.5551H21.7841V179.636C21.7841 188.032 25.1195 196.085 31.0566 202.022C36.9937 207.959 45.0461 211.294 53.4425 211.294H137.865C146.261 211.294 154.314 207.959 160.251 202.022C166.188 196.085 169.523 188.032 169.523 179.636V63.5551H180.076C182.875 63.5551 185.559 62.4433 187.538 60.4642C189.517 58.4852 190.629 55.8011 190.629 53.0023C190.629 50.2035 189.517 47.5194 187.538 45.5403C185.559 43.5613 182.875 42.4495 180.076 42.4495ZM74.5481 31.8967C74.5481 29.0979 75.6599 26.4138 77.6389 24.4347C79.6179 22.4557 82.3021 21.3439 85.1009 21.3439H106.206C109.005 21.3439 111.689 22.4557 113.668 24.4347C115.647 26.4138 116.759 29.0979 116.759 31.8967V42.4495H74.5481V31.8967ZM148.418 179.636C148.418 182.435 147.306 185.119 145.327 187.098C143.348 189.077 140.664 190.189 137.865 190.189H53.4425C50.6437 190.189 47.9595 189.077 45.9805 187.098C44.0015 185.119 42.8897 182.435 42.8897 179.636V63.5551H148.418V179.636ZM116.759 169.083C119.558 169.083 122.242 167.971 124.221 165.992C126.2 164.013 127.312 161.329 127.312 158.53V95.2135C127.312 92.4147 126.2 89.7306 124.221 87.7515C122.242 85.7725 119.558 84.6607 116.759 84.6607C113.96 84.6607 111.276 85.7725 109.297 87.7515C107.318 89.7306 106.206 92.4147 106.206 95.2135V158.53C106.206 161.329 107.318 164.013 109.297 165.992C111.276 167.971 113.96 169.083 116.759 169.083Z" fill="#FF0000" />
                        </svg>
                    </button>
                </td>
            </tr>
        ));

        // Notice return
        return (
            <>
                <h1>Les avis !</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Message</th>
                            <th>Note</th>
                            <th>Supprimer</th>
                            <OpenModal showmodal={isOpen}>
                                <h1>Vraiment supprimer ?</h1>
                                <button onClick={() => {
                                    clickDelete();
                                    setIsOpen(!isOpen);
                                }}>
                                    Oui
                                </button>
                                <button onClick={closeDelete}>Non</button>
                            </OpenModal>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </>
        )
    }

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
            case "notice":
                return <Notice />
            default:
                return <Info />
        }
    }

    // THE PAGE
    return (
        <>
            <section className="admin-container">
                <Navbar />
                <div className="admin-menu-mobile">
                    <button onClick={onClickButton} id='info' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 202 404" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M151.401 0C123.644 0 100.934 22.7101 100.934 50.4668C100.934 78.2236 123.644 100.934 151.401 100.934C179.157 100.934 201.867 78.2236 201.867 50.4668C201.867 22.7101 179.157 0 151.401 0ZM75.7003 126.167C33.8128 126.167 0 159.98 0 201.867H50.4668C50.4668 187.737 61.5695 176.634 75.7003 176.634C89.831 176.634 100.934 187.737 100.934 201.867C100.934 215.998 50.4668 284.633 50.4668 328.034C50.4668 371.436 84.2796 403.735 126.167 403.735C168.055 403.735 201.867 369.922 201.867 328.034H151.401C151.401 342.165 140.298 353.268 126.167 353.268C112.036 353.268 100.934 342.165 100.934 328.034C100.934 309.866 151.401 235.175 151.401 201.867C151.401 160.989 117.588 126.167 75.7003 126.167Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='schedule' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 202 223" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100.934 181.681C102.93 181.681 104.881 181.089 106.541 179.98C108.201 178.871 109.495 177.294 110.259 175.45C111.023 173.606 111.223 171.576 110.833 169.618C110.444 167.66 109.482 165.862 108.071 164.45C106.659 163.039 104.861 162.077 102.903 161.688C100.945 161.298 98.9154 161.498 97.0711 162.262C95.2268 163.026 93.6504 164.32 92.5414 165.98C91.4323 167.64 90.8403 169.591 90.8403 171.587C90.8403 174.264 91.9037 176.831 93.7966 178.724C95.6895 180.617 98.2568 181.681 100.934 181.681ZM151.401 181.681C153.397 181.681 155.348 181.089 157.008 179.98C158.668 178.871 159.962 177.294 160.726 175.45C161.49 173.606 161.689 171.576 161.3 169.618C160.911 167.66 159.949 165.862 158.538 164.45C157.126 163.039 155.328 162.077 153.37 161.688C151.412 161.298 149.382 161.498 147.538 162.262C145.694 163.026 144.117 164.32 143.008 165.98C141.899 167.64 141.307 169.591 141.307 171.587C141.307 174.264 142.371 176.831 144.263 178.724C146.156 180.617 148.724 181.681 151.401 181.681ZM151.401 141.307C153.397 141.307 155.348 140.715 157.008 139.606C158.668 138.497 159.962 136.921 160.726 135.076C161.49 133.232 161.689 131.203 161.3 129.245C160.911 127.287 159.949 125.488 158.538 124.077C157.126 122.665 155.328 121.704 153.37 121.314C151.412 120.925 149.382 121.125 147.538 121.889C145.694 122.653 144.117 123.946 143.008 125.606C141.899 127.266 141.307 129.218 141.307 131.214C141.307 133.891 142.371 136.458 144.263 138.351C146.156 140.244 148.724 141.307 151.401 141.307ZM100.934 141.307C102.93 141.307 104.881 140.715 106.541 139.606C108.201 138.497 109.495 136.921 110.259 135.076C111.023 133.232 111.223 131.203 110.833 129.245C110.444 127.287 109.482 125.488 108.071 124.077C106.659 122.665 104.861 121.704 102.903 121.314C100.945 120.925 98.9154 121.125 97.0711 121.889C95.2268 122.653 93.6504 123.946 92.5414 125.606C91.4323 127.266 90.8403 129.218 90.8403 131.214C90.8403 133.891 91.9037 136.458 93.7966 138.351C95.6895 140.244 98.2568 141.307 100.934 141.307ZM171.587 20.1867H161.494V10.0934C161.494 7.41644 160.43 4.84915 158.538 2.95628C156.645 1.0634 154.077 0 151.401 0C148.724 0 146.156 1.0634 144.263 2.95628C142.371 4.84915 141.307 7.41644 141.307 10.0934V20.1867H60.5602V10.0934C60.5602 7.41644 59.4968 4.84915 57.6039 2.95628C55.7111 1.0634 53.1438 0 50.4668 0C47.7899 0 45.2226 1.0634 43.3298 2.95628C41.4369 4.84915 40.3735 7.41644 40.3735 10.0934V20.1867H30.2801C22.2493 20.1867 14.5475 23.377 8.86884 29.0556C3.19022 34.7342 0 42.4361 0 50.4668V191.774C0 199.805 3.19022 207.507 8.86884 213.185C14.5475 218.864 22.2493 222.054 30.2801 222.054H171.587C179.618 222.054 187.32 218.864 192.999 213.185C198.677 207.507 201.867 199.805 201.867 191.774V50.4668C201.867 42.4361 198.677 34.7342 192.999 29.0556C187.32 23.377 179.618 20.1867 171.587 20.1867ZM181.681 191.774C181.681 194.451 180.617 197.018 178.724 198.911C176.831 200.804 174.264 201.867 171.587 201.867H30.2801C27.6032 201.867 25.0359 200.804 23.143 198.911C21.2501 197.018 20.1867 194.451 20.1867 191.774V100.934H181.681V191.774ZM181.681 80.7469H20.1867V50.4668C20.1867 47.7899 21.2501 45.2226 23.143 43.3298C25.0359 41.4369 27.6032 40.3735 30.2801 40.3735H40.3735V50.4668C40.3735 53.1438 41.4369 55.7111 43.3298 57.6039C45.2226 59.4968 47.7899 60.5602 50.4668 60.5602C53.1438 60.5602 55.7111 59.4968 57.6039 57.6039C59.4968 55.7111 60.5602 53.1438 60.5602 50.4668V40.3735H141.307V50.4668C141.307 53.1438 142.371 55.7111 144.263 57.6039C146.156 59.4968 148.724 60.5602 151.401 60.5602C154.077 60.5602 156.645 59.4968 158.538 57.6039C160.43 55.7111 161.494 53.1438 161.494 50.4668V40.3735H171.587C174.264 40.3735 176.831 41.4369 178.724 43.3298C180.617 45.2226 181.681 47.7899 181.681 50.4668V80.7469ZM50.4668 141.307C52.4631 141.307 54.4146 140.715 56.0744 139.606C57.7343 138.497 59.028 136.921 59.7919 135.076C60.5558 133.232 60.7557 131.203 60.3663 129.245C59.9768 127.287 59.0155 125.488 57.6039 124.077C56.1923 122.665 54.3939 121.704 52.436 121.314C50.478 120.925 48.4486 121.125 46.6043 121.889C44.76 122.653 43.1836 123.946 42.0745 125.606C40.9654 127.266 40.3735 129.218 40.3735 131.214C40.3735 133.891 41.4369 136.458 43.3298 138.351C45.2226 140.244 47.7899 141.307 50.4668 141.307ZM50.4668 181.681C52.4631 181.681 54.4146 181.089 56.0744 179.98C57.7343 178.871 59.028 177.294 59.7919 175.45C60.5558 173.606 60.7557 171.576 60.3663 169.618C59.9768 167.66 59.0155 165.862 57.6039 164.45C56.1923 163.039 54.3939 162.077 52.436 161.688C50.478 161.298 48.4486 161.498 46.6043 162.262C44.76 163.026 43.1836 164.32 42.0745 165.98C40.9654 167.64 40.3735 169.591 40.3735 171.587C40.3735 174.264 41.4369 176.831 43.3298 178.724C45.2226 180.617 47.7899 181.681 50.4668 181.681Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='employee' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 202 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75.7002 92.5225C82.3545 92.5225 88.8593 90.5493 94.3921 86.8524C99.925 83.1555 104.237 77.9009 106.784 71.7532C109.33 65.6055 109.997 58.8407 108.698 52.3142C107.4 45.7878 104.196 39.793 99.4905 35.0877C94.7852 30.3824 88.7904 27.1781 82.264 25.8799C75.7375 24.5817 68.9728 25.248 62.825 27.7945C56.6773 30.3409 51.4227 34.6532 47.7258 40.1861C44.0289 45.7189 42.0557 52.2237 42.0557 58.878C42.0557 67.8011 45.6003 76.3587 51.9099 82.6683C58.2195 88.9779 66.7771 92.5225 75.7002 92.5225Z" fill="black" />
                            <path d="M142.989 109.345C147.98 109.345 152.859 107.865 157.008 105.092C161.158 102.319 164.392 98.3786 166.302 93.7678C168.212 89.157 168.712 84.0834 167.738 79.1886C166.764 74.2938 164.361 69.7976 160.832 66.2686C157.303 62.7397 152.807 60.3364 147.912 59.3628C143.017 58.3892 137.944 58.8889 133.333 60.7987C128.722 62.7086 124.781 65.9428 122.009 70.0924C119.236 74.242 117.756 79.1207 117.756 84.1114C117.756 90.8037 120.414 97.2219 125.147 101.954C129.879 106.686 136.297 109.345 142.989 109.345Z" fill="black" />
                            <path d="M176.634 168.223C178.865 168.223 181.004 167.337 182.582 165.76C184.159 164.182 185.045 162.043 185.045 159.812C185.038 151.951 182.828 144.249 178.666 137.58C174.504 130.912 168.556 125.543 161.497 122.084C154.438 118.624 146.551 117.213 138.73 118.009C130.909 118.805 123.468 121.777 117.251 126.588C109.013 118.382 98.5286 112.799 87.1211 110.543C75.7136 108.288 63.8937 109.46 53.1519 113.914C42.4101 118.367 33.2275 125.901 26.7621 135.566C20.2967 145.232 16.838 156.595 16.8223 168.223C16.8223 170.454 17.7084 172.593 19.2858 174.171C20.8632 175.748 23.0026 176.634 25.2334 176.634H126.167C128.398 176.634 130.537 175.748 132.115 174.171C133.692 172.593 134.578 170.454 134.578 168.223" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='notice' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 211 204" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M93.2066 148.231L102.884 157.909L88.8341 163.098L93.2066 148.231Z" fill="black" />
                            <path d="M29.3342 37.4456H138.838" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 69.8912H133.16" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 102.337H98.7261" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 134.783H78.8418" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 167.228H70.4834" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M93.2066 148.231L102.884 157.909L88.8341 163.098L93.2066 148.231Z" fill="black" />
                            <path d="M103.839 157.965L126.812 149.988L190.04 86.7592L163.864 60.5833L100.636 123.812L92.6304 146.812L103.839 157.965Z" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M174.383 50.0642L180.692 43.7559L206.868 69.9318L200.25 76.5499" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M102.164 122.284L128.339 148.46" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M92.6469 146.758L87.0378 163.586L103.902 157.939" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M146.871 79.1473L172.025 104.3" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M163.172 136.214V199.674H5V5H163.172V39.2946" stroke="black" strokeWidth="8.19496" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="admin-menu-desktop">
                    <button onClick={onClickButton} id='info' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 202 404" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M151.401 0C123.644 0 100.934 22.7101 100.934 50.4668C100.934 78.2236 123.644 100.934 151.401 100.934C179.157 100.934 201.867 78.2236 201.867 50.4668C201.867 22.7101 179.157 0 151.401 0ZM75.7003 126.167C33.8128 126.167 0 159.98 0 201.867H50.4668C50.4668 187.737 61.5695 176.634 75.7003 176.634C89.831 176.634 100.934 187.737 100.934 201.867C100.934 215.998 50.4668 284.633 50.4668 328.034C50.4668 371.436 84.2796 403.735 126.167 403.735C168.055 403.735 201.867 369.922 201.867 328.034H151.401C151.401 342.165 140.298 353.268 126.167 353.268C112.036 353.268 100.934 342.165 100.934 328.034C100.934 309.866 151.401 235.175 151.401 201.867C151.401 160.989 117.588 126.167 75.7003 126.167Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='schedule' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 202 223" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100.934 181.681C102.93 181.681 104.881 181.089 106.541 179.98C108.201 178.871 109.495 177.294 110.259 175.45C111.023 173.606 111.223 171.576 110.833 169.618C110.444 167.66 109.482 165.862 108.071 164.45C106.659 163.039 104.861 162.077 102.903 161.688C100.945 161.298 98.9154 161.498 97.0711 162.262C95.2268 163.026 93.6504 164.32 92.5414 165.98C91.4323 167.64 90.8403 169.591 90.8403 171.587C90.8403 174.264 91.9037 176.831 93.7966 178.724C95.6895 180.617 98.2568 181.681 100.934 181.681ZM151.401 181.681C153.397 181.681 155.348 181.089 157.008 179.98C158.668 178.871 159.962 177.294 160.726 175.45C161.49 173.606 161.689 171.576 161.3 169.618C160.911 167.66 159.949 165.862 158.538 164.45C157.126 163.039 155.328 162.077 153.37 161.688C151.412 161.298 149.382 161.498 147.538 162.262C145.694 163.026 144.117 164.32 143.008 165.98C141.899 167.64 141.307 169.591 141.307 171.587C141.307 174.264 142.371 176.831 144.263 178.724C146.156 180.617 148.724 181.681 151.401 181.681ZM151.401 141.307C153.397 141.307 155.348 140.715 157.008 139.606C158.668 138.497 159.962 136.921 160.726 135.076C161.49 133.232 161.689 131.203 161.3 129.245C160.911 127.287 159.949 125.488 158.538 124.077C157.126 122.665 155.328 121.704 153.37 121.314C151.412 120.925 149.382 121.125 147.538 121.889C145.694 122.653 144.117 123.946 143.008 125.606C141.899 127.266 141.307 129.218 141.307 131.214C141.307 133.891 142.371 136.458 144.263 138.351C146.156 140.244 148.724 141.307 151.401 141.307ZM100.934 141.307C102.93 141.307 104.881 140.715 106.541 139.606C108.201 138.497 109.495 136.921 110.259 135.076C111.023 133.232 111.223 131.203 110.833 129.245C110.444 127.287 109.482 125.488 108.071 124.077C106.659 122.665 104.861 121.704 102.903 121.314C100.945 120.925 98.9154 121.125 97.0711 121.889C95.2268 122.653 93.6504 123.946 92.5414 125.606C91.4323 127.266 90.8403 129.218 90.8403 131.214C90.8403 133.891 91.9037 136.458 93.7966 138.351C95.6895 140.244 98.2568 141.307 100.934 141.307ZM171.587 20.1867H161.494V10.0934C161.494 7.41644 160.43 4.84915 158.538 2.95628C156.645 1.0634 154.077 0 151.401 0C148.724 0 146.156 1.0634 144.263 2.95628C142.371 4.84915 141.307 7.41644 141.307 10.0934V20.1867H60.5602V10.0934C60.5602 7.41644 59.4968 4.84915 57.6039 2.95628C55.7111 1.0634 53.1438 0 50.4668 0C47.7899 0 45.2226 1.0634 43.3298 2.95628C41.4369 4.84915 40.3735 7.41644 40.3735 10.0934V20.1867H30.2801C22.2493 20.1867 14.5475 23.377 8.86884 29.0556C3.19022 34.7342 0 42.4361 0 50.4668V191.774C0 199.805 3.19022 207.507 8.86884 213.185C14.5475 218.864 22.2493 222.054 30.2801 222.054H171.587C179.618 222.054 187.32 218.864 192.999 213.185C198.677 207.507 201.867 199.805 201.867 191.774V50.4668C201.867 42.4361 198.677 34.7342 192.999 29.0556C187.32 23.377 179.618 20.1867 171.587 20.1867ZM181.681 191.774C181.681 194.451 180.617 197.018 178.724 198.911C176.831 200.804 174.264 201.867 171.587 201.867H30.2801C27.6032 201.867 25.0359 200.804 23.143 198.911C21.2501 197.018 20.1867 194.451 20.1867 191.774V100.934H181.681V191.774ZM181.681 80.7469H20.1867V50.4668C20.1867 47.7899 21.2501 45.2226 23.143 43.3298C25.0359 41.4369 27.6032 40.3735 30.2801 40.3735H40.3735V50.4668C40.3735 53.1438 41.4369 55.7111 43.3298 57.6039C45.2226 59.4968 47.7899 60.5602 50.4668 60.5602C53.1438 60.5602 55.7111 59.4968 57.6039 57.6039C59.4968 55.7111 60.5602 53.1438 60.5602 50.4668V40.3735H141.307V50.4668C141.307 53.1438 142.371 55.7111 144.263 57.6039C146.156 59.4968 148.724 60.5602 151.401 60.5602C154.077 60.5602 156.645 59.4968 158.538 57.6039C160.43 55.7111 161.494 53.1438 161.494 50.4668V40.3735H171.587C174.264 40.3735 176.831 41.4369 178.724 43.3298C180.617 45.2226 181.681 47.7899 181.681 50.4668V80.7469ZM50.4668 141.307C52.4631 141.307 54.4146 140.715 56.0744 139.606C57.7343 138.497 59.028 136.921 59.7919 135.076C60.5558 133.232 60.7557 131.203 60.3663 129.245C59.9768 127.287 59.0155 125.488 57.6039 124.077C56.1923 122.665 54.3939 121.704 52.436 121.314C50.478 120.925 48.4486 121.125 46.6043 121.889C44.76 122.653 43.1836 123.946 42.0745 125.606C40.9654 127.266 40.3735 129.218 40.3735 131.214C40.3735 133.891 41.4369 136.458 43.3298 138.351C45.2226 140.244 47.7899 141.307 50.4668 141.307ZM50.4668 181.681C52.4631 181.681 54.4146 181.089 56.0744 179.98C57.7343 178.871 59.028 177.294 59.7919 175.45C60.5558 173.606 60.7557 171.576 60.3663 169.618C59.9768 167.66 59.0155 165.862 57.6039 164.45C56.1923 163.039 54.3939 162.077 52.436 161.688C50.478 161.298 48.4486 161.498 46.6043 162.262C44.76 163.026 43.1836 164.32 42.0745 165.98C40.9654 167.64 40.3735 169.591 40.3735 171.587C40.3735 174.264 41.4369 176.831 43.3298 178.724C45.2226 180.617 47.7899 181.681 50.4668 181.681Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='employee' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 202 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75.7002 92.5225C82.3545 92.5225 88.8593 90.5493 94.3921 86.8524C99.925 83.1555 104.237 77.9009 106.784 71.7532C109.33 65.6055 109.997 58.8407 108.698 52.3142C107.4 45.7878 104.196 39.793 99.4905 35.0877C94.7852 30.3824 88.7904 27.1781 82.264 25.8799C75.7375 24.5817 68.9728 25.248 62.825 27.7945C56.6773 30.3409 51.4227 34.6532 47.7258 40.1861C44.0289 45.7189 42.0557 52.2237 42.0557 58.878C42.0557 67.8011 45.6003 76.3587 51.9099 82.6683C58.2195 88.9779 66.7771 92.5225 75.7002 92.5225Z" fill="black" />
                            <path d="M142.989 109.345C147.98 109.345 152.859 107.865 157.008 105.092C161.158 102.319 164.392 98.3786 166.302 93.7678C168.212 89.157 168.712 84.0834 167.738 79.1886C166.764 74.2938 164.361 69.7976 160.832 66.2686C157.303 62.7397 152.807 60.3364 147.912 59.3628C143.017 58.3892 137.944 58.8889 133.333 60.7987C128.722 62.7086 124.781 65.9428 122.009 70.0924C119.236 74.242 117.756 79.1207 117.756 84.1114C117.756 90.8037 120.414 97.2219 125.147 101.954C129.879 106.686 136.297 109.345 142.989 109.345Z" fill="black" />
                            <path d="M176.634 168.223C178.865 168.223 181.004 167.337 182.582 165.76C184.159 164.182 185.045 162.043 185.045 159.812C185.038 151.951 182.828 144.249 178.666 137.58C174.504 130.912 168.556 125.543 161.497 122.084C154.438 118.624 146.551 117.213 138.73 118.009C130.909 118.805 123.468 121.777 117.251 126.588C109.013 118.382 98.5286 112.799 87.1211 110.543C75.7136 108.288 63.8937 109.46 53.1519 113.914C42.4101 118.367 33.2275 125.901 26.7621 135.566C20.2967 145.232 16.838 156.595 16.8223 168.223C16.8223 170.454 17.7084 172.593 19.2858 174.171C20.8632 175.748 23.0026 176.634 25.2334 176.634H126.167C128.398 176.634 130.537 175.748 132.115 174.171C133.692 172.593 134.578 170.454 134.578 168.223" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='notice' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 211 204" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M93.2066 148.231L102.884 157.909L88.8341 163.098L93.2066 148.231Z" fill="black" />
                            <path d="M29.3342 37.4456H138.838" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 69.8912H133.16" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 102.337H98.7261" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 134.783H78.8418" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M29.3342 167.228H70.4834" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M93.2066 148.231L102.884 157.909L88.8341 163.098L93.2066 148.231Z" fill="black" />
                            <path d="M103.839 157.965L126.812 149.988L190.04 86.7592L163.864 60.5833L100.636 123.812L92.6304 146.812L103.839 157.965Z" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M174.383 50.0642L180.692 43.7559L206.868 69.9318L200.25 76.5499" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M102.164 122.284L128.339 148.46" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M92.6469 146.758L87.0378 163.586L103.902 157.939" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M146.871 79.1473L172.025 104.3" stroke="black" strokeWidth="8.11141" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M163.172 136.214V199.674H5V5H163.172V39.2946" stroke="black" strokeWidth="8.19496" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="admin-content">
                    <ShowPanel />
                </div>
            </section>
        </>
    )
}