import '../components/css/login.css'

// Utils
import { useState } from 'react'
import { useFetchPost } from '../hooks/querypost'
import { Navigate } from 'react-router-dom'

// Cookie
import Cookies from 'universal-cookie'

// Components
import Navbar from '../components/navbar'
import Footer from './footer'

export default function LoginPage() {
    const [name, setUserName] = useState();
    const [password, setUserPassword] = useState();

    // Cookie
    
    const cookieTok = new Cookies({ path: "/" })
    const cookieRole = new Cookies({path: "/"});

    // Fetch api
    const { callback: logIn, dataPost } = useFetchPost("http://localhost:5000/auth/login");

    // await for the callback and post the data
    const onSubmitForm = async (e) => {
        e.preventDefault();
        await logIn({
            name,
            password,
        });
    }

    if (dataPost.resStatus == 200) {
        cookieTok.set('token', dataPost.response.token)
        cookieRole.set('role', dataPost.response.role);
        
        // Redirect to admin back office if his admin else go to employee back office
        if(dataPost.response.role == "admin"){
            return <Navigate to='/dashboard/admin'/>
        }
        else{
            return <Navigate to='/dashboard/employee'/>
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