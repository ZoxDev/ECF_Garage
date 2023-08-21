// Css
import '../components/css/carspage.css'

// components
import Navbar from '../components/navbar'
import Carscard from '../components/carscard'
import Filterbar from '../components/filterbar'

// Utilities


export default function CarsPage(){


    return(
        <>
        <Navbar/>
        <div className='search-bar'>
            <Filterbar/>
        </div>
        <section className='cars-card-container'>
        
        </section>
        </>
    )
}