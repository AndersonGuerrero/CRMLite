import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { generateKey } from '../functions'
import { UPDATE_CLIENT_MUTATION } from '../mutations'


const _FormEditClient = (props) =>{
  const emailFormat = props.client.emails.map( (e) => ({email: e.email, key: generateKey()}))
  const [emails, setEmails] = useState(emailFormat)
  const [error, setError] = useState(false)
  const [client, setClient] = useState(props.client)

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

  const onChangeInputEmail = (e, i) =>{
    emails[i].email = e.target.value
    setEmails(emails)
  }
  const { name, lastname, age, company, type } = client 

  const errorMessage = (error) ? <p className="alert alert-danger p-3 text-center"> 
    Todos los campos son obligatorios
  </p> : ''

  return (
    <Mutation 
      mutation={UPDATE_CLIENT_MUTATION}
      onCompleted={ () => props.refetch().then(()=>props.history.push('/')) }
    >
    { updateClient => (
      <form className="col-md-8 m-3" onSubmit={ e =>{
          e.preventDefault()
          const {_id, name, lastname, company, age, type } = client
          if (name === '' || lastname === '' || type === ''){
            setError(true)
            return
          } else {
            setError(false)
          }
          const input = {
            _id,
            name,
            lastname,
            company,
            age: Number(age),
            type,
            emails: emails.map( (item) => ({ email: item.email }))
          }
          updateClient({
            variables: { input }
          })
      }}>
        {errorMessage}
        <div className="form-row">
            <div className="form-group col-md-6">
                <label>Nombre</label>
                <input
                    type="text" 
                    className="form-control" 
                    defaultValue={name}
                    onChange={ e => {
                      setClient({
                          ...client,
                          name: e.target.value
                      })
                    }}
                />
            </div>
            <div className="form-group col-md-6">
                <label>Apellido</label>
                <input 
                    type="text" 
                    className="form-control"
                    defaultValue={lastname} 
                    onChange={ e => {
                      setClient({
                          ...client,
                          lastname: e.target.value
                      })
                    }}
                 />
            </div>
        </div>
      
        <div className="form-row">
            <div className="form-group col-md-12">
                <label>Empresa</label>
                <input
                    type="text" 
                    defaultValue={company}
                    className="form-control" 
                    onChange={ e => {
                            setClient({
                                ...client,
                                company: e.target.value
                            })
                          }}
                />
            </div>

            {emails.map((item, index) => (
                <div key={item.key} className="form-group col-md-12">
                      <label>Email { index + 1 }</label>
                    <div className="input-group">
                        <input 
                            type="email"
                            placeholder={`Email`}
                            className="form-control" 
                            onChange={(e)=>onChangeInputEmail(e, index)}
                            defaultValue={item.email}
                        />
                        <div className="input-group-append">
                            <button 
                                className="btn btn-danger" 
                                type="button" 
                                onClick={()=>deleteFieldEmail(item.key)}> 
                                &times; Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="form-group d-flex justify-content-center col-md-12">
                <button 
                    onClick={newFieldEmail}
                    type="button" 
                    className="btn btn-warning"
                >+ Agregar Email</button>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <label>Edad</label>
                <input
                    type="text" 
                    defaultValue={age}
                    className="form-control" 
                    onChange={ e => {
                                setClient({
                                    ...client,
                                    age: e.target.value
                                })
                              }}
                />
            </div>
            <div className="form-group col-md-6">
                <label>Tipo Cliente</label>  
                <select 
                    className="form-control"
                    value={ type }
                    onChange={ e => {
                                setClient({
                                    ...client,
                                    type: e.target.value
                                })
                              }}
                >
                    <option value="">Elegir...</option>
                    <option value="PREMIUM">PREMIUM</option>
                    <option value="BASICO">BÁSICO</option>
                </select>
            </div>
        </div>
        <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
      </form>
    )}
    </Mutation>
  )
} 

// Higher Order Components
const FormEditClient =withRouter(_FormEditClient)
export { FormEditClient }