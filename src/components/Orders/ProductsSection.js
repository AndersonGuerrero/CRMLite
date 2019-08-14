import React, { Fragment, useState } from 'react'
import { useQuery } from "react-apollo-hooks"
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { GET_PRODUCTS_QUERY } from '../../queries'
import { Spinner } from '../Layout/Spinner'
import { Resume } from './Resume'
import { GenerateOrder } from './GenerateOrder'

export const ProductsSection = (props) => {
  const [ order, setOrder ] = useState({products: [], total: 0})
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_QUERY, {variables: { stock: true }})
  
  if (error) return `Error: ${error.message}`
  if (loading) return <Spinner />

  const onSelectChange = (productos)=>{
    if (productos){
      const totalvar = calculateTotal(productos)
      setOrder({
        products: productos,
        total: totalvar
      })
    } else {
      setOrder({
        products: [],
        total: 0
      })
    } 
  }

  const calculateTotal = (pro)=>{
    if(pro.length > 0){
      let total2 = 0
      pro.map((p)=> total2 += (p.price * ( p.quantity ? p.quantity : 0 )))
      return total2
    }else{
      return 0
    }
  }

  const deleteProduct = (id) => {
    const restproducts = order.products.filter( p => p._id !== id)
    const totalvar = calculateTotal(restproducts)
    setOrder({
        products: restproducts,
        total: totalvar
      })
  }

  const setProductQuantity = (quantity, index) => {
    order.products[index].quantity = Number(quantity)
    const totalvar = calculateTotal(order.products)
    setOrder({
        products: order.products,
        total: totalvar
      })
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
        value={order.products}
      /> 
      <Resume 
        products={order.products} 
        setProductQuantity={setProductQuantity}
        deleteProduct={deleteProduct}
      />
      {
        order.products.length !== 0 &&
        <p className="font-weight-bold float-right mt-3 mr-1">
          Total: 
          <span className="font-weight-normal ml-2">${order.total}</span>
        </p>
      }
      <GenerateOrder 
        products={order.products} 
        total={order.total}
        refetch={refetch}
      />
    </Fragment>
  )
}