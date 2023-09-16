import '../components/css/homepage.css'
// Images
import motor from '../assets/images/motor.jpg'
import entretien from '../assets/images/entretien.png'
import cardeal from '../assets/images/cardeal.jpg'

// Components
import Navbar from "../components/navbar"
import ServicesButton from '../components/servicesbut'
import Info from '../components/info'
import Noticecard from '../components/noticecard'

// page
import Footer from './footer'

// Use
import { useState } from 'react'
// import { gsap } from 'gsap'

function Homepage() {

  // Carrousel
  let [currentNotice, setCurrentNotice] = useState(0);

  const nextNotice = () => {
    setCurrentNotice(currentNotice + 1);
  }

  const prevNotice = () => {
    setCurrentNotice(currentNotice - 1);

    if (currentNotice <= 0) {
      setCurrentNotice(currentNotice = 0);
    }
  }


  return (
    <>
      <Navbar />
      {/* First section */}
      <section className="first-section ">
        <p className='text'>Faites de votre véhicule un endroit sur et agréable.</p>
        <ServicesButton link="#second" />
      </section>

      {/* Second section */}
      <section id='second' className="second-section">
        <Info infid={6} url={motor} id='inf1' />
        <Info infid={9} url={cardeal} id='inf3' />
        <Info infid={7} url={entretien} id='inf2' />
      </section>

      {/* Third section */}
      <section className='third-section'>
        {/* <Banderole /> */}
        <button className='prev-button' onClick={prevNotice}></button>
        <div className='notice-side'>
          <Noticecard notid={currentNotice - 1} />
        </div>

        <Noticecard notid={currentNotice} />

        <div className='notice-side'>
          <Noticecard notid={currentNotice + 1} />
        </div>
        <button className='next-button' onClick={nextNotice}></button>
      </section>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>

    </>
  )
}

export default Homepage