import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks"

import './index.css'
import { Header } from './components/Layout/Header'
import { ListClients, NewClient, EditClient } from './components/Clients'
import { NewProduct, EditProduct, ListProducts } from './components/Products'
import { NewOrder, ClientOrders } from './components/Orders'

const client = new ApolloClient({
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
              </Switch>
            </div>
          < />
        </Router>
      </ApolloProviderHooks>
    </ApolloProvider>
  );
}

export default App;
