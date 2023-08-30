// Css
import '../components/css/carscard.css'

// Utilites
import { useFetch } from '../hooks/queryget';
import Contactcars from './contact-cars';
import Loading from './loading';

export default function Carscard(props) {

    const [data, loading, error] = useFetch("http://localhost:5000/cars")

    if (loading) {
        <Loading></Loading>
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const name = props.carid.carbrand;

    return (
        <>
            <section className='cards-container'>
                <div className='card-image'>
                    IMAGE
                </div>
                <div className='card-content'>
                    <div className='main-info'>
                        <p>{props.carid.carbrand}</p>
                        <p>{props.carid.carmodel}</p>
                    </div>
                    <div className='price-info'>
                        <p>{props.carid.price} €</p>
                    </div>
                   
                        <p className='circu-date'>{props.carid.circulationdate}</p>
                        <p className='engine'>{props.carid.engine}</p>
                        <p className='distance-tavel'>{props.carid.distancetravel} Km</p>
                    
                </div>
                <div className='btn-card'>
                   <Contactcars carName={name}/>
                </div>

            </section>
        </>
    )
}