import React, { Fragment } from 'react'
import { useQuery } from "react-apollo-hooks"
import { Spinner } from '../Layout/Spinner'
import { GET_ORDERS_QUERY } from '../../queries'
import { Order } from './Order'

export const ClientOrders = ({match}) => {
  const clientId = match.params.id
  const { loading, error, data } = useQuery(GET_ORDERS_QUERY, {
    variables: { client: clientId }
  })
  if (loading) return <Spinner />
  if (error) return `Error: ${error}`
  return (
    <Fragment>
      <h1 className="text-center mb-3" >Pedidos del Cliente</h1>
      <div className="row justify-content-center">
      {
        data.orders.map((order)=> <Order key={order._id} order={order} />) 
      }
      </div>
    </Fragment>
  )
}