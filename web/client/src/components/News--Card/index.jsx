/* eslint-disable import/no-anonymous-default-export */
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './News--Card.css'

export default ({id, img, title, content}) => {

    useEffect (() => {

    }, [])

 
    return (<Link to={`/News/${id}`}>
        <div className='Card'>
            <img className='Card--Img' src={img} alt='Image_Card'/>
            <div className='Card--Content'>
                <div className='Card--Title'>{title}</div>
                <div className='Card--Subtitle'>{content}</div>
            </div>
        </div>
        </Link>
    )
}