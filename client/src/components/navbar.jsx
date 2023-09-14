import parrotLogo from "../assets/images/logo.jpg"
import "../index.css"
import "../components/css/navbar.css"

import { useState } from "react"
import styled from 'styled-components'


export default function Navbar() {

    const [burgerOpen, setBurgerOpen] = useState('');

    const toogleBurger = () => {
        setBurgerOpen(!burgerOpen);
    }


    const Navigation = styled.div`
            visibility: ${burgerOpen ? `visible` : `hidden`};
            position: fixed;
            top: 50px;
            left: calc(50% - 50px);
            width: 100px;
            height: 50px;
            background-color: #ffffff;
            padding-left: 25px;
            transition: ease-in-out display 0.4s;
            list-style-type: none;
            padding-right: 10px;
            border-radius: 0px 0px 15px 15px;
            font-family: 'Quicksand', sans-serif;
            font-size: 10px;  


            /* Responsive */
            @media screen and (min-width: 768px){
                width: 200px;
                height: 75px;
                left: calc(50% - 100px);
                font-size: 19px;
                top: 75px;
            }
    `

    return (
        <>
            {/* Mobile */}
            <nav className="navbar">
                <a href="/"><img className="logo" src={parrotLogo} alt="logo of Vincent Parrot"></img></a>

                {/* burger menu (Mobile)*/}
                <div className="burger" onClick={toogleBurger}>
                    <div className="burgerline"></div>
                    <div className="burgerline"></div>
                    <div className="burgerline"></div>
                </div>

                <Navigation display={burgerOpen}>
                    <ul>
                        <a href="/ventes"><li>Ventes</li></a>
                        <a href="/avis" className="nav-link"><li>Avis</li></a>
                        <a href="/se-connecter"><li>Se connecter</li></a>
                        
                    </ul>
                </Navigation>
            </nav>

            {/* Desktop */}
            <nav className="navbar-desktop">
                <a href="/"><img className="logo" src={parrotLogo} alt="logo of Vincent Parrot"></img></a>
                <div className="nav-links">
                    <a href="/ventes" className="nav-link">Ventes</a>
                    <a href="/avis" className="nav-link">Avis</a>
                    <a href="/se-connecter">
                        <svg className="svg-auth" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5 0C7.83266 0 0 7.83266 0 17.5C0 27.1673 7.83266 35 17.5 35C27.1673 35 35 27.1673 35 17.5C35 7.83266 27.1673 0 17.5 0ZM17.5 6.77419C20.9294 6.77419 23.7097 9.55444 23.7097 12.9839C23.7097 16.4133 20.9294 19.1935 17.5 19.1935C14.0706 19.1935 11.2903 16.4133 11.2903 12.9839C11.2903 9.55444 14.0706 6.77419 17.5 6.77419ZM17.5 31.0484C13.3579 31.0484 9.64617 29.1714 7.1623 26.2359C8.48891 23.7379 11.0857 22.0161 14.1129 22.0161C14.2823 22.0161 14.4516 22.0444 14.6139 22.0938C15.5312 22.3901 16.4909 22.5806 17.5 22.5806C18.5091 22.5806 19.4758 22.3901 20.3861 22.0938C20.5484 22.0444 20.7177 22.0161 20.8871 22.0161C23.9143 22.0161 26.5111 23.7379 27.8377 26.2359C25.3538 29.1714 21.6421 31.0484 17.5 31.0484Z" fill="black" />
                        </svg>
                    </a>

                </div>
            </nav>
        </>
    )


}