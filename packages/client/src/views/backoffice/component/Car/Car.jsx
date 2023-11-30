// Cars (carbrand | carmodel | circulationdate | engine | price | distancetravel)
import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../../../hooks/queryget";
import { useFetchDelete } from "../../../../hooks/querydelete";
import { useFetchPost } from "../../../../hooks/querypost";
import { useFetchPut } from "../../../../hooks/queryput";
import Loading from "../../../../components/Loading/loading";

import Cookies from "universal-cookie";

import styled from 'styled-components';

const OpenModalDelete = styled.div`
        display : ${props => props.showmodal ? 'flex' : 'none'};
        `

const OpenModal = styled.div`
        display : ${props => props.showmodal ? 'flex' : 'none'};
        `

const OpenModalAdd = styled.div`
        display : ${props => props.showmodal ? 'flex' : 'none'};
        `

export default function Cars() {
    // UseState
    const [carbrand, setBrand] = useState("");
    const [carmodel, setModel] = useState("");
    const [circulationdate, setCircu] = useState("");
    const [engine, setEngine] = useState("");
    const [price, setPrice] = useState()
    const [distancetravel, setTravel] = useState();
    const [putStat, setPutStat] = useState(0);
    const [carData, setCarData] = useState([]);

    const imageRef = useRef();


    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);
    const [isAdd, setIsAdd] = useState(false);
    const [isDelete, setIsDelte] = useState(false);

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
    const { callback: postCarsData } = useFetchPost("/cars");

    // Put
    const { callback: putData, dataPut } = useFetchPut("/cars/" + id);

    // Get
    const [data, loading, error] = useFetch("/cars");
    useEffect(() => {
        setCarData(data)
    }, [data])


    // Delete fetch
    const { callback: deleteData } = useFetchDelete("/cars/" + id);

    // Behavior
    // handleAdd, handleDelete, handleUpdate
    const handleAdd = () => {
        setCarData((prevCarData) => [...prevCarData,
        {
            carbrand,
            carmodel,
            circulationdate,
            engine,
            price,
            distancetravel
        }]);
    }

    const handleUpdate = () => {
        const carSelect = carData.find((car) => car.carid == id);
        setCarData((prevCarData) => prevCarData.map((car) => (id == car.carid ?
            { carbrand: carSelect.carbrand, carmodel: carSelect.carmodel, circulationdate, engine, price, distancetravel } : car
        )));
    }

    const handleDelete = () => {
        setCarData((prevCarData) => prevCarData.filter((car) => car.carid !== id));
    };

    const clickDelete = async () => {
        await deleteData();
        handleDelete();
    }

    // Post
    const sendFormCars = async (e) => {
        e.preventDefault();

        // Set value as good type at base string so convert to number only needed
        await postCarsData({
            carbrand,
            carmodel,
            circulationdate,
            engine,
            price,
            distancetravel
        });

        const cookie = new Cookies;
        const tokenValue = cookie.get("token");

        setBrand("");
        setModel("");
        setCircu("");
        setEngine("");
        setPrice("");
        setTravel("");
        handleAdd();

        setIsAdd(!isAdd);
        try {
            // Change file name 
            const newFileName = carbrand + carmodel;

            const formData = new FormData();
            formData.set('image', imageRef.current.files[0], newFileName);

            await fetch('/image', {
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
            circulationdate,
            engine,
            price,
            distancetravel
        });

        setPutStat(dataPut.resStatus);
    }

    const handleSucces = () => {
        setBrand("");
        setModel("");
        setCircu("");
        setEngine("");
        setPrice("");
        setTravel("");
        setIsOpen(!isOpen);

        handleUpdate();
    }

    useEffect(() => {
        if (dataPut.resStatus == 200) {
            handleSucces();
        }
    }, [putStat])

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


    // Instance each rows of the table (carbrand | carmodel | circulationdate | engine | distancetravel)
    const rows = carData.map((cars) => (
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
                        <label className="label-panel">
                            Image
                            <input ref={imageRef} type='file' accept="image/png, image/jpeg" name='image' />
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