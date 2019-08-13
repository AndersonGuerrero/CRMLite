import React from 'react'

export const Product = ({ product, setProductQuantity, index }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>${product.price}</td>
      <td>{product.stock}</td>
      <td>
        <input 
        onChange={ e => setProductQuantity(e.target.value, index)} 
        type="number" className="form-control" />
      </td>
      <td>
        <button type="button" className="btn btn-danger font-weight-bold">Eliminar</button>
      </td>
    </tr>
  )
}