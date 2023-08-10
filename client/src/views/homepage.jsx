import '../components/css/homepage.css'

// Components
import Navbar from "../components/navbar"
import ServicesButton from '../components/servicesbut'

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
         
        </section>

      </>
    )
  }
  
  export default Homepage