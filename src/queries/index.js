import gql from 'graphql-tag'

export const GET_CLIENTS_QUERY = gql`
query getClients($limit: Int, $offset: Int){
  clients: getClients(limit: $limit, offset: $offset) {
    _id
    name
    lastname
    company
  }
  totalClients: getTotalClients
}`


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