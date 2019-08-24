import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks"
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import { RootSession } from './App';
import * as serviceWorker from './serviceWorker';


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

ReactDOM.render(
      <ApolloProvider client={client}>
        <ApolloProviderHooks client={client}>
          <AlertProvider template={AlertTemplate} {...options}>
	          <RootSession />
          </AlertProvider> 
        </ApolloProviderHooks>
      </ApolloProvider>
           ,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
