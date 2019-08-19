import React from 'react';
import { useQuery } from "react-apollo-hooks"
import { GET_TOP_CLIENTS_QUERY } from '../../queries'
import { Spinner } from '../Layout/Spinner'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'


export const Clients = () => {
	const { loading, error, data } = useQuery(GET_TOP_CLIENTS_QUERY)

  if (loading) return <Spinner />
  if (error) return `Error: ${error.message}`
  const dataFormat = data.TopClients.map((order)=>{
    return {
      name: `${order.client[0].name} ${order.client[0].lastname}`,
      total: `${order.total}`
    }
  })
  return (
    <div className="row justify-content-center">
      <BarChart width={900} height={300} data={dataFormat}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Bar dataKey="total" fill="#2C3E50" />
      </BarChart>
    </div>
  )
}