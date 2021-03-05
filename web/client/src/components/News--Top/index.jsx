/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect} from 'react';
import './News--Top.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default props => {

    const[data, setData] = useState({})

    useEffect (() => {
        setData(props.data)
      }, [props.data])

    return (<Link to={`/News/${data.Id}`} className="Header--Logo">
        <section className="Main" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${data.Img_Src})`   
            }}>
            <div className='Main--vertical'>     
                <div className='Main--horizontal'> 
                    <div className='Main--Title'>{data.Title}</div>
                    <div className='Main--Subtitle'>{data.SubTitle}</div>
                </div>
            </div>
        </section>
        </Link>
    )
}