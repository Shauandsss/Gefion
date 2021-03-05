/* eslint-disable import/no-anonymous-default-export */
import { parseWithOptions } from 'date-fns/fp';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './News--Card.css'

export default ({id, img, title, content}) => {

    useEffect (() => {

    }, [])

 
    return (<Link to={`/News/${id}`}>
        <div className='Card'>
            <img className='Card--Img' src={img} alt='Image'/>
            <div className='Card--Content'>
                <div className='Card--Title'>{title}</div>
                <div className='Card--Subtitle'>{content}</div>
            </div>
        </div>
        </Link>
    )
}