import React from 'react';
import { Query } from 'react-apollo';
import { FILL_CLIENT_QUERY } from '../../queries'
import { FormEditClient } from './FormEditClient'

export const EditClient = (props) => {

  const { id } = props.match.params
  
  return (
    <>
      <h2 className="text-center">Editar Cliente</h2>
      <div className="row justify-content-center">
        <Query query={FILL_CLIENT_QUERY} variables={{id}}> 
          {( {loading, error, data, refetch} ) =>{
            if (loading) return 'Cargando'
            if (error) return `Error: ${error.message}`
            return (
              <FormEditClient
                client={data.getClient}
                refetch={refetch}
              />
            )
          }}
        </Query>
      </div>
    < />
  )
}
