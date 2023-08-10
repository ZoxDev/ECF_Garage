import '../components/css/homepage.css'
// Images
import motor from '../assets/images/motor.jpg'
import entretien from '../assets/images/entretien.png'
import cardeal from '../assets/images/cardeal.jpg'

// Components
import Navbar from "../components/navbar"
import ServicesButton from '../components/servicesbut'
import Info from '../components/info'

function Homepage() {

    return (
      <>
        <Navbar />
        {/* First section */}
        <section className="first-section ">
        <p className='text'>Faites de votre véhicule un endroit sur et agréable.</p>
        <ServicesButton link="#second"/>
        </section>

        {/* Second section */}
        <section id='second' className="second-section">
          <Info url={motor}/>
          <Info url={entretien}/>
          <Info url={cardeal}/>
        </section>

        {/* Third section */}
        <section className='third-section'>

        </section>
      </>
    )
  }
  
  export default Homepage