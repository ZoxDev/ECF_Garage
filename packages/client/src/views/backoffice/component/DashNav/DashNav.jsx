// Css
import './dashnav.css'

// Utils
import Cookies from 'universal-cookie'
import { useLocation } from 'react-router-dom';

// React
import { useState, useEffect } from 'react'

export default function DashNav() {

    const [path, setPath] = useState("");
    const [text, setText] = useState("");

    const handleLogout = () => {
        const cookies = new Cookies()
        cookies.remove('token', { path: '/' })
        cookies.remove('role', { path: '/' })
    }


    let location = useLocation();
    useEffect(() => {
        if (location.pathname == '/dashboard/admin') {
            setText("employé");
            setPath("/dashboard/employee");
        }
        else {
            setText("admin");
            setPath("/dashboard/admin");
        }
    }, [path])


    return (
        <>
            <nav className="dash-nav-container">
                <div className='dash-nav-links'>
                    <a href='/'>
                        <button className='dash-nav-link' onClick={handleLogout}>
                            <h4 className='dash-nav-text'>Se déconnecter</h4>

                            <svg className='dash-nav-svg' width="50" height="50" viewBox="0 0 87 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M85.0859 36.2842L56.3245 65.0457C53.7565 67.6136 49.3053 65.816 49.3053 62.1353V45.7002H26.0222C23.7453 45.7002 21.9135 43.8683 21.9135 41.5914V25.1563C21.9135 22.8793 23.7453 21.0475 26.0222 21.0475H49.3053V4.61242C49.3053 0.948759 53.7394 -0.865951 56.3245 1.70203L85.0859 30.4635C86.678 32.0727 86.678 34.675 85.0859 36.2842ZM32.8702 64.1897V57.3417C32.8702 56.2118 31.9457 55.2873 30.8158 55.2873H16.4351C13.4049 55.2873 10.9567 52.8392 10.9567 49.8089V16.9387C10.9567 13.9085 13.4049 11.4604 16.4351 11.4604H30.8158C31.9457 11.4604 32.8702 10.5359 32.8702 9.40599V2.55803C32.8702 1.42812 31.9457 0.503641 30.8158 0.503641H16.4351C7.36156 0.503641 0 7.8652 0 16.9387V49.8089C0 58.8825 7.36156 66.244 16.4351 66.244H30.8158C31.9457 66.244 32.8702 65.3196 32.8702 64.1897Z" fill="black" />
                            </svg>

                        </button>
                    </a>
                    <a href={path}>
                        <button className='dash-nav-link'>

                            <h4 className='dash-nav-text'>Vers {text}</h4>

                            <svg className='dash-nav-svg' width="50" height="50" viewBox="0 0 456 319" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M68.2592 136.518C93.3586 136.518 113.765 116.112 113.765 91.0122C113.765 65.9128 93.3586 45.5061 68.2592 45.5061C43.1597 45.5061 22.7531 65.9128 22.7531 91.0122C22.7531 116.112 43.1597 136.518 68.2592 136.518ZM386.802 136.518C411.901 136.518 432.308 116.112 432.308 91.0122C432.308 65.9128 411.901 45.5061 386.802 45.5061C361.703 45.5061 341.296 65.9128 341.296 91.0122C341.296 116.112 361.703 136.518 386.802 136.518ZM409.555 159.271H364.049C351.535 159.271 340.229 164.32 331.981 172.497C360.636 188.21 380.972 216.581 385.38 250.284H432.308C444.893 250.284 455.061 240.116 455.061 227.531V204.778C455.061 179.678 434.655 159.271 409.555 159.271ZM227.531 159.271C271.544 159.271 307.166 123.649 307.166 79.6357C307.166 35.6228 271.544 0 227.531 0C183.518 0 147.895 35.6228 147.895 79.6357C147.895 123.649 183.518 159.271 227.531 159.271ZM282.138 182.024H276.236C261.447 189.135 245.022 193.401 227.531 193.401C210.039 193.401 193.685 189.135 178.825 182.024H172.923C127.702 182.024 91.0122 218.714 91.0122 263.935V284.413C91.0122 303.256 106.299 318.543 125.142 318.543H329.919C348.762 318.543 364.049 303.256 364.049 284.413V263.935C364.049 218.714 327.36 182.024 282.138 182.024ZM123.08 172.497C114.832 164.32 103.526 159.271 91.0122 159.271H45.5061C20.4066 159.271 0 179.678 0 204.778V227.531C0 240.116 10.1678 250.284 22.7531 250.284H69.6101C74.0896 216.581 94.4252 188.21 123.08 172.497Z" fill="black" />
                            </svg>

                        </button>
                    </a>
                </div>
            </nav>
        </>
    )
}