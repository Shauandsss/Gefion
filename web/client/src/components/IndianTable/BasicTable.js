/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect, useMemo} from 'react'
import {useTable, useSortBy, useFilters} from 'react-table'
import COLUMNS from './columns'
import './table.css'


export default props => {

    const[chartDataBase, setChartDataBase] = useState([{}])

    useEffect(()=>{
        var select = document.getElementById('Index')
        select.addEventListener("change", dataSet);
        setChartDataBase(props.data)
        dataSet();
    }, [])

    function dataSet(){
        var searchTerm = document.getElementById('Index').value;
        props.data.filter((item) => {
                if (item.slug === searchTerm){
                    setChartDataBase(item.items)
                }
        })
        
    }

   
    const data = useMemo(() => chartDataBase, [chartDataBase])
    const columns = useMemo (() => COLUMNS, [])

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      footerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data },
    useFilters,
    useSortBy)
  

    return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                    </span>
                    <div className="Table--Filter">{column.CanFilter ? column.render('Filter') : (column.CanFilter === undefined ? column.render('Filter') : null)}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            {
              footerGroups.map((footerGroup) => (
                <tr {...footerGroup.getFooterGroupProps()}>
                  {
                    footerGroup.headers.map((column) =>
                      <td {...column.getFooterProps}>{column.render('Footer')}</td>
                    )}
                </tr>
              ))
            }
          </tfoot>
        </table>
    )
}
