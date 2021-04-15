/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect} from 'react';
import { Pie } from 'react-chartjs-2';
import './Chart.css'

export default props => {
    
    const[chartDataBase, setChartDataBase] = useState([{}])
      
    useEffect(()=>{
        var select = document.getElementById('Index')
        select.addEventListener("change", dataSet);
        setChartDataBase(props.data)
        dataSet();
    }, [dataSet, props.data])

    function dataSet(){
        var searchTerm = document.getElementById('Index').value;
        props.data.filter((item) => {
                if (item.slug === searchTerm){
                    setChartDataBase(item.items)
                }
        })
    }

    function randomOpacity() {
        return Math.random() * (1 - 0 + 1) + 0;
    }

    return (
        <div className={props.className}>
            <Pie 
                data = {{labels:chartDataBase.map(val => {
                    return val.ID
                }),
                datasets:[
                        {
                            label:'Population',
                            data:chartDataBase.map(val => {
                                return val.Part
                            }),
                            backgroundColor:chartDataBase.map(val => {
                                return 'rgba(255,255,255,'+randomOpacity()+')'
                            }),
                            borderColor:chartDataBase.map(val => {
                                return 'rgba(0,0,0,0.2)'
                            }),
                        }
                    ]
                }}
                options ={{
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
                    fontColor:'black',
            }}
            />
        </div>
    )   
}