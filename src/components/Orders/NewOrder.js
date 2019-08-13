import React, { Fragment } from 'react'
import { ClientData } from './ClientData'
import { ProductsSection } from './ProductsSection'


export const NewOrder = (props) => {
  const { id } = props.match.params

  return (
    <Fragment>
      <h1 className="text-center mb-5" >Nuevo Pedido</h1>

      <div className="row">
        <div className="col-md-4">
          <ClientData 
            client_id={id}
          />           
        </div>
        <div className="col-md-8">
          <ProductsSection />
        </div>
      </div>
    </Fragment>
    )
}