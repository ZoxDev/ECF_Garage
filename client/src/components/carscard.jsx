// Css
import '../components/css/carscard.css'

// Utilites
import { useFetch } from './queryget';
import Contactcars from './contact-cars';

export default function Carscard(props) {

    const [data, loading, error] = useFetch("http://localhost:5000/cars")

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const name = data[props.carid].carbrand;

    return (
        <>
            <section className='cards-container'>
                <div className='card-image'>
                    IMAGE
                </div>
                <div className='card-content'>
                    <div className='main-info'>
                        <p>{data[props.carid].carbrand}</p>
                        <p>{data[props.carid].carmodel}</p>
                    </div>
                    <div className='price-info'>
                        <p>{data[props.carid].price} €</p>
                    </div>
                   
                        <p className='circu-date'>{data[props.carid].circulationdate}</p>
                        <p className='engine'>{data[props.carid].engine}</p>
                        <p className='distance-tavel'>{data[props.carid].distancetravel} Km</p>
                    
                </div>
                <div className='btn-card'>
                   <Contactcars carName={name}/>
                </div>

            </section>
        </>
    )
}