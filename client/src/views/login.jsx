import '../components/css/login.css'

// Utils
import { useState } from 'react'
import { useFetchPost } from '../hooks/querypost'

// Components
import Navbar from '../components/navbar'
import Footer from './footer'

export default function LoginPage(props) {
    const [name, setUserName] = useState();
    const [password, setUserPassword] = useState();
    // Fetch api
    const { callback: logIn, data } = useFetchPost("http://localhost:5000/auth/login");



    // await for the callback and post the data
    const onSubmitForm = async (e) => {
        e.preventDefault();
        await logIn({
            name: name,
            password: password,
        });

        localStorage.setItem("token", data.response.token);
        if (data.resStatus == 200) {
            props.setAuth(true);
        }

    }



    return (
        <>
            <Navbar />
            <section className='login-container'>
                <h1>Faites-vous partie de l'équipe ?</h1>
                <form onSubmit={onSubmitForm} className='form-login'>
                    <label className='label-form'>
                        Identifiant
                        <input value={name} onChange={e => setUserName(e.target.value)} type='text' placeholder='Jhon Doe' />
                    </label>
                    <label className='label-form'>
                        Mot-De-Passe
                        <input value={password} onChange={e => setUserPassword(e.target.value)} type='password' placeholder='Mot-de-passe' />
                    </label>

                    <button className='btn-form' type='submit'>SE CONNECTER</button>
                </form>
            </section>
            <Footer />
        </>
    )
}