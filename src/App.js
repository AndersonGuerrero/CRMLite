import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks"
import { positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"

import './index.css'
import { Header } from './components/Layout/Header'
import { ListClients, NewClient, EditClient } from './components/Clients'
import { NewProduct, EditProduct, ListProducts } from './components/Products'
import { NewOrder, ClientOrders } from './components/Orders'
import { Dashboard } from './components/Dashboard'
import { Register, Login } from './components/Auth'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT
};

const client = new ApolloClient({
  // Enviar token al erver
  fetchOptions:{
    credentials: 'include'
  },
  request: operation =>{
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  cache: new InMemoryCache({
    addTypename: false
  }),
  uri: process.env.REACT_APP_API_URL,
  onError: ({ networkError, graphQLErrors})=>{
    console.log('graphQLErrors: ', graphQLErrors)
    console.log('networkError: ', networkError)
  }
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloProviderHooks client={client}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Router>
            <>
            	<Header />
              <div className="container">
                <Switch>
                  <Route exact path="/clients" component={ListClients} />
                  <Route exact path="/clients/new" component={NewClient} />
                  <Route exact path="/clients/edit/:id" component={EditClient} />
                  <Route exact path="/products/new" component={NewProduct} />
                  <Route exact path="/products/edit/:id" component={EditProduct} />
                  <Route exact path="/products" component={ListProducts} />
                  <Route exact path="/orders/new/:id" component={NewOrder} />
                  <Route exact path="/orders/:id" component={ClientOrders} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/users/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            < />
          </Router>
        </AlertProvider> 
      </ApolloProviderHooks>
    </ApolloProvider>
  );
}

export default App;
