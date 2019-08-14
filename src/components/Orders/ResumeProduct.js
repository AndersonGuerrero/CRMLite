import React from 'react'

export const ResumeProduct = ({product, quantity}) => {
  return (
    <div className="border mb-4 p-3">
      <p className="card-text font-weight-bold">
        Nombre:
        <span className="font-weight-normal"> {product.name}</span>
      </p>
      <p className="card-text font-weight-bold">
        Cantidad:
        <span className="font-weight-normal"> {quantity}</span>
      </p>
      <p className="card-text font-weight-bold">
        Precio:
        <span className="font-weight-normal"> $ {product.price}</span>
      </p>
    </div>
  ) 
}
