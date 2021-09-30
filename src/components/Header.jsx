import React from 'react';
import '../css/Header.css'
import logo from '../assets/LogoLifeAndMoney.png'

const Header = () => {
    return (
        <div className="Header-container">
            <img src={logo} alt="Logo" className="Header-logo"/>
        </div>
    );
};

export default Header;