import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import Header from './components/Header'

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  onError: ({ networkError, graphQLErrors})=>{
    console.log('graphQLErrors: ', graphQLErrors)
    console.log('networkError: ', networkError)
  }
})

function App() {
  return (
    <ApolloProvider client={client}>
    	<Header />
    </ApolloProvider>
  );
}

export default App;
