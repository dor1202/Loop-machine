import logo from '../../Icons/drum-logo.png';
import React from "react";
import './Logo.css';

const Logo = () => {
    return(
        <div className='logo-style'>
            <img src={logo} className="App-logo" alt="logo" />
            <span className='title-style'>DRUM MACHINE</span>
        </div>
    );
};

export default Logo;