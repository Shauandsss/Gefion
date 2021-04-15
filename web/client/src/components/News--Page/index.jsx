/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect} from 'react';
import { format } from 'date-fns'

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
    }, [Id])


    return (
        <>
        <div className='News'>
            <div className='News--ContentTop'>
                <h1 className='News--Title'>{Title}</h1>
                <div className='News--Subtitle'>{Subtitle}</div>
            </div>
            
            <div className='News--Credits'>
                <img className='Name--CreditsImage' src='https://exame.com/wp-content/uploads/2021/02/Elon-Musk-1.jpg' alt='author'/>
                <div className='Name--CreditsText'>
                    <div>{WhoPosted}</div>
                    <div>{format(new Date(DatePost) , 'dd/MM/yyyy')}</div>
                </div>
            </div>
            <div class="line"></div>
            <img className='News--Img' src={Img} alt='Image_News'/>
            
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