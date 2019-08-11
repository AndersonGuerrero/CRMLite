import React, { Fragment } from 'react'
import { useQuery } from "react-apollo-hooks"
import { FILL_PRODUCT_QUERY } from '../../queries'
import { FormEditProduct } from './FormEditProduct'

export const EditProduct = (props) => {
  const { id } = props.match.params
  const { loading, error, data, refetch } = useQuery(FILL_PRODUCT_QUERY, {
    variables: { _id: id }
  });

  if (loading) return <h2>Cargando...</h2>
  if (error) return `Error: ${error.message}`
  return (
    <Fragment>
      <h2 className="text-center">Editar Cliente</h2>
      <div className="row justify-content-center">
        <FormEditProduct
          product={data.getProduct}
          refetch={refetch}
        />
      </div>
    </Fragment>
  )
}