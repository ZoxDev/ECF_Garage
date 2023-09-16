// Css
import '../../components/css/admin.css'

// Components
import Navbar from '../../components/navbar';
import Loading from '../../components/loading';

// Utils
import { useFetch } from "../../hooks/queryget";
import { useState, useEffect, useRef } from 'react';
import { useFetchPut } from '../../hooks/queryput';
import { useFetchPost } from '../../hooks/querypost';
import { useFetchDelete } from '../../hooks/querydelete';
import styled from 'styled-components';
import Cookies from 'universal-cookie';

const OpenModalDelete = styled.div`
        display : ${props => props.showmodal ? 'flex' : 'none'};
        `

const OpenModal = styled.div`
        display : ${props => props.showmodal ? 'flex' : 'none'};
        `

const OpenModalAdd = styled.div`
        display : ${props => props.showmodal ? 'flex' : 'none'};
        `

export default function AdminBack() {
    // UseState
    const [selectPanel, setSelectPanel] = useState("");

    // Cars (carbrand | carmodel | circulationdate | engine | price | distancetravel)
    const Cars = () => {
        // UseState
        const [carbrand, setBrand] = useState("");
        const [carmodel, setModel] = useState("");
        const [circulationdate, setCircu] = useState("");
        const [engine, setEngine] = useState("");
        const [price, setPrice] = useState()
        const [distancetravel, setTravel] = useState();
        const [image, setImage] = useState("");
        const [imageName, setImageName] = useState("");

        const imageRef = useRef();


        const [isOpen, setIsOpen] = useState(false);
        const [id, setId] = useState(0);
        const [isAdd, setIsAdd] = useState(false);
        const [isDelete, setIsDelte] = useState(false);
        const [postStatus, setPostStatus] = useState(0);
        const [putStatus, setPutStatus] = useState(0);

        // Button functions
        const closeAdd = () => {
            setIsAdd(!isAdd);
        }

        const onClickAdd = () => {
            setIsAdd(!isAdd);
        }

        const closeDelete = () => {
            setIsDelte(!isDelete);
        }

        const closeBtn = () => {
            setIsOpen(!isOpen);
        }

        // Post request cars
        const { callback: postCarsData, dataPost } = useFetchPost("http://localhost:5000/cars");

        // Put
        const { callback: putData, dataPut } = useFetchPut("http://localhost:5000/cars/" + id);

        // Get
        const [data, loading, error] = useFetch("http://localhost:5000/cars");

        // Delete fetch
        const { callback: deleteData } = useFetchDelete("http://localhost:5000/cars/" + id);
        const clickDelete = async () => {
            await deleteData();
            console.log()
        }

        // Post
        const sendFormCars = async (e) => {
            e.preventDefault();
            await postCarsData({
                carbrand,
                carmodel,
                circulationdate,
                engine,
                price,
                distancetravel,
            });
            setPostStatus(dataPost.resStatus);

            const cookie = new Cookies;
            const tokenValue = cookie.get("token");

            try {
                // Change file name 
                const newFileName = carbrand + carmodel;

                const formData = new FormData();
                formData.set('image', imageRef.current.files[0], newFileName);
          
                await fetch('http://localhost:5000/image', {
                  method: 'POST',
                  headers: {
                    "token": tokenValue
                  },
                  body: formData,
                });
          
            } catch (err) {
                console.error(err);
            }
        }

        // Put
        const sendFormCarsPut = async (e) => {
            e.preventDefault();
            await putData({
                carbrand,
                carmodel,
                circulationdate,
                engine,
                price,
                distancetravel
            });
            setPutStatus(dataPut.resStatus);
        }

        // Put to update (btn right to table)
        const onClickBtn = () => {
            setIsOpen(!isOpen);
        }

        // For succes request
        const handleSuccesSubmit = () => {
            if (dataPost.resStatus == 200 || dataPut.resStatus == 200) {
                setBrand("");
                setModel("");
                setCircu("");
                setEngine("");
                setPrice("");
                setTravel("");
                setImage("");
            }
        }

        // Change every time res Status change
        useEffect(() => {
            handleSuccesSubmit();

            setIsAdd(false);
        }, [postStatus])      


        useEffect(() => {
            handleSuccesSubmit();

            setIsOpen(false);
        }, [putStatus])

        // Get
        if (loading) {
            <Loading></Loading>
        }
        if (error) {
            return <p>Error: {error}</p>;
        }

        // Instance each rows of the table (carbrand | carmodel | circulationdate | engine | distancetravel)
        const rows = data.map((cars) => (
            <>
                <tr key={cars.carid}>
                    <td>{cars.carbrand}</td>
                    <td>{cars.carmodel}</td>
                    <td>{cars.circulationdate}</td>
                    <td>{cars.engine}</td>
                    <td>{cars.price}</td>
                    <td>{cars.distancetravel}</td>
                    <td>
                        <button onClick={() => {
                            onClickBtn();
                            setId(cars.carid);
                        }}>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.474 3.60677L21.3889 7.5217C21.5538 7.68663 21.5538 7.95573 21.3889 8.12066L11.9097 17.5998L7.88194 18.0469C7.34375 18.1076 6.88802 17.6519 6.94878 17.1137L7.39583 13.0859L16.875 3.60677C17.0399 3.44184 17.309 3.44184 17.474 3.60677ZM24.5052 2.61285L22.3872 0.494792C21.7274 -0.164931 20.6554 -0.164931 19.9913 0.494792L18.4549 2.03125C18.2899 2.19618 18.2899 2.46528 18.4549 2.63021L22.3698 6.54514C22.5347 6.71007 22.8038 6.71007 22.9687 6.54514L24.5052 5.00868C25.1649 4.34462 25.1649 3.27257 24.5052 2.61285ZM16.6667 15.0217V19.4401H2.77778V5.55122H12.7517C12.8906 5.55122 13.0208 5.49479 13.1207 5.39931L14.8568 3.66319C15.1866 3.33333 14.9523 2.77344 14.4878 2.77344H2.08333C0.93316 2.77344 0 3.7066 0 4.85677V20.1345C0 21.2847 0.93316 22.2179 2.08333 22.2179H17.3611C18.5113 22.2179 19.4444 21.2847 19.4444 20.1345V13.2856C19.4444 12.8212 18.8845 12.5911 18.5547 12.9167L16.8186 14.6528C16.7231 14.7526 16.6667 14.8828 16.6667 15.0217Z" fill="black" />
                            </svg>
                        </button>
                    </td>
                    <button onClick={() => {
                        setIsDelte(!isDelete);
                        setId(cars.carid);
                    }}>
                        <svg width="27" height="30" viewBox="0 0 191 212" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M74.5481 169.083C77.3468 169.083 80.031 167.971 82.01 165.992C83.989 164.013 85.1009 161.329 85.1009 158.53V95.2135C85.1009 92.4147 83.989 89.7306 82.01 87.7515C80.031 85.7725 77.3468 84.6607 74.5481 84.6607C71.7493 84.6607 69.0651 85.7725 67.0861 87.7515C65.1071 89.7306 63.9953 92.4147 63.9953 95.2135V158.53C63.9953 161.329 65.1071 164.013 67.0861 165.992C69.0651 167.971 71.7493 169.083 74.5481 169.083ZM180.076 42.4495H137.865V31.8967C137.865 23.5003 134.529 15.4479 128.592 9.51081C122.655 3.57371 114.603 0.238281 106.206 0.238281H85.1009C76.7045 0.238281 68.6521 3.57371 62.715 9.51081C56.7779 15.4479 53.4425 23.5003 53.4425 31.8967V42.4495H11.2313C8.43249 42.4495 5.74834 43.5613 3.76931 45.5403C1.79028 47.5194 0.678467 50.2035 0.678467 53.0023C0.678467 55.8011 1.79028 58.4852 3.76931 60.4642C5.74834 62.4433 8.43249 63.5551 11.2313 63.5551H21.7841V179.636C21.7841 188.032 25.1195 196.085 31.0566 202.022C36.9937 207.959 45.0461 211.294 53.4425 211.294H137.865C146.261 211.294 154.314 207.959 160.251 202.022C166.188 196.085 169.523 188.032 169.523 179.636V63.5551H180.076C182.875 63.5551 185.559 62.4433 187.538 60.4642C189.517 58.4852 190.629 55.8011 190.629 53.0023C190.629 50.2035 189.517 47.5194 187.538 45.5403C185.559 43.5613 182.875 42.4495 180.076 42.4495ZM74.5481 31.8967C74.5481 29.0979 75.6599 26.4138 77.6389 24.4347C79.6179 22.4557 82.3021 21.3439 85.1009 21.3439H106.206C109.005 21.3439 111.689 22.4557 113.668 24.4347C115.647 26.4138 116.759 29.0979 116.759 31.8967V42.4495H74.5481V31.8967ZM148.418 179.636C148.418 182.435 147.306 185.119 145.327 187.098C143.348 189.077 140.664 190.189 137.865 190.189H53.4425C50.6437 190.189 47.9595 189.077 45.9805 187.098C44.0015 185.119 42.8897 182.435 42.8897 179.636V63.5551H148.418V179.636ZM116.759 169.083C119.558 169.083 122.242 167.971 124.221 165.992C126.2 164.013 127.312 161.329 127.312 158.53V95.2135C127.312 92.4147 126.2 89.7306 124.221 87.7515C122.242 85.7725 119.558 84.6607 116.759 84.6607C113.96 84.6607 111.276 85.7725 109.297 87.7515C107.318 89.7306 106.206 92.4147 106.206 95.2135V158.53C106.206 161.329 107.318 164.013 109.297 165.992C111.276 167.971 113.96 169.083 116.759 169.083Z" fill="#FF0000" />
                        </svg>
                    </button>
                </tr>
            </>

        ));

        //Cars SECTION
        return (
            <>
                <h1 className='section-title'>Voitures</h1>
                <button className='btn-add' onClick={onClickAdd}>AJOUTEZ</button>
                {/* Modal */}
                <OpenModalAdd className='modal-panel' showmodal={isAdd}>
                    <button className='btn-panel' onClick={closeAdd}>
                        <svg width="30" height="30" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.92328 3.64741C4.6373 1.93391 6.96169 0.971323 9.38531 0.971323C11.8089 0.971323 14.1333 1.93391 15.8473 3.64741L64.2257 52.0258L112.604 3.64741C113.447 2.77444 114.456 2.07813 115.571 1.59911C116.686 1.12009 117.885 0.867947 119.099 0.857401C120.313 0.846855 121.516 1.07811 122.639 1.53768C123.763 1.99725 124.783 2.67593 125.641 3.53412C126.5 4.3923 127.178 5.41281 127.638 6.53609C128.097 7.65937 128.329 8.86293 128.318 10.0765C128.308 11.2902 128.055 12.4895 127.576 13.6046C127.097 14.7198 126.401 15.7283 125.528 16.5715L77.1498 64.9498L125.528 113.328C127.193 115.052 128.114 117.361 128.094 119.757C128.073 122.154 127.111 124.446 125.417 126.141C123.722 127.836 121.43 128.797 119.033 128.818C116.637 128.838 114.328 127.917 112.604 126.252L64.2257 77.8739L15.8473 126.252C14.1235 127.917 11.8147 128.838 9.4182 128.818C7.0217 128.797 4.72926 127.836 3.03462 126.141C1.33998 124.446 0.378723 122.154 0.357898 119.757C0.337073 117.361 1.25834 115.052 2.92328 113.328L51.3017 64.9498L2.92328 16.5715C1.20978 14.8574 0.247192 12.5331 0.247192 10.1094C0.247192 7.68582 1.20978 5.36143 2.92328 3.64741Z" fill="#0D0D0D" />
                        </svg>
                    </button>
                    <div>
                        <form className='form-panel' onSubmit={sendFormCars} encType="multipart/form-data">
                            <label className='label-panel'>
                                Marque
                                <input value={carbrand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Audi" />
                            </label>
                            <label className='label-panel'>
                                Model
                                <input value={carmodel} onChange={(e) => setModel(e.target.value)} placeholder='RS6' />
                            </label>
                            <label className='label-panel'>
                                Date de circulation
                                <input value={circulationdate} onChange={(e) => setCircu(e.target.value)} type="text" placeholder='2019' />
                            </label>
                            <label className='label-panel'>
                                Motorisation
                                <input value={engine} onChange={(e) => setEngine(e.target.value)} type="text" placeholder='Diesel' />
                            </label>
                            <label className='label-panel'>
                                Prix
                                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder='€' />
                            </label>
                            <label className='label-panel'>
                                Distance
                                <input value={distancetravel} onChange={(e) => setTravel(e.target.value)} type="text" placeholder='1500 (km)' />
                            </label>
                            <label>
                                Image
                                <input ref={imageRef} type='file' accept="image/png, image/jpeg" name='image'/>
                            </label>
                            <button type='submit'>Envoyez</button>
                        </form>
                    </div>
                </OpenModalAdd>
                <OpenModal className='modal-panel' showmodal={isOpen}>
                    <div className='modal-update'>
                        <button className='btn-panel' onClick={closeBtn}>
                            <svg width="30" height="30" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.92328 3.64741C4.6373 1.93391 6.96169 0.971323 9.38531 0.971323C11.8089 0.971323 14.1333 1.93391 15.8473 3.64741L64.2257 52.0258L112.604 3.64741C113.447 2.77444 114.456 2.07813 115.571 1.59911C116.686 1.12009 117.885 0.867947 119.099 0.857401C120.313 0.846855 121.516 1.07811 122.639 1.53768C123.763 1.99725 124.783 2.67593 125.641 3.53412C126.5 4.3923 127.178 5.41281 127.638 6.53609C128.097 7.65937 128.329 8.86293 128.318 10.0765C128.308 11.2902 128.055 12.4895 127.576 13.6046C127.097 14.7198 126.401 15.7283 125.528 16.5715L77.1498 64.9498L125.528 113.328C127.193 115.052 128.114 117.361 128.094 119.757C128.073 122.154 127.111 124.446 125.417 126.141C123.722 127.836 121.43 128.797 119.033 128.818C116.637 128.838 114.328 127.917 112.604 126.252L64.2257 77.8739L15.8473 126.252C14.1235 127.917 11.8147 128.838 9.4182 128.818C7.0217 128.797 4.72926 127.836 3.03462 126.141C1.33998 124.446 0.378723 122.154 0.357898 119.757C0.337073 117.361 1.25834 115.052 2.92328 113.328L51.3017 64.9498L2.92328 16.5715C1.20978 14.8574 0.247192 12.5331 0.247192 10.1094C0.247192 7.68582 1.20978 5.36143 2.92328 3.64741Z" fill="#0D0D0D" />
                            </svg>
                        </button>
                        <form className='form-panel' onSubmit={sendFormCarsPut}>
                            <label className='label-panel'>
                                Marque
                                <input value={carbrand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Audi" />
                            </label>
                            <label className='label-panel'>
                                Model
                                <input value={carmodel} onChange={(e) => setModel(e.target.value)} placeholder='RS6' />
                            </label>
                            <label className='label-panel'>
                                Date de circulation
                                <input value={circulationdate} onChange={(e) => setCircu(e.target.value)} type="text" placeholder='2019' />
                            </label>
                            <label className='label-panel'>
                                Motorisation
                                <input value={engine} onChange={(e) => setEngine(e.target.value)} type="text" placeholder='Diesel' />
                            </label>
                            <label className='label-panel'>
                                Prix
                                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder='€' />
                            </label>
                            <label className='label-panel'>
                                Distance
                                <input value={distancetravel} onChange={(e) => setTravel(e.target.value)} type="text" placeholder='1500 (km)' />
                            </label>
                            <button type='submit'>Envoyez</button>
                        </form>
                    </div>
                </OpenModal>
                <table>
                    <thead>
                        <tr>
                            <th>Marque</th>
                            <th>Model</th>
                            <th>Date de Circulation</th>
                            <th>Moteur</th>
                            <th>Prix</th>
                            <th>Distance</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>

                    </thead>
                    <tbody>
                        {rows}
                        <OpenModalDelete showmodal={isDelete}>
                            <section className='delete-modal'>
                                <h1 className='delete-modal-hone'>Vraiment supprimer ?</h1>
                                <div className='delete-modal-btns'>
                                    <button onClick={() => {
                                        clickDelete();
                                        setIsDelte(!isDelete);
                                    }}>
                                        Oui
                                    </button>
                                    <button onClick={closeDelete}>Non</button>
                                </div>
                            </section>

                        </OpenModalDelete>
                    </tbody>
                </table>

            </>
        )
    }

    // Notice
    const CarMessage = () => {
        // Notice ( carmessageid | carusermail | carusermessagee )
        // Use states
        const [isOpen, setIsOpen] = useState(false);
        const [id, setId] = useState("");

        // Delete fetch
        const { callback: deleteData } = useFetchDelete("http://localhost:5000/carsmessage/" + id)

        // Get fetch
        let [data, loading, error] = useFetch("http://localhost:5000/carsmessage")

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

        // Instance each rows of the table ( carmessageid | carusermail | carusermessagee )
        const rows = data.map((carm) => (
            <tr key={carm.carmessageid}>
                <td>{carm.carmessageid}</td>
                <td>{carm.carusermail}</td>
                <td>{carm.carusermessage}</td>
                <td>
                    <button onClick={() => {
                        setIsOpen(!isOpen);
                        setId(carm.carmessageid);
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
                <h1>Les demande de renseingnement !</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Mail</th>
                            <th>Message</th>
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
            case "cars":
                return <Cars />
            case "carsmessage":
                return <CarMessage />
            case "notice":
                return <Notice />
            default:
                return <Cars />
        }
    }

    // THE PAGE
    return (
        <>
            <section className="admin-container">
                <Navbar />

                {/* Mobile */}
                <div className="admin-menu-mobile">
                    <button onClick={onClickButton} id='cars' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.5558 6.58748H23.4376L22.5709 4.42082C21.6803 2.19321 19.5547 0.75415 17.1553 0.75415H10.5407C8.14173 0.75415 6.01568 2.19321 5.12454 4.42082L4.25787 6.58748H1.14016C0.733392 6.58748 0.434955 6.96978 0.533913 7.36405L0.846413 8.61405C0.915684 8.89217 1.16568 9.08748 1.45266 9.08748H2.49798C1.7985 9.69842 1.34798 10.5864 1.34798 11.5875V14.0875C1.34798 14.9271 1.66881 15.6849 2.18131 16.2713V19.0875C2.18131 20.0078 2.92766 20.7541 3.84798 20.7541H5.51464C6.43495 20.7541 7.18131 20.0078 7.18131 19.0875V17.4208H20.5146V19.0875C20.5146 20.0078 21.261 20.7541 22.1813 20.7541H23.848C24.7683 20.7541 25.5146 20.0078 25.5146 19.0875V16.2713C26.0271 15.6854 26.348 14.9276 26.348 14.0875V11.5875C26.348 10.5864 25.8975 9.69842 25.1985 9.08748H26.2438C26.5308 9.08748 26.7808 8.89217 26.8501 8.61405L27.1626 7.36405C27.261 6.96978 26.9626 6.58748 26.5558 6.58748ZM8.21933 5.65884C8.59902 4.70988 9.51829 4.08748 10.5407 4.08748H17.1553C18.1777 4.08748 19.0969 4.70988 19.4766 5.65884L20.5146 8.25415H7.18131L8.21933 5.65884ZM5.51464 14.0771C4.51464 14.0771 3.84798 13.4125 3.84798 12.4156C3.84798 11.4187 4.51464 10.7542 5.51464 10.7542C6.51464 10.7542 8.01464 12.2495 8.01464 13.2463C8.01464 14.2432 6.51464 14.0771 5.51464 14.0771ZM22.1813 14.0771C21.1813 14.0771 19.6813 14.2432 19.6813 13.2463C19.6813 12.2495 21.1813 10.7542 22.1813 10.7542C23.1813 10.7542 23.848 11.4187 23.848 12.4156C23.848 13.4125 23.1813 14.0771 22.1813 14.0771Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='carsmessage' className="btn-admin">
                        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.8916 3.10831C13.5243 1.73206 11.7197 0.875989 9.78883 0.687679C7.85798 0.49937 5.92193 0.990626 4.31446 2.07675C2.70699 3.16288 1.52884 4.77582 0.983113 6.63749C0.437387 8.49916 0.558289 10.4929 1.32498 12.275C1.40488 12.4406 1.4311 12.6271 1.39998 12.8083L0.666643 16.3333C0.63839 16.4685 0.644159 16.6085 0.683433 16.7409C0.722706 16.8732 0.794253 16.9938 0.891643 17.0916C0.97148 17.1709 1.06654 17.2332 1.17109 17.2747C1.27564 17.3162 1.38752 17.3362 1.49998 17.3333H1.66664L5.23331 16.6166C5.41458 16.5948 5.59841 16.6207 5.76664 16.6916C7.54873 17.4583 9.54246 17.5792 11.4041 17.0335C13.2658 16.4878 14.8787 15.3096 15.9649 13.7022C17.051 12.0947 17.5422 10.1586 17.3539 8.22779C17.1656 6.29695 16.3096 4.4923 14.9333 3.12498L14.8916 3.10831ZM5.66664 9.83331C5.50182 9.83331 5.34071 9.78444 5.20367 9.69287C5.06663 9.6013 4.95982 9.47115 4.89674 9.31888C4.83367 9.16661 4.81717 8.99905 4.84932 8.8374C4.88148 8.67575 4.96084 8.52727 5.07739 8.41072C5.19393 8.29418 5.34242 8.21481 5.50407 8.18266C5.66572 8.1505 5.83327 8.167 5.98555 8.23008C6.13782 8.29315 6.26797 8.39996 6.35953 8.537C6.4511 8.67404 6.49998 8.83516 6.49998 8.99998C6.49998 9.22099 6.41218 9.43295 6.2559 9.58923C6.09962 9.74551 5.88766 9.83331 5.66664 9.83331ZM8.99998 9.83331C8.83516 9.83331 8.67404 9.78444 8.537 9.69287C8.39996 9.6013 8.29315 9.47115 8.23008 9.31888C8.167 9.16661 8.1505 8.99905 8.18265 8.8374C8.21481 8.67575 8.29418 8.52727 8.41072 8.41072C8.52726 8.29418 8.67575 8.21481 8.8374 8.18266C8.99905 8.1505 9.16661 8.167 9.31888 8.23008C9.47115 8.29315 9.6013 8.39996 9.69287 8.537C9.78443 8.67404 9.83331 8.83516 9.83331 8.99998C9.83331 9.22099 9.74551 9.43295 9.58923 9.58923C9.43295 9.74551 9.22099 9.83331 8.99998 9.83331ZM12.3333 9.83331C12.1685 9.83331 12.0074 9.78444 11.8703 9.69287C11.7333 9.6013 11.6265 9.47115 11.5634 9.31888C11.5003 9.16661 11.4838 8.99905 11.516 8.8374C11.5481 8.67575 11.6275 8.52727 11.7441 8.41072C11.8606 8.29418 12.0091 8.21481 12.1707 8.18266C12.3324 8.1505 12.4999 8.167 12.6522 8.23008C12.8045 8.29315 12.9346 8.39996 13.0262 8.537C13.1178 8.67404 13.1666 8.83516 13.1666 8.99998C13.1666 9.22099 13.0788 9.43295 12.9226 9.58923C12.7663 9.74551 12.5543 9.83331 12.3333 9.83331Z" fill="black" />
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

                {/* DeskTop */}
                <div className="admin-menu-desktop">
                    <button onClick={onClickButton} id='cars' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.5558 6.58748H23.4376L22.5709 4.42082C21.6803 2.19321 19.5547 0.75415 17.1553 0.75415H10.5407C8.14173 0.75415 6.01568 2.19321 5.12454 4.42082L4.25787 6.58748H1.14016C0.733392 6.58748 0.434955 6.96978 0.533913 7.36405L0.846413 8.61405C0.915684 8.89217 1.16568 9.08748 1.45266 9.08748H2.49798C1.7985 9.69842 1.34798 10.5864 1.34798 11.5875V14.0875C1.34798 14.9271 1.66881 15.6849 2.18131 16.2713V19.0875C2.18131 20.0078 2.92766 20.7541 3.84798 20.7541H5.51464C6.43495 20.7541 7.18131 20.0078 7.18131 19.0875V17.4208H20.5146V19.0875C20.5146 20.0078 21.261 20.7541 22.1813 20.7541H23.848C24.7683 20.7541 25.5146 20.0078 25.5146 19.0875V16.2713C26.0271 15.6854 26.348 14.9276 26.348 14.0875V11.5875C26.348 10.5864 25.8975 9.69842 25.1985 9.08748H26.2438C26.5308 9.08748 26.7808 8.89217 26.8501 8.61405L27.1626 7.36405C27.261 6.96978 26.9626 6.58748 26.5558 6.58748ZM8.21933 5.65884C8.59902 4.70988 9.51829 4.08748 10.5407 4.08748H17.1553C18.1777 4.08748 19.0969 4.70988 19.4766 5.65884L20.5146 8.25415H7.18131L8.21933 5.65884ZM5.51464 14.0771C4.51464 14.0771 3.84798 13.4125 3.84798 12.4156C3.84798 11.4187 4.51464 10.7542 5.51464 10.7542C6.51464 10.7542 8.01464 12.2495 8.01464 13.2463C8.01464 14.2432 6.51464 14.0771 5.51464 14.0771ZM22.1813 14.0771C21.1813 14.0771 19.6813 14.2432 19.6813 13.2463C19.6813 12.2495 21.1813 10.7542 22.1813 10.7542C23.1813 10.7542 23.848 11.4187 23.848 12.4156C23.848 13.4125 23.1813 14.0771 22.1813 14.0771Z" fill="black" />
                        </svg>
                    </button>
                    <button onClick={onClickButton} id='carsmessage' className="btn-admin">
                        <svg width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.8916 3.10831C13.5243 1.73206 11.7197 0.875989 9.78883 0.687679C7.85798 0.49937 5.92193 0.990626 4.31446 2.07675C2.70699 3.16288 1.52884 4.77582 0.983113 6.63749C0.437387 8.49916 0.558289 10.4929 1.32498 12.275C1.40488 12.4406 1.4311 12.6271 1.39998 12.8083L0.666643 16.3333C0.63839 16.4685 0.644159 16.6085 0.683433 16.7409C0.722706 16.8732 0.794253 16.9938 0.891643 17.0916C0.97148 17.1709 1.06654 17.2332 1.17109 17.2747C1.27564 17.3162 1.38752 17.3362 1.49998 17.3333H1.66664L5.23331 16.6166C5.41458 16.5948 5.59841 16.6207 5.76664 16.6916C7.54873 17.4583 9.54246 17.5792 11.4041 17.0335C13.2658 16.4878 14.8787 15.3096 15.9649 13.7022C17.051 12.0947 17.5422 10.1586 17.3539 8.22779C17.1656 6.29695 16.3096 4.4923 14.9333 3.12498L14.8916 3.10831ZM5.66664 9.83331C5.50182 9.83331 5.34071 9.78444 5.20367 9.69287C5.06663 9.6013 4.95982 9.47115 4.89674 9.31888C4.83367 9.16661 4.81717 8.99905 4.84932 8.8374C4.88148 8.67575 4.96084 8.52727 5.07739 8.41072C5.19393 8.29418 5.34242 8.21481 5.50407 8.18266C5.66572 8.1505 5.83327 8.167 5.98555 8.23008C6.13782 8.29315 6.26797 8.39996 6.35953 8.537C6.4511 8.67404 6.49998 8.83516 6.49998 8.99998C6.49998 9.22099 6.41218 9.43295 6.2559 9.58923C6.09962 9.74551 5.88766 9.83331 5.66664 9.83331ZM8.99998 9.83331C8.83516 9.83331 8.67404 9.78444 8.537 9.69287C8.39996 9.6013 8.29315 9.47115 8.23008 9.31888C8.167 9.16661 8.1505 8.99905 8.18265 8.8374C8.21481 8.67575 8.29418 8.52727 8.41072 8.41072C8.52726 8.29418 8.67575 8.21481 8.8374 8.18266C8.99905 8.1505 9.16661 8.167 9.31888 8.23008C9.47115 8.29315 9.6013 8.39996 9.69287 8.537C9.78443 8.67404 9.83331 8.83516 9.83331 8.99998C9.83331 9.22099 9.74551 9.43295 9.58923 9.58923C9.43295 9.74551 9.22099 9.83331 8.99998 9.83331ZM12.3333 9.83331C12.1685 9.83331 12.0074 9.78444 11.8703 9.69287C11.7333 9.6013 11.6265 9.47115 11.5634 9.31888C11.5003 9.16661 11.4838 8.99905 11.516 8.8374C11.5481 8.67575 11.6275 8.52727 11.7441 8.41072C11.8606 8.29418 12.0091 8.21481 12.1707 8.18266C12.3324 8.1505 12.4999 8.167 12.6522 8.23008C12.8045 8.29315 12.9346 8.39996 13.0262 8.537C13.1178 8.67404 13.1666 8.83516 13.1666 8.99998C13.1666 9.22099 13.0788 9.43295 12.9226 9.58923C12.7663 9.74551 12.5543 9.83331 12.3333 9.83331Z" fill="black" />
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