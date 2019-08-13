import React, { Fragment } from 'react'
import { Product } from './Product'

export const Resume = ({ products, setProductQuantity }) => {
  
  if (products.length === 0) return null
  return (
    <Fragment>
      <h4 className="text-center my-5">Resumen y cantidades</h4>
      <table className="table">
        <thead className="bg-success text-light">
          <tr className="font-weight-bold">
            <th>Producto</th>
            <th>Precio</th>
            <th>Inventario</th>
            <th>Cantidad</th>
            <th>ELiminar</th>
          </tr>
        </thead>
        <tbody>
        {
          products.map((product, index)=>(
            <Product setProductQuantity={setProductQuantity} index={index} key={product._id} product={product} />)
          )
        }
        </tbody>
      </table>
    </Fragment>
  )
}