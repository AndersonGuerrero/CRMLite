import React, { Fragment } from 'react'
import { useQuery } from "react-apollo-hooks"
import { FILL_CLIENT_QUERY } from '../../queries'
import { Spinner } from '../Layout/Spinner'

export const ClientData = ({ client_id }) => {
  const { loading, error, data, refetch } = useQuery(FILL_CLIENT_QUERY, {
    variables: { id: client_id }
  })

  if (error ) return (<p className="text-center mb-3"> Error en la Carga... </p>)
  if (loading) return <Spinner />

  const { name, lastname, age, company, emails, type } = data.getClient
  return (
    <Fragment>
      <h4 className="text-center mb-3" >Detalles del Cliente</h4>
      <ul className="list-unstyled my-5">
        <li className="border font-weight-bold p-2">Nombre:
          <span className="font-weight-normal"> {name}</span>
        </li>
        <li className="border font-weight-bold p-2">Apellido:
          <span className="font-weight-normal"> {lastname}</span>
        </li>
        <li className="border font-weight-bold p-2">Edad:
          <span className="font-weight-normal"> {age}</span>
        </li>
        <li className="border font-weight-bold p-2">Compañia:
          <span className="font-weight-normal"> {company}</span>
        </li>
        {
          emails.length &&
            <li className="border font-weight-bold p-2">Emails:<br />
                {
                  emails.map((item)=>(
                    <span key={item.email} className="font-weight-normal">
                      {item.email} 
                      <br />
                    </span>
                  ))
                }
            </li>
        }
        <li className="border font-weight-bold p-2">Tipo:
          <span className="font-weight-normal"> {type}</span>
        </li>
      </ul>
    </Fragment>
  )
}