/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './News.css'

import NewsTop from '../News--Top'
import NewsCard from '../News--Card'
import NewsPage from '../News--Page'

export default props => {

    const [newsList, setNewsList] = useState({})
    const [firstNews, setFirstNews] = useState({})
    
    useEffect (() => {
        let dataFirst = [...props.data];
        let first = dataFirst.pop()
        setFirstNews(first)
        setNewsList(dataFirst)
        
    }, [])

  
    return (
      <>
      {firstNews !== undefined && <NewsTop data={firstNews}/>}
      {props.data.length !== undefined && props.data.map((val)=> {
        return (<NewsCard id={val.Id} title={val.Title}
        content={val.SubTitle}
        img = {val.Img_Src}/>)
      })}
      

      <Router>
 
      </Router>
      
    
      </>
      
    )
}