import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { GET_CLIENTS_QUERY } from '../queries'
import { REMOVE_CLIENT_MUTATION } from '../mutations'
import { Paginator } from './Paginator'

export const Clients = () => {
    const clients_per_page = 2
    const [paginator, setPaginator] = useState({
      offset: 0,
      page: 1
    })
    const variables = {
      limit: clients_per_page,
      offset: paginator.offset
    }

    const onChangePage = (page)=>{
      let newoffset = 0
      if (paginator.page < page){
        newoffset = paginator.offset + clients_per_page
      }else{
        newoffset = paginator.offset - clients_per_page
      }
      setPaginator(
          { 
            page,
            offset: newoffset   
          }
        )
    }

   return (<Query query={GET_CLIENTS_QUERY} variables={variables} pollInterval={8000}>
      {({ loading, error, data, refetch, StartPolling, StopPolling}) =>{
        if (loading) return "Cargando..."
        if (error) return `Error: ${error.message}`
        return (
          <Fragment>
            <h2 className="text-center">Listado de clientes</h2>
            <ul className="list-group mt-4">
              {
                data.clients.map( item => ( 
                  <li className="list-group-item" key={item._id}>
                    <div className="row justify-content-between align-items-center" >
                      <div className="col-md-8 d-flex justify-content-between align-items-center">
                        {item.name} {item.lastname}
                      </div>
                      <div className="col-md-3 d-flex justify-content-end">
                        <Link to={`/client/edit/${item._id}`} className="btn btn-success d-block d-md-inline-block">
                          Editar
                        </Link>
                        <Mutation 
                            mutation={REMOVE_CLIENT_MUTATION}
                            onCompleted={ () =>refetch()}
                            >
                          {
                            removeClient =>(
                              <button type="button" 
                                  onClick={()=>{
                                    if (window.confirm('Deseas eliminar el cliente?')){
                                      removeClient({
                                        variables: {
                                          _id: item._id
                                        }
                                      })
                                    }
                                  }
                              } 
                                className="btn btn-danger d-block d-md-inline-block ml-3">
                                 &times; Emiminar
                                </button>
                            )
                          }
                        </Mutation>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
            <Paginator 
              onChangePage={onChangePage} 
              page={paginator.page} 
              clients_per_page={clients_per_page} 
              total={data.totalClients}  />
          </Fragment>
        )
      }}
    </Query>)
}
