/* eslint-disable import/no-anonymous-default-export */
import { format } from 'date-fns'
import {ColumnFilter} from './ColumnFilter'

export const COLUMNS = [
    {
        Header: 'Código',
        Footer: 'Código',
        accessor: 'Group_ID', // accessor is the "key" in the data
        Filter: ColumnFilter,
      },
      {
        Header: 'Ação',
        Footer: 'Ação',
        accessor: 'ID', // accessor is the "key" in the data
        Filter: ColumnFilter,
      },
      {
        Header: 'Data',
        Footer: 'Data',
        accessor: 'Date', // accessor is the "key" in the data
        Cell: ({ value }) => {
          return value === undefined ? null : format(new Date(value) , 'dd/MM/yyyy')},
        Filter: ColumnFilter,
       } ,
      {
        Header: 'Qtde. Teórica',
        Footer: 'Qtde. Teórica',
        accessor: 'Quantity', // accessor is the "key" in the data
        Filter: ColumnFilter,
      },
      {
        Header: 'Part (%)',
        Footer: 'Part (%)',
        accessor: 'Part', // accessor is the "key" in the data
        Cell: ({ value }) => {
          return value === undefined ? null : value.toFixed(3)},
        Filter: ColumnFilter,
      }
    ]
export default COLUMNS;