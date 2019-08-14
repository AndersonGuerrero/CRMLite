import React from 'react'

export const Product = ({ product, setProductQuantity, index, deleteProduct }) => {
  
  const onChangeInput = (e)=>{
    if(e.target.value > product.stock) e.target.value = '' 
    if(e.target.value <= 0) e.target.value = ''
    setProductQuantity(e.target.value, index)
  }

  return (
    <tr>
      <td>{product.name}</td>
      <td>${product.price}</td>
      <td>{product.stock}</td>
      <td>
        <input 
        onChange={ onChangeInput } 
        type="number"
        min="1"
        defaultValue={product.quantity} 
        className="form-control" />
      </td>
      <td>
        <button onClick={()=>deleteProduct(product._id)} type="button" className="btn btn-danger font-weight-bold">Eliminar</button>
      </td>
    </tr>
  )
}