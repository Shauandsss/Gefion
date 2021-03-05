/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import './Footer.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

export default () => {
    
    return (
        <footer>
            <Link to="/" className="Footer--Logo">Gefion</Link>
            <div className="Footer--Contact">
                    <h2>CONTATO</h2>
                    <div className='Footer--Phone'>
                        <PhoneIcon alt='telefone'/>
                        <p><a href="tel:554998284379">+55 (49) 9 9828 - 4379</a></p>
                    </div>
                    <div className='Footer--Email'>
                        <EmailIcon alt='email'/>
                        <p><a href="mailto:gefionfinancial@gmail.com">gefionfinancial@gmail.com</a></p>
                    </div>
            </div>
        </footer>
    )
}
// https://api.whatsapp.com/send?phone=554998284379