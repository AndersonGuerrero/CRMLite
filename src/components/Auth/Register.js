import React, { Fragment, useState } from 'react';
import { useMutation } from "react-apollo-hooks"
import { useAlert } from "react-alert";

import { CREATE_USER_MUTATION } from '../../mutations'

export const Register = (props) => {
  const alert = useAlert()
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    username: '',
    password: '',
    repitPassword: ''
  })
  
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION)

  const onChange = (e)=>{
    const { name, value} = e.target
    setUser({
        ...user,
        [name]: value
    })
  }

  const onSave = (e)=>{
    e.preventDefault()
    const {name, lastname, username, password, repitPassword } = user
    if (repitPassword !== password){
      alert.error('Las contraseñas deben ser iguales')
      return;
    }
    const input = {
      name,
      lastname,
      username,
      password
    }

    createUser({
      variables: { input }
    }).then(
      ({data})=>{
        const { error, message } = data.createUser
        if(error){
          alert.error(message)
        }else{
          alert.show(message)
          props.history.push('/users')
        }
      },
      error => {
        alert.error(error)
    })
  }

  return(
    <Fragment>
      <h1 className="text-center mb-5">Nuevo Usuario</h1>
      <div className="row justify-content-center mb-2">
        <form className="col-md-8" onSubmit={ onSave }>
          <div className="form-group">
              <label>Nombre</label>
              <input 
                  type="text" 
                  name="name" 
                  required
                  onChange={ onChange }
                  className="form-control" 
                  placeholder="Nombre" 
              />
          </div>
          <div className="form-group">
              <label>Apellido</label>
              <input 
                  required
                  type="text" 
                  name="lastname" 
                  onChange={ onChange }
                  className="form-control" 
                  placeholder="Apellido" 
              />
          </div>
          <div className="form-group">
              <label>Usuario</label>
              <input 
                  type="text"
                  required
                  name="username" 
                  onChange={ onChange }
                  className="form-control" 
                  placeholder="Nombre Usuario" 
              />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input 
                  onChange={ onChange }
                  type="password" 
                  name="password"
                  required
                  className="form-control" 
                  placeholder="Password"
              />
          </div>
          <div className="form-group">
              <label>Repetir Password</label>
              <input 
                  type="password"
                  required
                  onChange={ onChange } 
                  name="repitPassword" 
                  className="form-control" 
                  placeholder="Repetir Password" 
              />
          </div>
          {
            loading &&
            <p className='float-left'>Guardando...</p>
          }
          {
            !loading &&
            <button 
                type="submit" 
                className="btn btn-success float-right">
                    Crear Usuario
            </button>
          }
        </form>
      </div>
    </Fragment>
  )
}