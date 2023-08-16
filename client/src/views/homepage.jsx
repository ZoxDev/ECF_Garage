import '../components/css/homepage.css'
// Images
import motor from '../assets/images/motor.jpg'
import entretien from '../assets/images/entretien.png'
import cardeal from '../assets/images/cardeal.jpg'

// Components
import Navbar from "../components/navbar"
import ServicesButton from '../components/servicesbut'
import Info from '../components/info'
import Banderole from '../components/banderole'
import Noticecard from '../components/noticecard'

// page
import Footer from './footer'

// Use
import { useState, useLayoutEffect } from 'react'
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

  // Gsap anim of footer

  // useLayoutEffect(() => {


    //  gsap.set("footer",
    //   {
    //      yPercent: -50,
    //      display: "none",
    //   })

  //     gsap.to(".footer",
  //     {
  //       duration: 10,
  //     })
  // }, [])


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
        <Info infid={0} url={motor} />
        <Info infid={1} url={entretien} />
        <Info infid={2} url={cardeal} />
      </section>

      {/* Third section */}
      <section className='third-section'>
        {/* <Banderole /> */}
        <button className='prev-button' onClick={prevNotice}></button>
        <Noticecard notid={currentNotice} />
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