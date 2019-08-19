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
//------------------ Products --------------------------

export const NEW_PRODUCT_MUTATION = gql`
	mutation createProduct($input: ProductInput!){
	  createProduct(input: $input){
	    _id
	    name
	    price
	    stock
	  }
	}
`

export const UPDATE_PRODUCT_MUTATION = gql` 
	mutation UpdateProduct($input: ProductUpdateInput!) {
	  updateProduct(input: $input) {
	    name
	    price
	    stock
	  }
	}
`

export const REMOVE_PRODUCT_MUTATION = gql` 
mutation removeProduct($_id: ID!){
  removeProduct(_id: $_id)
}
`

export const NEW_ORDER_MUTATION = gql` 
mutation createOrder($input: OrderInput!){
  createOrder(input: $input){
    _id
    client
    total
    state
    date
    order {
      product_id
      quantity
    }
  }
}
`
export const UPDATE_ORDER_MUTATION = gql`
mutation updateOrder($input: OrderUpdateInput!){
  updateOrder(input: $input){
  	_id
  	state
  }
}
`

export const CREATE_USER_MUTATION = gql`
mutation createUser($input: UserInput!){
  createUser(input: $input){
  	error
  	message
  }
}
`
// Mutation para Login de usuarios 
export const LOGIN_USER_MUTATION = gql`
mutation authentication($input: AuthInput!){
  authentication(input: $input){
    error
    message
    token
  }
}
`