/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect} from 'react'
import './Table.css'
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

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');

    } 

    return (
    <div className="mainTable"> 

    <table className="table">
    <tr>
        <th className="Group_ID">Código</th>
        <th className="ID">Ação</th>
        <th className="Date">Data</th>
        <th className="Quantity">Qtde. Teórica</th>
        <th className="Part">Part(%)</th>
    </tr>

    {chartDataBase.map((val)=> {
        return (<tr>
        <td className="Group_ID">{val.Group_ID}</td>
        <td className="ID">{val.ID}</td>
        <td className="Date">{formatDate(val.Date)}</td>  
        <td className="Qunt">{val.Quantity}</td>  
        <td className="Part">{val.Part}</td>  
        </tr>)
    })}
    
    </table>
    </div>
    )
}