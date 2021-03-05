/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect} from 'react';
import './options.css'
export default props => {
    const [listFunds, setListFunds] = useState({})
    
    useEffect (() => {
        const loadAll = async () => {
          let FundsFull = props.data;
          setListFunds(FundsFull)
        }
        loadAll();
      }, [listFunds, props.data])

 
    return (
        <div>
            <select className={props.className} name="Index" id="Index">
            {listFunds.length >= 0 && listFunds.map((val)=> {
                return (
                <option className="Index--option" key={val.GROUP_ID}>{val.GROUP_ID}</option>
               )
            })}
            </select>

        </div>
    )

    
}