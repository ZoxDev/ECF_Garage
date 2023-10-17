import { useState, useEffect } from "react";
import { useFetch } from "../../../../hooks/queryget";
import { useFetchPut } from "../../../../hooks/queryput";
import Loading from "../../../../components/Loading/loading";
import styled from 'styled-components';


const OpenModal = styled.div`
        display : ${props => props.showmodal ? 'flex' : 'none'};
        `
export default function Info() {
    // UseState
    const [infoTitle, setTitle] = useState("");
    const [infoText, setContent] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);
    const [stat, setStat] = useState(0);

    const [infoData, setInfoData] = useState([]);

    // Put request
    const { callback: putData, dataPut } = useFetchPut("/infos/" + id);

    // Get to see on table (infoid | infotitle | infotext)
    const [data, loading, error] = useFetch("/infos")
    useEffect(() => {
        setInfoData(data)
    }, [data])

    const handleUpdate = () => {
        const infoSelect = infoData.find((info) => info.infoid == id);
        setInfoData((prevInfoData) => prevInfoData.map((info) => (id == info.infoid ?
            { infoid: infoSelect.infoid ,infotext : infoText, infotitle : infoTitle} : info
        )));
    }    

    const sendFormInfos = async (e) => {
        e.preventDefault();
        await putData({
            infoTitle,
            infoText,
        });
        setStat(dataPut.resStatus);
    }

    useEffect(() => {
        if (dataPut.resStatus == 200) {
            setTitle("");
            setContent("");
            setIsOpen(!isOpen);
            handleUpdate();
        }

    }, [stat]);


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
    const rows = infoData.map((info) => (
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
            <h1 className='section-title'>Informations</h1>
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