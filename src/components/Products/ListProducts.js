import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from "react-apollo-hooks"
import { GET_PRODUCTS_QUERY } from '../../queries'
import { REMOVE_PRODUCT_MUTATION } from '../../mutations'
import { Paginator } from '../Layout/Paginator'
import { Success } from '../Alerts/Success'
import { Spinner } from '../Layout/Spinner'


export const ListProducts = () => {
    const limit = 5
    const [paginator, setPaginator] = useState({
      offset: 0,
      page: 1
    })
    const [alert, setAlert] = useState({
      message: "",
      show: false
    })
    const variables = {
      limit: limit,
      offset: paginator.offset
    }
    const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_QUERY, {
      variables: variables
    })
    const [removeProduct] = useMutation(REMOVE_PRODUCT_MUTATION)
    

    const onChangePage = (page)=>{
      let newoffset = 0
      if (paginator.page < page){
        newoffset = paginator.offset + limit
      }else{
        newoffset = paginator.offset - limit
      }
      setPaginator({ page, offset: newoffset })
    }

    const onRemoveProduct = (_id)=>{
      if (window.confirm('Deseas eliminar el cliente?')){
        removeProduct({
          variables: { _id }
        }).then(
        ({data})=>{
          refetch()
          setAlert({
            show: true,
            message: data.removeProduct
          })
          setTimeout(()=>{
            setAlert({
              show: false,
              message: ''
            })
          }, 3000)
        },
        error => {
          console.error(error)
        })
      }
    }

    if (error) return `Error: ${error.message}`
    if (loading) return <Spinner />
    return (
          <Fragment>
            <h2 className="text-center">Productos</h2>
              {
                alert.show &&
                <Success message={alert.message} />
              }
              <table className="table">
                  <thead>
                    <tr className="table-primary">
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Existencia</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    { data.products.map( item => {

                      let classStock =  ''
                      if ( item.stock < 50 ){
                        classStock = 'table-danger text-light'
                      } else if ( item.stock > 50 && item.stock < 100 ){
                        classStock = 'table-warning text-light'
                      }
                      return (
                        <tr key={item._id}>
                          <td>
                            { item.name }
                          </td>
                          <td>
                            { item.price }
                          </td>
                          <td className={classStock}>
                            { item.stock }
                          </td>
                          <td>
                            <button type="button" onClick={()=> onRemoveProduct(item._id)} className="btn btn-danger d-block d-md-inline-block ml-3">
                               &times; Emiminar
                            </button>
                          </td>
                          <td>
                            <Link to={`/products/edit/${item._id}`} className="btn btn-success d-block d-md-inline-block">
                                Editar
                              </Link>
                          </td>
                        </tr>)
                      })
                    }
                  </tbody>
              </table> 
            <Paginator 
              onChangePage={onChangePage} 
              page={paginator.page} 
              limit={limit} 
              total={data.totalProducts}  />
          </Fragment>
        )
}
