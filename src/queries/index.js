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
