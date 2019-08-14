import React, { useState, Fragment } from 'react'
import { Query } from "react-apollo"
import { useMutation } from "react-apollo-hooks"
import { Spinner } from '../Layout/Spinner'
import { FILL_PRODUCT_QUERY } from '../../queries'
import { UPDATE_ORDER_MUTATION } from '../../mutations'
import { ResumeProduct } from './ResumeProduct'

export const Order = (props) => {
  const [order, setOrder] = useState(props.order)
  const [updateOrder, { loading }] = useMutation(UPDATE_ORDER_MUTATION)
  const date = new Date(Number(order.date))

  const onCahngeState = (e) => {
    const {_id, total, client } = order
    const input = {
      _id,
      total,
      client,
      state: e.target.value
    }
    updateOrder({
      variables: { input }
    })
    setOrder({
      ...order,
      state: e.target.value
    })
  }

  return (
    <div className="col-md-4">
      <div className={`card mb-3`} >
          <div className="card-body">
              {
                loading &&
                <Spinner />
              }
              {
                !loading &&
                <Fragment>
                  <p className="card-text font-weight-bold ">Estado:
                    <select 
                      onChange={ onCahngeState } 
                      className="form-control my-3" 
                      value={order.state}>
                        <option value="PENDING">PENDIENTE</option>
                        <option value="COMPLETED">COMPLETADO</option>
                        <option value="CANCELLED">CANCELADO</option>
                    </select>
                  </p> 
                  <p className="card-text font-weight-bold">Pedido ID:
                      <span className="font-weight-normal"> {order._id}</span>
                  </p> 
                  <p className="card-text font-weight-bold">Fecha Pedido: 
                      <span className="font-weight-normal"> {date.toLocaleString('es-MX')}</span>
                  </p>
                  <p className="card-text font-weight-bold">Total: 
                      <span className="font-weight-normal"> $ {order.total}</span>
                  </p>

                  <h4 className="card-text text-center mb-3">Artículos del pedido</h4>
                  {
                    order.order.map((p)=>{
                      return (
                        <Query 
                          key={p.product_id} 
                          variables={{'_id': p.product_id}} 
                          query={FILL_PRODUCT_QUERY}>
                          {({data, loading, error}) =>{
                            if (error) return `Error: ${error.message}`
                            if (loading) return <Spinner />
                            return (
                              <ResumeProduct quantity={p.quantity} product={data.getProduct} />
                            )
                          }}
                        </Query>
                      )
                    }) 
                  }
                </Fragment>
              }
          </div>
      </div>
  </div>
  )
}