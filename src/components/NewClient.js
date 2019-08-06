import React, { Fragment, useState } from 'react'
import { Mutation } from 'react-apollo'

import { NEW_CLIENT_MUTATION } from '../mutations'

export const NewClient = () => {
  const [error, setError] = useState(false)
  const [client, setClient] = useState({
      name: '',
      lastname: '',
      company: '',
      age: '',
      type: ''
  });

  const errorMessage = (error) ? <p className="alert alert-danger p-3 text-center"> 
    Todos los campos son obligatorios
    </p> : ''
  
  return (
    <Fragment>
      <h2 className="text-center">Nuevo CLiente</h2>
      {errorMessage}
      <div className="row justify-content-center">
        <Mutation mutation={NEW_CLIENT_MUTATION}>
          { createClient => (
            <form className="col-md-8 m-3" onSubmit={ e =>{
                e.preventDefault()
                const {name, lastname, company, age, type } = client
                if (name === '' || lastname === '' || type === ''){
                  setError(true)
                  return
                } else {
                  setError(false)
                }

                const input = {
                  name,
                  lastname,
                  company,
                  age: Number(age),
                  type
                }

                createClient({
                  variables: { input }
                })
            }} >
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Nombre</label>
                        <input type="text" className="form-control" onChange={ e => {
                          setClient({
                              ...client,
                              name: e.target.value
                          })
                        }} placeholder="Nombre"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Apellido</label>
                        <input type="text" onChange={ e => {
                          setClient({
                              ...client,
                              lastname: e.target.value
                          })
                        }} className="form-control" placeholder="Apellido"/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Empresa</label>
                        <input type="text" className="form-control" placeholder="Empresa" onChange={ e => {
                          setClient({
                              ...client,
                              company: e.target.value
                          })
                        }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Edad</label>
                        <input type="text" className="form-control" placeholder="Edad" onChange={ e => {
                          setClient({
                              ...client,
                              age: e.target.value
                          })
                        }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Tipo Cliente</label>  
                        <select className="form-control" onChange={ e => {
                              setClient({
                                  ...client,
                                  type: e.target.value
                              })
                            }} >
                            <option value="">Elegir...</option>
                            <option value="PREMIUM">PREMIUM</option>
                            <option value="BASICO">BÁSICO</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success float-right">Guardar Cliente</button>
            </form>
          )}
        </Mutation>
      </div>
    </ Fragment>
  )
}