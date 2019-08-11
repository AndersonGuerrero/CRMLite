import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from "react-apollo-hooks"
import { UPDATE_PRODUCT_MUTATION } from '../../mutations'


const FormEditProduct_ = (props) =>{
  const [product, setProduct] = useState(props.product)
  const [error, setError] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { name, price, stock } = product 

  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT_MUTATION)
  
  const onSave = (e)=>{
    e.preventDefault()
    const {_id, name, price, stock } = product
    if (name === '' || price === '' || stock === ''){
      setError(true)
      return
    } else { setError(false) }
    
    const input = {
      _id,
      name,
      price: Number(price),
      stock: Number(stock)
    }
    setIsComplete(false)
    updateProduct({
      variables: { input }
    }).then(
      result=>{
        props.refetch().then(()=>props.history.push('/products'))
      },
      error => {
      console.error(error)
    })
  }

  const onChange = (e)=>{
    const { name, value} = e.target
    setProduct({
        ...product,
        [name]: value
    })
  }

  return (
      <form className="col-md-8 m-3" onSubmit={ onSave }>
          { error &&
            <p className="alert alert-danger p-3 text-center"> 
              Todos los campos son obligatorios
            </p>
          }
        <div className="form-row">
            <div className="form-group col-md-6">
                <label>Nombre</label>
                <input type="text" className="form-control"  defaultValue={name} name="name" onChange={ onChange } />
            </div>
            <div className="form-group col-md-6">
                <label>Precio</label>
                <input type="text" className="form-control" defaultValue={price} name="price" onChange={ onChange } />
            </div>
        </div>
      
        <div className="form-row">
            <div className="form-group col-md-12">
                <label>Stock</label>
                <input type="text" defaultValue={stock} className="form-control"  name="stock" onChange={ onChange }
                />
            </div>
        </div>
        <div className="">
          {
            loading &&
            <p className='float-left'>Guardando...</p>
          }
          {
            isComplete &&
            <p className='float-left'>Producto Actualizado!</p>
          }
          <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
        </div>
      </form>
  )
} 

// Higher Order Components
const FormEditProduct =withRouter(FormEditProduct_)
export { FormEditProduct }