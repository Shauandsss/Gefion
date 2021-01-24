import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'
import CanvasJSReact from './chart/canvasjs.react';
import Chart from './components/Chart'

function App () {

  const[movieName, setMovieName] = useState('')
  const[review, setReview] = useState('')
  const[movieReviewList, setMovieList] = useState([])

  const[newReview, setNewReview] = useState('')

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieList(response.data)
    })
  }, [])

  
  




const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }

  /*constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }*/

  return ( 
    <div className="App">
      <h1> INDEXES </h1>  
      <Chart/>
       <div className="mainTable"> 
        <table className="table">
          <tr>
            <th className="Group_ID">Group_ID</th>
            <th className="ID">ID</th>
            <th className="Date">Date</th>
            <th className="Quant">Quantity</th>
            <th className="Part">Part</th>
          </tr>
          
          {movieReviewList.map((val)=> {
            return (<tr>
              <td className="Group_ID">{val.Group_ID}</td>
              <td className="ID">{val.ID}</td>
              <td className="Date">{formatDate(val.Date)}</td>  
              <td className="Qunt">{val.Quantity}</td>  
              <td className="Part">{val.Part.toFixed(3)}</td>  
              </tr>)
          })}
          
          </table>
        </div>
    </div>
  
  
  /*
  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review
    })
      
    setMovieList([
      ...movieReviewList,
        {movieName: movieName, movieReview: review},
      ])
  }*/

 /* const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie, 
      movieReview: newReview
    })
    setNewReview('')
  }
*/
  
  );
} 
export default App;
