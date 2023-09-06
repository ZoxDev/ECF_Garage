import '../components/css/login.css'

// Components
import Navbar from '../components/navbar'
import Footer from './footer'

export default function LoginPage() {


    return (
        <>
            <Navbar />
            <section className='login-container'>
                <h1>Faites-vous partie de l'équipe ?</h1>
                <form className='form-login'>
                    <label className='label-form'>
                        E-mail
                        <input/>
                    </label>
                    <label className='label-form'>
                        Mot-De-Passe
                        <input/>
                    </label>

                    <button className='btn-form' type='submit'>SE CONNECTER</button>
                </form>
            </section>
            <Footer />
        </>
    )
}