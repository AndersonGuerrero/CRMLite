import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Logout } from '../Auth';

export const Header = ({userActual}) => { 
  const navBar = userActual ? <NavAutenticate userActual={userActual} /> : <NavNotAutenticate />
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
      <div className="container">
        {navBar}
      </div>
    </nav>
  )
}

const NavNotAutenticate = ()=>(
  <Link to="/login" className="navbar-brand text-light font-weight-bold">
    CRM
  </Link>
)

const NavAutenticate = ({userActual})=>(
  <Fragment>
    <Link to="/dashboard" className="navbar-brand text-light font-weight-bold">
      CRM
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navegacion">
      <ul className="navbar-nav ml-auto text-right mt-2 mt-md-0">
          {
            userActual.role === 'ADMIN' &&
              <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                <button className="nav-link dropdown-toggle btn btn-block btn-success"
                  data-toggle="dropdown">
                  Usuarios
                </button>
                <div className="dropdown-menu" aria-labelledby="navegacion">
                  <Link to="/users" className="dropdown-item" >
                    Ver Usuarios
                  </Link>
                  <Link to="/users/register" className="dropdown-item" >
                    Nuevo Usuario
                  </Link>
                </div>
              </li>
          }
        <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
          <button className="nav-link dropdown-toggle btn btn-block btn-success"
            data-toggle="dropdown">
            Clientes
          </button>
          <div className="dropdown-menu" aria-labelledby="navegacion">
            <Link to="/clients" className="dropdown-item" >
              Ver Clientes
            </Link>
            <Link to="/clients/new" className="dropdown-item" >
              Nuevo Clientes
            </Link>
          </div>
        </li>
        <li className="nav-item dropdown">
          <button className="nav-link dropdown-toggle btn btn-block btn-success"
            data-toggle="dropdown">
            Productos
          </button>
          <div className="dropdown-menu" aria-labelledby="navegacion">
            <Link to="/products" className="dropdown-item" >
              Ver Productos
            </Link>
            <Link to="/products/new" className="dropdown-item" >
              Nuevo Producto
            </Link>
          </div>
        </li>
        <li className="nav-item dropdown ml-md-2 mb-2 mb-md-0">
          <button className="nav-link dropdown-toggle btn btn-block btn-success"
            data-toggle="dropdown">
            {userActual.name} {userActual.lastname}
          </button>
          <div className="dropdown-menu" aria-labelledby="navegacion">
            <Logout />
          </div>
        </li>
      </ul>
    </div>
  </Fragment>
)
