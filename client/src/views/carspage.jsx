/* eslint-disable react/jsx-key */
// Css
import '../components/css/carspage.css'

// components
import Navbar from '../components/navbar'
import Carscard from '../components/carscard'
import Filterbar from '../components/filterbar'


// Utilities
import Footer from './footer'
import { useFetch } from '../hooks/queryget'

export default function CarsPage() {

    const [data, loading, error] = useFetch("http://localhost:5000/cars")

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const length = data.length;

    return (
        <>
            <Navbar />
            <section className='page-container'>
                <div className='search-bar'>
                    <Filterbar />
                </div>
                <section className='cars-card-container'>
                    {data.map( length => (
                        <div className='multiple-div-card'>
                        <Carscard carid={data.indexOf(length)}></Carscard>
                        </div>
                    ))}
                </section>
            </section>
            <Footer></Footer>
        </>

    )
}