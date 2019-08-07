import React, { Fragment, useState } from 'react'
import { Mutation } from 'react-apollo'

import { NEW_CLIENT_MUTATION } from '../mutations'

export const NewClient = (props) => {
  const [error, setError] = useState(false)
  const [emails, setEmails] = useState([])
  const [client, setClient] = useState({
      name: '',
      lastname: '',
      company: '',
      age: '',
      type: ''
  });
  const onChangeInputEmail = (e, i) =>{
    emails[i].email = e.target.value
    setEmails(emails)
  }

  const generateKey = () => {
    return `crm_lite_${ new Date().getTime() }`;
  }

  const newFieldEmail = ()=>{
    if (emails.length < 4){
      setEmails(emails.concat([{email: '', key: generateKey()}]))
    }else{
      alert("Limite de Emails por Cliente = 4")
    }
  }

  const deleteFieldEmail = (key)=>{
     setEmails(emails.filter( (item) => item.key !== key))
  }

  const errorMessage = (error) ? <p className="alert alert-danger p-3 text-center"> 
    Todos los campos son obligatorios
    </p> : ''
  

  return (
    <Fragment>
      <h2 className="text-center">Nuevo CLiente</h2>
      {errorMessage}
      <div className="row justify-content-center">
        <Mutation 
          mutation={NEW_CLIENT_MUTATION}
          onCompleted={ () => props.history.push('/')}
        >
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
                  type,
                  emails: emails.map( (item) => ({ email: item.email }))
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
                    <div className="form-group col-md-12">
                        <label>Empresa</label>
                        <input type="text" className="form-control" placeholder="Empresa" onChange={ e => {
                          setClient({
                              ...client,
                              company: e.target.value
                          })
                        }} />
                    </div>
                    <div className="form-group d-flex justify-content-center col-md-12">
                      <button type="button" className="btn btn-warning" onClick={newFieldEmail}>
                        + Agregar Email
                      </button>
                    </div>
                    {
                      emails.map( (item, index) => (
                        <div key={item.key} className="form-group col-md-12 d-flex">
                          <div className="input-group">
                            <input 
                              type="email"
                              className="form-control" 
                              placeholder="Email"
                              onChange={ (e)=>  onChangeInputEmail(e, index) } />
                            <div className="input-group-append">
                              <button type="button" className="btn btn-danger" onClick={()=>deleteFieldEmail(item.key)}>
                                &times; Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    }
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
                            <option value="BASIC">BÁSICO</option>
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