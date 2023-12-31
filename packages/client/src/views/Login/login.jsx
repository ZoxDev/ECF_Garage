import './login.css'

// Utils
import { useState } from 'react'
import { useFetchPost } from '../../hooks/querypost'
import { Navigate } from 'react-router-dom'

// TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Cookie
import Cookies from 'universal-cookie'

// Components
import Navbar from '../../components/Navbar/navbar';
import Footer from '../Footer/footer';

export default function LoginPage() {
    const [name, setUserName] = useState();
    const [password, setUserPassword] = useState();
    const [canToast, setCanToast] = useState(true);
    const [canLogin, setCanLogin] = useState(true);

    // Cookie
    const cookieTok = new Cookies({ path: "/" })
    const cookieRole = new Cookies({ path: "/" });
    const cookieAlreadyRole = new Cookies({ path: "/" });

    // Check if the user is already logged in
    console.log(cookieAlreadyRole.get('role'));

    if (cookieTok.get('token') != undefined) {
        if (cookieAlreadyRole.get('role') != undefined) {
            if (cookieAlreadyRole.get('role') == "admin") {
                return <Navigate to='/dashboard/admin' />
            }
            else {
                return <Navigate to='/dashboard/employee' />
            }
        }
        else {
            cookieAlreadyRole.remove;
        }
    }

    // Fetch api
    const { callback: logIn, dataPost } = useFetchPost("/auth/login");

    // await for the callback and post the data
    const onSubmitForm = async (e) => {
        e.preventDefault();
        if(canLogin == true) {
            setCanToast(true);
            await logIn({
                name,
                password,
            });
        }
    }

    if (dataPost.resStatus == 200) {
        cookieTok.set('token', dataPost.response.token)
        cookieRole.set('role', dataPost.response.role);

        // Redirect to admin back office if his admin else go to employee back office
        if (dataPost.response.role == "admin") {
            return <Navigate to='/dashboard/admin' />
        }
        else {
            return <Navigate to='/dashboard/employee' />
        }
    }

    if (dataPost.resStatus == 401 && canToast == true) {
        setCanToast(false);
        toast.error("Identifiant ou mot-de-passe incorrect");
        
        setCanLogin(false)
        toast.warn("Vous devez attendre 5 secondes avant de pouvoir vous reconnecter");
        setTimeout(() => {
            setCanLogin(true)
        }, 5000);
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
            <footer id='footer'>
                <Footer />
            </footer>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}