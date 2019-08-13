import React, { Fragment, useState } from 'react'
import { useQuery } from "react-apollo-hooks"
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { GET_PRODUCTS_QUERY } from '../../queries'
import { Spinner } from '../Layout/Spinner'
import { Resume } from './Resume'

export const ProductsSection = (props) => {
  const [ products, setProducts ] = useState([])
  const [ total, setTotal ] = useState(0)
  const { loading, error, data } = useQuery(GET_PRODUCTS_QUERY)
  
  if (error) return `Error: ${error.message}`
  if (loading) return <Spinner />

  const onSelectChange = (productos)=>{
    if (productos){
      setProducts(productos)
      calculateTotal()
    } else {
      setProducts([])
      setTotal(0)
    } 
  }

  const calculateTotal = ()=>{
    let total2 = 0
    for (var i = 0; i < products.length; i++) {
      total2 += (products[i].price * products[i].quantity) 
    }
    setTotal(total2)
  }

  const setProductQuantity = (quantity, index) => {
    products[index].quantity = Number(quantity)
    setProducts(products)
    calculateTotal()
  }

  return(
    <Fragment>
      <h4 className="text-center mb-5">Seleccionar Productos</h4>
       <Select 
        isMulti={true}
        onChange={onSelectChange}
        component={makeAnimated()}
        options={data.products}
        getOptionValue={(item)=>item._id}
        getOptionLabel={(item)=>item.name}
      /> 
      <Resume 
        products={products} 
        setProductQuantity={setProductQuantity}
      />
      <p className="font-weight-bold float-right">
        Total: 
        <span className="font-weight-normal ml-2">${total}</span>
      </p>
    </Fragment>
  )
}