import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './index.css'
import { Header } from './components/Header'
import { Clients } from './components/Clients'
import { NewClient } from './components/NewClient'
import { EditClient } from './components/EditClient'

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
      <Router>
        <>
        	<Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clients} />
              <Route exact path="/client/new" component={NewClient} />
              <Route exact path="/client/edit/:id" component={EditClient} />
            </Switch>
          </div>
        < />
      </Router>
    </ApolloProvider>
  );
}

export default App;
