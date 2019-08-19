import React, { Fragment, useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { useAlert } from "react-alert";
import { LOGIN_USER_MUTATION } from '../../mutations'

export const Login =  (props)=> {
  const alert = useAlert()
  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION)

  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const onChange = (e)=>{
    const { name, value} = e.target
    setLogin({
      ...login,
      [name]: value
    })
  }
  const validForm = ()=>{
    const { username, password } = login
    const noValido = !username || !password
    return noValido;
  }

  const onSubmit = (e) => {
    e.preventDefault()
    loginUser({
      variables: { input: login }
    }).then( ({data})=>{
      const {message, error, token } = data.authentication
      if (error) {
        alert.error(message)
      }else{
        localStorage.setItem('token', token)
        alert.success(message)
      }
    }, error => {
      alert.error(error)
    })
  }

  const {user, password} = login;
      
  return ( 
    <Fragment>
      <h1 className="text-center mb-5">Iniciar Sesión</h1>
      <div className="row  justify-content-center">
        <form onSubmit={ onSubmit } className="col-md-8">

          <div className="form-group">
              <label>Usuario</label>
              <input 
                  onChange={onChange} 
                  value={user}
                  type="text" 
                  required
                  name="username" 
                  className="form-control" 
                  placeholder="Nombre Usuario" 
              />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input 
                  onChange={onChange} 
                  value={password}
                  required
                  type="password" 
                  name="password" 
                  className="form-control" 
                  placeholder="Password"
              />
          </div>

          <button 
              disabled={ loading || validForm() }
              type="submit" 
              className="btn btn-success float-right">
                  Iniciar Sesión
          </button>
        </form>
      </div>
    </Fragment>
  )
}