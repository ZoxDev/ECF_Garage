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

function Homepage() {

  // Create an array that show notice in function of there id / max of 10 notice
  const noticeCardArray = []
  for(let i = 0 ; i < 10; i++){
    noticeCardArray.push(<Noticecard notid={i}/>)
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
        <Info infid={0} url={motor} />
        <Info infid={1} url={entretien} />
        <Info infid={2} url={cardeal} />
      </section>

      {/* Third section */}
      <section className='third-section'>
        <Banderole />
        {noticeCardArray}
      </section>
    </>
  )
}

export default Homepage