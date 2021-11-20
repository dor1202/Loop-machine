import React from "react";
import logo from './drum-logo.png';
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