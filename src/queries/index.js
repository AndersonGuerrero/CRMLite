import gql from 'graphql-tag'

export const GET_CLIENTS_QUERY = gql`{
  getClients {
    _id
    name
    lastname
    company
  }
}
`
export const FILL_CLIENT_QUERY = gql`
query fillClientEdit($id: ID!){
    getClient(_id: $id){
      _id
  		name
    	lastname
    	company
    	age
    	type
    	emails{
        email
      }
  	}
  }
`