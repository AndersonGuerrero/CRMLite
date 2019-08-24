import React from 'react'
import { useMutation } from "react-apollo-hooks"
import { NEW_ORDER_MUTATION } from '../../mutations'
import { withRouter } from 'react-router-dom'
import { Spinner } from '../Layout/Spinner'


const GenerateOrder_ = ({ products, total, match, history, refetch, userActual }) => {
  const [createOrder, { loading }] = useMutation(NEW_ORDER_MUTATION)
  
  const validatebtn = ()=>{
    if (total > 0) return false
    if (total <= 0) return true
  }

  const onGenerate = () => {
    const writeproducts = products.map(p => ({product_id: p._id, quantity: p.quantity }))
    console.log(writeproducts)
    const input = {
      total,
      order: writeproducts,
      client: match.params.id,
      seller: userActual._id
    }
    createOrder({
      variables: { input }
    }).then(
      result=>{
        refetch().then(()=>history.push('/clients'))
      },
      error => {
      console.error(error)
    })
  }

  if(products.length === 0) return null
  if(loading) return <Spinner />
  return (
    <button 
      onClick={onGenerate}
      disabled={validatebtn()}
      type="button" 
      className="btn btn-warning mt-2  mb-1">
      Generar Pedido
    </button>
  )
}

const GenerateOrder = withRouter(GenerateOrder_)
export { GenerateOrder }