  
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './Header.css'
import { BrowserRouter as Router, Link } from "react-router-dom";

export default ({black}) => {
    
    return (
        <header className={black ? 'black' : ''}>
            <Link to="/" className="Header--Logo">Gefion</Link>
            <div className="Header--Options">
                <Link to="/News">Notícias</Link>
                <Link to="/Indexes">Indíces</Link>
            </div>
        </header>
    )
}