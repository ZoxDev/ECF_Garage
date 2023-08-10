import parrotLogo from "../assets/images/logo.jpg"
import "../index.css"
import "../components/css/navbar.css"

import {useState} from "react"
import styled from 'styled-components'


export default function Navbar(){    

    const [burgerOpen, setBurgerOpen] = useState('');

    const toogleBurger = () =>{
        setBurgerOpen(!burgerOpen);
    }


    const Navigation = styled.div`
            visibility: ${burgerOpen ? `visible` : `hidden`};
            position: fixed;
            top: 50px;
            left: calc(50% - 50px);
            width: 100px;
            height: 40px;
            background-color: #ffffff;
            padding-left: 25px;
            transition: ease-in-out display 0.4s;
            list-style-type: none;
            padding-right: 10px;
            border-radius: 0px 0px 15px 15px;
            font-family: 'Quicksand', sans-serif;
            font-size: 10px;  
    `

    return(
        <>
        <nav className="navbar">
            <img className="logo" src={parrotLogo} alt="logo of Vincent Parrot"></img>
        
            {/* burger menu (Mobile)*/}
            <div className="burger" onClick={toogleBurger}>
                <div className="burgerline"></div>
                <div className="burgerline"></div>
                <div className="burgerline"></div>
            </div>

            <Navigation display={burgerOpen}>
                <ul>
                    <li>Ventes</li>
                    <li>Se connecter</li>
                </ul>
            </Navigation>
        </nav>

        {/* Desktop */}
      
        </>

        
    )

    
}