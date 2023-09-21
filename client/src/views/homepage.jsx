import '../components/css/homepage.css'
// Images
import motor from '../assets/images/motor.png'
import entretien from '../assets/images/entretien.png'
import cardeal from '../assets/images/cardeal.png'
import atelier from '../assets/images/atelier-mecanique.jpg'

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
        <div className='second-secion-info'>
        <img src={atelier} className='second-section-image'></img>
        <p className='second-section-text'>Bienvenue chez V.Parrot, votre garage de confiance à Toulouse.<br/> 
        Nous offrons des services d'entretien, de réparation et de diagnostic pour toutes marques et modèles.<br/> Notre équipe dévouée et compétente s'engage à vous offrir un service de qualité, transparent et rapide.<br/> Faites confiance à V.Parrot pour prendre soin de votre véhicule avec expertise et passion.</p>
        </div>
        <div className='info-section'>
        <Info infid={1} url={motor} id='inf1' />
        <Info infid={2} url={cardeal} id='inf3' />
        <Info infid={3} url={entretien} id='inf2' />
        </div>
       
      </section>

      {/* Third section */}
      <section className='third-section'>
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
      <footer id='footer'>
        <Footer />
      </footer>

    </>
  )
}

export default Homepage