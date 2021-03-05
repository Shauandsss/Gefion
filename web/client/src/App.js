import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import ChartPie from './components/Chart Pie'
import ChartLine from './components/Chart Line'
import Options from './components/options/'
import Api from './api'
import BasicTable from './components/IndianTable/BasicTable'
import Header from './components/Header'
import LoadCircle from './components/LoadCircle'
import News from './components/News'
import Footer from './components/Footer'
import NewsPage from './components/News--Page'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [listFunds, setListFunds] = useState({})
  const [listValues, setlistValues] = useState({})
  const [Funds, setFunds] = useState({})
  const [blackHeader, setBlackHeader] = useState(false)
  const [newsList, setNewsList] = useState({})
  const [newsContent, setNewsContent] = useState({})


  useEffect (() => {
    const loadAll = async () => {
      let list = await Api.getFullList();
      setListFunds(list)
      let FundsFull = await Api.getFullFunds();
      setFunds(FundsFull)
      let ValuesFull = await Api.getFullValues();
      setlistValues(ValuesFull)
      let newsListApi = await Api.getNews();
      setNewsList(newsListApi)
    }
    loadAll();
  }, [])
  
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 100){
        setBlackHeader(true);
      } else {  
        setBlackHeader(false);
      }
    }
    
    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return(
      <Router>
        <div className="App">

          <Route path="*" render={(props) => <Header className="Header--Main" black={blackHeader} {...props} /> } />
          
          {/* Inicio Indexes */}
          <Route path="/indexes" className="Graphs">
          <div className="Graphs">
            <Route exact path="/indexes" render={(props) => <Options className="Graphs--Option" data={listFunds} {...props} /> } />
            {Funds.length >= 0 && <Route exact path="/indexes" render={(props) => <ChartPie className="Graphs--Pie" data={Funds} {...props} /> } />}
            <div className="Main--Graphs--Line"> 
              {listValues.length !== undefined &&<Route exact path="/indexes" render={(props) => <ChartLine className="Graphs--Line" data={listValues} {...props} /> }/>  } 
              {listValues.length === undefined &&<Route exact path="/indexes" render={(props) => <LoadCircle {...props} /> }/>}
            </div>
          </div>
          </Route>
        {Funds.length >= 0 &&<Route exact path="/indexes" render={(props) => <BasicTable data={Funds} {...props} /> } />} 
        {listValues.length === undefined &&<Route exact path="/indexes" render={(props) => <LoadCircle {...props} /> }/>}
        {/* Fim Indexes */}

        {/* Inicio News */}
        {newsList.length !== undefined && <Route exact path="/News" render={(props) => <News data={newsList} {...props} /> } />}


        {/* Fim News */}

        {newsList.length !== undefined && newsList.map((val)=> {
          return (
          <Route exact path={`/News/${val.Id}`} render={(props) => 
          <NewsPage Id={val.Id} 
                Title={val.Title} 
                Subtitle={val.SubTitle} 
                Content={val.Content} 
                Img={val.Img_Src} 
                DatePost={val.Date_Post} 
                WhoPosted={val.Who_Post} {...props} /> } />)
        })}

        <Route path="*" render={(props) => <Footer {...props} /> } />
        
       
        
        

        </div>
      </Router>
  )
}

