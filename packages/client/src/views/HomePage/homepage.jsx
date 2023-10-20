import './homepage.css'

// Images
import motor from '../../assets/images/motor.png'
import entretien from '../../assets/images/entretien.png'
import cardeal from '../../assets/images/cardeal.png'
import atelier from '../../assets/images/atelier-mecanique.jpg'

// Components
import Navbar from '../../components/Navbar/navbar'
import ServicesButton from '../../components/ServicesBut/servicesbut'
import Info from '../../components/Info/info'
import Noticecard from '../../components/NoticeCard/noticecard'
import Loading from '../../components/Loading/loading'
import Map from '../../components/Map/Map'

// Hooks
import { useFetch } from '../../hooks/queryget'
import { useEffect, useState } from 'react'

// page
import Footer from '../Footer/footer'


function Homepage() {
  // Carrousel
  const [notice, setNotice] = useState([]);

  const [data, loading, error] = useFetch("/noticemessage");
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    setNotice(data)
  }, [data])

  if (loading) {
    <Loading></Loading>
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let canClick = true;

  const handleNext = () => {
    if (canClick == true) {
      canClick = false;
      setPrev(false);
      setNext(true);
      setTimeout(() => {
        setOrder((prevOrder) => (prevOrder - 1 + notice.length) % notice.length);
        setNext(false);
        canClick = true;
      }, 500);
    }
  }

  const handlePrev = () => {
    if (canClick == true) {
      canClick = false;
      setNext(false);
      setPrev(true);
      setTimeout(() => {
        setOrder((prevOrder) => (prevOrder + 1) % notice.length);
        setPrev(false);
        canClick = true;
      }, 500);
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
          <p className='second-section-text'>Bienvenue chez V.Parrot, votre garage de confiance à Toulouse.<br />
            Nous offrons des services d'entretien, de réparation et de diagnostic pour toutes marques et modèles.<br /> Notre équipe dévouée et compétente s'engage à vous offrir un service de qualité, transparent et rapide.<br /> Faites confiance à V.Parrot pour prendre soin de votre véhicule avec expertise et passion.</p>
        </div>
        <div className='info-section'>
          <Info infid={1} url={motor} id='inf1' />
          <Info infid={2} url={cardeal} id='inf3' />
          <Info infid={3} url={entretien} id='inf2' />
        </div>

      </section>

      {/* Third section */}
      <section className='third-section'>
        <div className='section-infos'>
          <p>Vous pouvez vous faire un avis sur nous juste ici, des ames charitable ont laisser un commentaires sur leurs expérience.</p>
          <svg width="50" height="50" viewBox="0 0 149 158" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M105.714 23.7622C107.615 24.8416 109.866 25.1253 111.976 24.5514C114.085 23.9775 115.882 22.5925 116.974 20.6987C117.878 19.1038 119.286 17.8538 120.976 17.145C122.667 16.4362 124.545 16.3085 126.316 16.7821C128.087 17.2556 129.651 18.3036 130.762 19.7616C131.874 21.2196 132.47 23.0053 132.457 24.8385C132.457 27.0343 131.585 29.1403 130.032 30.693C128.479 32.2457 126.373 33.118 124.177 33.118C121.982 33.118 119.876 33.9903 118.323 35.543C116.77 37.0957 115.898 39.2016 115.898 41.3975C115.898 43.5933 116.77 45.6993 118.323 47.252C119.876 48.8047 121.982 49.677 124.177 49.677C128.537 49.6742 132.819 48.5241 136.593 46.3423C140.367 44.1605 143.5 41.0238 145.678 37.2474C147.856 33.471 149.002 29.1879 149 24.8285C148.998 20.4691 147.849 16.187 145.668 12.4124C143.487 8.63771 140.351 5.50353 136.576 3.32474C132.8 1.14595 128.517 -0.000697913 124.158 3.1869e-07C119.798 0.000698551 115.516 1.14872 111.741 3.32872C107.965 5.50872 104.83 8.6439 102.651 12.4192C102.103 13.3642 101.748 14.4081 101.606 15.4909C101.464 16.5737 101.537 17.6739 101.822 18.7282C102.107 19.7826 102.597 20.7701 103.265 21.6341C103.933 22.498 104.765 23.2213 105.714 23.7622ZM141.316 82.795C139.143 82.5129 136.946 83.104 135.208 84.4387C133.47 85.7734 132.332 87.7429 132.043 89.9153C130.305 103.95 123.496 116.866 112.898 126.229C102.299 135.593 88.6427 140.758 74.5005 140.751H28.2181L33.5997 135.37C35.1418 133.819 36.0074 131.72 36.0074 129.533C36.0074 127.345 35.1418 125.247 33.5997 123.696C25.5268 115.591 20.0328 105.279 17.8099 94.0573C15.5869 82.8361 16.7343 71.208 21.1076 60.6376C25.4809 50.0673 32.8846 41.0276 42.3859 34.6571C51.8872 28.2866 63.0612 24.8703 74.5005 24.8385C76.6963 24.8385 78.8022 23.9662 80.3549 22.4135C81.9077 20.8608 82.78 18.7548 82.78 16.559C82.78 14.3631 81.9077 12.2572 80.3549 10.7045C78.8022 9.1518 76.6963 8.27949 74.5005 8.27949C60.5017 8.33789 46.8026 12.3384 34.9724 19.8227C23.1423 27.307 13.6597 37.9724 7.61093 50.597C1.56219 63.2216 -0.807993 77.2947 0.771914 91.2041C2.35182 105.114 7.81792 118.297 16.544 129.243L2.38604 143.153C1.23719 144.317 0.458953 145.795 0.149514 147.401C-0.159925 149.008 0.0133043 150.669 0.647343 152.177C1.26847 153.689 2.32326 154.983 3.67878 155.897C5.03431 156.81 6.6299 157.302 8.26448 157.31H74.5005C92.6446 157.313 110.166 150.695 123.778 138.699C137.391 126.702 146.158 110.151 148.436 92.1508C148.588 91.0683 148.523 89.9666 148.247 88.9091C147.97 87.8516 147.487 86.8594 146.825 85.9896C146.163 85.1198 145.336 84.3897 144.39 83.8414C143.444 83.2931 142.4 82.9375 141.316 82.795ZM127.324 58.536C125.816 57.8692 124.144 57.6674 122.522 57.9565L121.031 58.4533L119.541 59.1984L118.299 60.2747C117.554 61.0377 116.964 61.9373 116.56 62.9242C116.071 63.9569 115.843 65.0944 115.898 66.236C115.874 67.3402 116.071 68.4381 116.478 69.465C116.906 70.4587 117.525 71.3588 118.299 72.1144C119.073 72.8818 119.99 73.4889 120.999 73.9009C122.008 74.3129 123.088 74.5218 124.177 74.5155C126.373 74.5155 128.479 73.6432 130.032 72.0905C131.585 70.5378 132.457 68.4318 132.457 66.236C132.485 65.1499 132.258 64.0724 131.795 63.0898C130.905 61.1003 129.313 59.5085 127.324 58.6188V58.536Z" fill="#D60C0F" />
          </svg>
        </div>

        <div className='notice-div'>
          <button className='prev-button' onClick={handlePrev}>
            <svg width="20" height="20" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.6145 0L0 25.6145L25.6145 51.2291L35.22 41.6236L19.2109 25.6145L35.22 9.60545L25.6145 0Z" fill="#D60C0F" />
            </svg>
          </button>

          <div className='notice-container'>
            {notice.map((element, index) => (
              <div className={`notices ${next ? 'slide-next' : ''} ${prev ? 'slide-prev' : ''}`}
                style={{ order: (index + order) % notice.length }}
                key={index}
              >
                <Noticecard notid={notice.indexOf(element)} />
              </div>
            ))}
          </div>

          <button className='next-button' onClick={handleNext} >
            <svg width="20" height="20" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.60542 51.2291L35.22 25.6145L9.60542 3.8147e-06L-2.98023e-05 9.60546L16.0091 25.6145L-2.98023e-05 41.6236L9.60542 51.2291Z" fill="#D60C0F" />
            </svg>
          </button>
        </div>
      </section>


      {/* Fourth section */}
      <section className='fourth-section'>
        <div className='section-infos'>
          <p>Après avoir vu ces avis j’imagine bien que vous souhaitez nous parler de votre projet automobile, venez ou contactez nous !</p>
          <svg width="50" height="50" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M74.7725 0C33.4667 0 0 33.4667 0 74.7725C0 116.078 33.4667 149.545 74.7725 149.545C116.078 149.545 149.545 116.078 149.545 74.7725C149.545 33.4667 116.078 0 74.7725 0ZM135.073 74.7725C135.073 81.5563 133.897 88.0989 131.817 94.1892H125.696C124.4 94.1892 123.164 93.6767 122.259 92.742L112.611 82.9131C111.254 81.5261 111.254 79.2649 112.641 77.878L116.41 74.1092V71.4861C116.41 70.5816 116.048 69.7073 115.415 69.0741L112.581 66.24C111.948 65.6068 111.073 65.245 110.169 65.245H105.345C103.475 65.245 101.938 63.7074 101.938 61.8381C101.938 60.9336 102.3 60.0592 102.933 59.426L105.767 56.5919C106.4 55.9588 107.274 55.597 108.179 55.597H117.827C119.696 55.597 121.234 54.0593 121.234 52.19V49.3559C121.234 47.4866 119.696 45.9489 117.827 45.9489H106.762C104.109 45.9489 101.938 48.1197 101.938 50.7729V52.1297C101.938 54.2101 100.611 56.0492 98.6515 56.7125L89.124 59.8783C88.129 60.21 87.4657 61.1145 87.4657 62.1697V62.833C87.4657 64.1596 86.3803 65.245 85.0537 65.245H80.2297C78.9031 65.245 77.8177 64.1596 77.8177 62.833C77.8177 61.5064 76.7323 60.421 75.4057 60.421H74.471C73.5665 60.421 72.7223 60.9336 72.3002 61.7476L69.4661 67.3857C68.652 69.0138 66.9938 70.0389 65.1546 70.0389H58.4914C55.8382 70.0389 53.6674 67.8681 53.6674 65.2149V57.5869C53.6674 56.3206 54.1799 55.0844 55.0844 54.1799L61.1446 48.1197C62.5315 46.7328 63.3154 44.8334 63.3154 42.8434C63.3154 41.8183 63.9787 40.8837 64.9737 40.552L77.0338 36.542C77.5463 36.3611 77.9986 36.0898 78.3604 35.728L86.4406 27.6477C87.0738 27.0146 87.4356 26.1402 87.4356 25.2357C87.4356 23.3664 85.8979 21.8287 84.0286 21.8287H77.7875L72.9635 26.6528V29.0648C72.9635 30.3914 71.8781 31.4768 70.5515 31.4768H65.7274C64.4008 31.4768 63.3154 30.3914 63.3154 29.0648V23.0348C63.3154 22.281 63.6772 21.5574 64.2802 21.1051L72.9936 14.5625C73.5665 14.5324 74.1394 14.4721 74.7122 14.4721C108.028 14.4721 135.073 41.5168 135.073 74.7725ZM39.2254 42.5419C39.2254 41.6374 39.5872 40.7631 40.2204 40.1299L47.8785 32.4718C48.5117 31.8386 49.386 31.4768 50.2905 31.4768C52.1599 31.4768 53.6975 33.0145 53.6975 34.8838V39.7078C53.6975 40.6123 53.3357 41.4867 52.7026 42.1198L49.8684 44.954C49.2353 45.5871 48.3609 45.9489 47.4564 45.9489H42.6324C40.7631 45.9489 39.2254 44.4113 39.2254 42.5419ZM77.8177 134.922V132.781C77.8177 130.128 75.6469 127.957 72.9936 127.957H66.9033C63.6471 127.957 58.8532 126.359 56.2301 124.4L49.5368 119.365C46.0695 116.772 44.0494 112.701 44.0494 108.39V101.184C44.0494 96.36 46.5821 91.8978 50.7126 89.4255L63.6471 81.6769C65.7877 80.4106 68.2299 79.7171 70.7022 79.7171H80.1091C83.3955 79.7171 86.5612 80.893 89.0335 83.0035L102.058 94.1892H107.576C110.139 94.1892 112.581 95.2143 114.39 97.0233L119.606 102.239C120.631 103.264 122.048 103.837 123.495 103.837H127.535C117.767 121.596 99.2545 133.837 77.8177 134.922Z" fill="#D60C0F" />
          </svg>
        </div>

        <div className='section-map'>
          <div className='map-div'>
            <span className='map'>
              <Map/>
            </span>
          </div>
          <div className='contact-div'>
            <p>Pour nous appellez c'est juste sur ce bouton.<br/>
            Ou au 05.52.39.25.89</p>
            <a className='contact-style button-map' href='tel:0562392589'>
              APPELEZ
            </a>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer id='footer'>
        <Footer />
      </footer>

    </>
  )
}

export default Homepage