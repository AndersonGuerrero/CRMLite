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

export const FILL_PRODUCT_QUERY = gql`
query fillProductEdit($_id: ID!){
    getProduct(_id: $_id){
      _id
      name
      stock
      price
    }
  }
`

export const GET_PRODUCTS_QUERY = gql`
query getProducts($limit: Int, $offset: Int, $stock: Boolean){
  products: getProducts(limit: $limit, offset: $offset, stock: $stock) {
    _id
    name
    price
    stock
  }
  totalProducts: getTotalProducts
}`

export const GET_ORDERS_QUERY = gql`
query getOrders($limit: Int, $offset: Int, $client: ID){
  orders: getOrders(limit: $limit, offset: $offset, client: $client) {
    _id
    order {
      product_id
      quantity
    }
    client
    total
    date
    state
  }
}`


// Graficas
export const GET_TOP_CLIENTS_QUERY = gql`
query getTopClients {
  TopClients: getTopClients{
    total
    client{
      name
      lastname
      type
    }
  }
}
`

// Users and sessins queries
export const USER_ACTUAL_QUERY = gql`
query  getAuthenticatedUser {
  userActual: getAuthenticatedUser{
    _id
    name
    lastname
    username
    role
  }
}
`