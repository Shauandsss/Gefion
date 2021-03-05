/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { parseISO, isAfter } from 'date-fns';

import './News--Page.css'
import Api from '../../api'



export default ({Id, Title, Subtitle, Content, Img, DatePost, WhoPosted}) => {

    const[newsContent, setNewsContentApi] = useState({})

    useEffect (() => {
        const loadAll = async () => {
            let newsContetApi = await Api.getNewsContent(Id);

            setNewsContentApi(newsContetApi)
          }
          loadAll();
    }, [])


    return (
        <>
        <div className='News'>
            <div className='News--ContentTop'>
                <h1 className='News--Title'>{Title}</h1>
                <div className='News--Subtitle'>{Subtitle}</div>
            </div>
            
            <div className='News--Credits'>
                <div>{format(DatePost)}</div>
                <div>{WhoPosted}</div>
            </div>
            <div class="line"></div>
            <img className='News--Img' src={Img} alt='Image'/>
            
            {newsContent.length !== undefined && newsContent.map((val)=> {
                return (<>
                    <div className='News--ContentTitle'>{val.Title}</div>
                    <div className='News--Content'>{val.Content}</div>
                    {val.Img_Src.length > 2 && <img className='News--Img' src={val.Img_Src} alt=""/>}
                </>)
            })}

        </div>
        </>
    )
}