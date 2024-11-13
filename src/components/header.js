// src/Header.js
import React from 'react';
import './headers.css';
// import logo from './logo.png'; // Make sure to replace this with the path to your logo image

const Header = () => {
    return (
        <header className="header">
            {/* <img src={logo} alt="Logo" className="logo" /> */}
            <h1>Psuedo Fund Query</h1>
        </header>
    );
};

export default Header;