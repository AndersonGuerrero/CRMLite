import gql from 'graphql-tag'

export const NEW_CLIENT_MUTATION = gql`
	mutation createClient($input: ClientInput!){
	  createClient(input: $input){
	    _id
	    name
	    lastname
	    company
	  }
	}
`
export const UPDATE_CLIENT_MUTATION = gql` 
	mutation updateClient($input: ClientUpdateInput!) {
	  updateClient(input: $input) {
	    name
	    lastname
	    age
		type
	    company
	    emails {
	      email
	    }
	  }
	}
`

export const REMOVE_CLIENT_MUTATION = gql` 
mutation removeClient($_id: ID!){
  removeClient(_id: $_id)
}
`
