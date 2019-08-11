import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from "react-apollo-hooks"
import { GET_CLIENTS_QUERY } from '../../queries'
import { REMOVE_CLIENT_MUTATION } from '../../mutations'
import { Paginator } from '../Layout/Paginator'

export const ListClients = () => {
    const limit = 5
    const [paginator, setPaginator] = useState({
      offset: 0,
      page: 1
    })
    const variables = {
      limit: limit,
      offset: paginator.offset
    }

    const { loading, error, data, refetch } = useQuery(GET_CLIENTS_QUERY, {
      variables: variables
    })

    const [removeClient] = useMutation(REMOVE_CLIENT_MUTATION)

    const onRemoveClient = (_id)=>{
      if (window.confirm('Deseas eliminar el cliente?')){
        removeClient({
          variables: {
            _id: _id
          }
        }).then( ({data})=>{
          refetch()
        }, (erro)=>{
          console.log(error)
        } )
      }
    }

    const onChangePage = (page)=>{
      let newoffset = 0
      if (paginator.page < page){
        newoffset = paginator.offset + limit
      }else{
        newoffset = paginator.offset - limit
      }
      setPaginator(
          { 
            page,
            offset: newoffset   
          }
        )
    }
  if (loading) return "Cargando..."
  if (error) return `Error: ${error.message}`

  return (
    <Fragment>
      <h2 className="text-center">Clientes</h2>
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
                  <button type="button" 
                      onClick={()=>onRemoveClient(item._id)} 
                    className="btn btn-danger d-block d-md-inline-block ml-3">
                     &times; Emiminar
                    </button>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      <Paginator 
        onChangePage={onChangePage} 
        page={paginator.page} 
        limit={limit} 
        total={data.totalClients}  />
    </Fragment>
    )
}
