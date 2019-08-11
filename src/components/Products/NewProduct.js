import React, { Fragment, useState } from 'react'
import { useMutation } from "react-apollo-hooks"

import { NEW_PRODUCT_MUTATION } from '../../mutations'

export const NewProduct = (props) => {
  const [createProduct, { loading }] = useMutation(NEW_PRODUCT_MUTATION)
  const [isComplete, setIsComplete] = useState(false)
  const [product, setProduct] = useState({
      name: '',
      price: '',
      stock: ''
  })
  
  const validateForm = ()=>{
    const {name, stock, price } = product
    const novalid = !name || !price  || !stock
    return novalid
  }

  const onSave = (e)=>{
    e.preventDefault()
    const {name, stock, price } = product
    const input = {
      name,
      stock: Number(stock),
      price: Number(price)
    }

    setIsComplete(false)
    createProduct({
      variables: { input }
    }).then(
      result=>{
        props.history.push('/products')
      },
      error => {
      console.error(error)
    })
  }

  const onChange = (e)=>{
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: value
    })
  }

  return (
    <Fragment>
      <h2 className="text-center">Nuevo Producto</h2>
      <div className="row justify-content-center">
            <form 
              className="col-md-8 m-3" 
              onSubmit={ onSave }>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Nombre</label>
                        <input name="name" type="text" className="form-control" onChange={ onChange } placeholder="Nombre"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Precio</label>
                        <input type="number" name="price" onChange={ onChange} className="form-control" placeholder="Precio"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Stock</label>
                        <input type="number" className="form-control" name="stock" placeholder="Stock" onChange={ onChange } />
                    </div>
                </div>
                {
                  loading &&
                  <p className='float-left'>Guardando...</p>
                }
                {
                  isComplete &&
                  <p className='float-left'>Producto Guardado!</p>
                }
                <button 
                  type="submit"
                  disabled={validateForm()}
                  className="btn btn-success float-right">
                  Guardar Producto
                </button>
            </form>
      </div>
    </ Fragment>
  )
}
