/* eslint-disable react/jsx-key */
// Css
import './carspage.css'

// components
import Navbar from '../../components/Navbar/navbar'
import Carscard from '../../components/CarsCard/carscard'
import FilterBar from '../../components/FilterBar/filterbar'
import Loading from '../../components/Loading/loading'
import Footer from '../Footer/footer'

// Utilities
import styled from 'styled-components'
import { useFetch } from '../../hooks/queryget'
import { useState } from 'react'

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CarsPage() {

    // UseState Filter
    const [priceFilter, setPriceFilter] = useState();
    const [circulation, setCirculation] = useState();
    const [distance, setDistance] = useState();
    const [engine, setEngine] = useState("");

    // Final filter
    const [filteredData, setFilteredData] = useState([]);

    // IsFiltered ?
    const [isFiltered, setIsFiltered] = useState(false);

    // Get all the cars
    const [data, loading, error] = useFetch("/cars")
    if (loading) {
        <Loading></Loading>
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    let newData = []
    const globalFilter = () => {
        if (priceFilter > 0) {
            if (newData.length != 0) {
                newData = newData.filter(car => car.price <= priceFilter);
            } else {
                newData = data.filter(car => car.price <= priceFilter);
            }
        }
        else {
            if(newData < 0){
                toast.warning("Le prix doit être supérieur à 0€");
            }
        }

        if (circulation > 0) {
            if (newData.length != 0) {
                newData = newData.filter(car => car.circulationdate >= circulation);
            } else {
                newData = data.filter(car => car.circulationdate >= circulation);
            }
        }
        else {
            if(newData < 0){
                toast.warning("L'année doit être supérieur à 0");
            }
        }

        if (distance > 0) {
            if (newData.length != 0) {
                newData = newData.filter(car => car.distancetravel <= distance);
            } else {
                newData = data.filter(car => car.distancetravel <= distance);
            }
        }
        else {
            if(newData < 0){
                toast.warning("La distance doit être supérieur à 0km");
            }
        }

        if (engine != "") {
            if (newData.length != 0) {
                newData = newData.filter(car => car.engine == engine);
            } else {
                newData = data.filter(car => car.engine == engine);
            }
        }
        else {
            if(newData < 0){
                toast.warning("Le moteur doit être renseigné");
            }
        }

        setFilteredData(newData)
        setIsFiltered(true);
    }

    const stopFilter = () => {
        setIsFiltered(false);
        setPriceFilter("");
        setCirculation("");
        setDistance("");
        setEngine("");
    }

    const NewData = styled.div`
        display: ${isFiltered ? `block` : `none`};
    `

    const NormalData = styled.div`
        display: ${isFiltered ? `none` : `block`};
    `

    if (filteredData.length == 0 && isFiltered == true) {
        return (
            <>
                <button onClick={stopFilter} className='btn-nodata'><svg width="30" height="30" viewBox="0 0 117 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M108.533 9.31885L8.68677 109.165" stroke="black" strokeWidth="16.641" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.68677 9.31885L108.533 109.165" stroke="black" strokeWidth="16.641" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </button>
                <section className='section-nodata'>
                    <div className='rolling-image'>😭</div>
                    <p className='text-nodata'>Nous n'avons pas de voiture qui vous convienne chez nous.</p>
                </section>
            </>
        )
    }
    // Basic render
    return (
        <>
            <Navbar />
            <section className='page-container'>
                <div className='search-bar'>
                    <FilterBar
                        myPrice={priceFilter} myPriceFunc={(value) => setPriceFilter(value)}
                        myCircu={circulation} myCircuFunc={(value) => setCirculation(value)}
                        myDist={distance} myDistFunc={(value) => setDistance(value)}
                        myEngine={engine} myEngineFunc={(value) => setEngine(value)}
                    />

                    <div className='btn-filter'>
                        <button className='btn-carspage' onClick={globalFilter}>RECHERCHER</button>
                        <button className='stop-filter' onClick={stopFilter}><svg width="20" height="20" viewBox="0 0 117 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M108.533 9.31885L8.68677 109.165" stroke="black" strokeWidth="16.641" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.68677 9.31885L108.533 109.165" stroke="black" strokeWidth="16.641" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </button>
                    </div>

                </div>

                <NewData>
                    <section className='cars-card-container'>pm create vite@latest
                        {filteredData.map(element => (
                            <div className='multiple-div-card'>
                                <Carscard carid={element}></Carscard>
                            </div>
                        ))}
                    </section>
                </NewData >

                <NormalData>
                    <section className='cars-card-container'>
                        {data.map(element => (
                            <div className='multiple-div-card'>
                                <Carscard carid={element}></Carscard>
                            </div>
                        ))}
                    </section>
                </NormalData>
            </section>
            <footer id='footer'>
                <Footer />
            </footer>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}