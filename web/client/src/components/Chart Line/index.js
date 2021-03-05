/* eslint-disable import/no-anonymous-default-export */
import React, {Component, useState, useEffect} from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './Chart.css'
import { format } from 'date-fns'
import moment from 'moment'

export default props => {
    const[chartDataBase, setChartDataBase] = useState([{}])
    const[minData, setMinData] = useState()
    const[maxData, setMaxData] = useState(new Date())
    const[minValue, setMaxValue] = useState(0)
    const[maxValue, setMinValue] = useState(0)
    //const[minScale, setMinScale] = useState(0)
    //const[maxScale, SetMaxScale] = useState(0)

    var select = document.getElementById('Index') 
    let x = select === null ? null : select.addEventListener("change", dataSet);


    useEffect(()=>{
        dataSet()

        var date_1_Week = document.getElementById('1_Week') 
        var date_1_Monty = document.getElementById('1_Month') 
        var date_YTD = document.getElementById('YTD') 
        var date_1_Year = document.getElementById('1_Year') 
        var date_Entire = document.getElementById('Entire') 
        date_1_Week.addEventListener("click", function(){dateTime(7);}, false);
        date_1_Monty.addEventListener("click", function(){dateTime(30);}, false);
        date_YTD.addEventListener("click", function(){dateTime();}, false);
        date_1_Year.addEventListener("click", function(){dateTime(365);}, false);
        date_Entire.addEventListener("click", function(){dateTime(50000);}, false);    

    }, [])

    function dataSet(){
        console.log("Data Set")
        var searchTerm = document.getElementById('Index').value;
        props.data.filter((item) => {
                if (item.slug === searchTerm){

                    setChartDataBase(item.items)
                    console.log(item.items.Value_close)
                }
                
        })
    }

    function dateTime (Days){
        let today = new Date() 
        let endDay = moment().subtract(Days, 'days');
        setMaxData(today);
        setMinData(endDay._d);
        console.log(today)
        console.log(endDay._d)
    }

    return (
        <div className={props.className}>
            <Line 
                data = {{labels:chartDataBase.map(val => {
                    return val.DATE
                }),
                fontColor:'black',
                datasets:[
                        {
                            label:'Pontos',
                            data:chartDataBase.map(val => {
                                return val.Value_close
                            }),
                            backgroundColor: 'rgba(255,255,255,0)',
                            borderColor: 'rgba(255,255,255,1)',
                            steppedLine: 'before',  
                            pointRadius: 0,
                        }
                    ],
                }}
                options ={{
                    responsive: true,
                    title:{
                        display:false,
                        text:'Largest cities in Massachusetts',
                        fontSize:25,
                    },
                    legend:{
                        display:false,
                        position:'right',
                        labels:{
                            fontColor:'black'
                        }
                    },
                    tooltips:{
                        enabled:true
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            time: {

                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            },
                            ticks: {
                                fontColor: "Black",
                                autoSkip: true,
                                min: minData,
                                max: maxData
                            },
                            display: true,                         
                        }],
                        yAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            },
                            ticks: {
                                fontColor: "Black",
                                beginAtZero: false,
                              //  max: Math.max(chartDataBase.Value_close),
                              //  min: Math.min(chartDataBase.Value_close)
                            },
                            
                            display: true,

                        }],
                    },
                    animation: {
                        duration: 1 // general animation time
                    },
                    hover: {
                        animationDuration: 0 // duration of animations when hovering an item
                      },
                      responsiveAnimationDuration: 0, // animation duration after a resize
                      elements: {
                        line: {
                          tension: 0 // disables bezier curves
                        }
                      }
            }}
            />
            <div className="Buttons">
                <button id="1_Week" className="Button">1 Week</button>
                <button id="1_Month" className="Button">1 Month</button>
                <button id="YTD" className="Button">YTD</button>
                <button id="1_Year" className="Button">1 Year</button>
                <button id="Entire" className="Button">Entire</button>
            </div>
        </div>
    )   
}