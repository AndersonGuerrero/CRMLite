import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const _Logout = ({ history })=> {

  const closeSession = (client, history)=>{
    localStorage.removeItem('token', '')
    client.resetStore()
    history.push('/login')
  }

	return(
    <ApolloConsumer>
    {
      client =>{
        return (
          <button onClick={()=>closeSession(client, history)} className="dropdown-item mt-2 mt-md-0">
            Salir
          </button>
          )
      }
    }
    </ApolloConsumer>
  )
}

const Logout =withRouter(_Logout)
export { Logout }