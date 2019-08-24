import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './index.css'
import { Header } from './components/Layout/Header'
import { ListClients, NewClient, EditClient } from './components/Clients'
import { NewProduct, EditProduct, ListProducts } from './components/Products'
import { NewOrder, ClientOrders } from './components/Orders'
import { Dashboard } from './components/Dashboard'
import { Register, Login } from './components/Auth'
import { Session } from './components/Session'

const App = ({ refetch, session }) => {
  const { userActual } = session
  const isLogin = userActual ? null : <Redirect to={{ pathname:'/login' }} /> 

  const PrivateRoute = ({ component: Component, ...rest }) =>{
  return (
    <Route
      {...rest}
      render={ props =>{
        if (userActual){
          if ( userActual.role === 'ADMIN' ) return <Component userActual={userActual} {...props} />
          else return <Redirect to={{ pathname: "/login", state: { from: props.location, message: 'No tiene Permisos' } }} />
        }else{
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        }
      }
      }
    />
  )
  }
  return (
    <Router>
      <>
      	<Header userActual={userActual} />
        <div className="container">
        { isLogin }
          <Switch>
            <Route exact path="/clients" component={ListClients} />
            <Route exact path="/clients/new" render={() => <NewClient userActual={userActual} /> } />
            <Route exact path="/clients/edit/:id" component={EditClient} />
            <Route exact path="/products/new" component={NewProduct} />
            <Route exact path="/products/edit/:id" component={EditProduct} />
            <Route exact path="/products" component={ListProducts} />
            <Route exact path="/orders/new/:id" render={ ()=> <NewOrder userActual={userActual} /> } />
            <Route exact path="/orders/:id" component={ClientOrders} />
            <Route exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/users/register" component={ Register } />
            <Route exact path="/login" render={ () => <Login userActual={userActual} refetch={refetch} /> } />
          </Switch>
        </div>
      < />
    </Router>
  )
}

const RootSession = Session(App)

export {  RootSession }