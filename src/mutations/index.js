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