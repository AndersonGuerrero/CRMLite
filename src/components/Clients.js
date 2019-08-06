import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_CLIENTS_QUERY } from '../queries'

export const Clients = () => (
  <Query query={GET_CLIENTS_QUERY}>
    {({ loading, error, data}) =>{
      if (loading) return "Cargando..."
      if (error) return `Error: ${error.message}`
      console.log(data)
      return (
        <Fragment>
          <h2 className="text-center">Listado de clientes</h2>
          <ul className="list-group mt-4">
            {
              data.getClients.map( item => ( 
                <li className="list-group-item" key={item._id}>
                  <div className="row justify-content-between align-items-center" >
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                      {item.name} {item.lastname}
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <Link to={`/client/edit/${item._id}`} className="btn btn-success d-block d-md-inline-block">
                        Editar CLiente
                      </Link>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </Fragment>
      )
    }}
  </Query>
)
