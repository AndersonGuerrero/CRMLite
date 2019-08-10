import React from 'react'

export const Paginator = (props) => {
	
  const { page, total , clients_per_page, onChangePage } = props
  const pages = Math.ceil(total / clients_per_page)
  if(page > pages){
    onChangePage(page-1)
  }
  return (
    <div className="mt-5 d-flex justify-content-center">
      { (page > 1) &&
        <button 
          onClick={()=>onChangePage(page-1)}  
          className="btn btn-success mr-2" 
          type="button" > 
          &laquo; Anterior
        </button> 
      }
      { (pages > 1) &&  
      <div className="ml-2 mr-3 mt-2">
        Pagina { page } de { pages }
      </div>
      }
      { (pages >= page + 1) &&
        <button 
          onClick={()=>onChangePage(page+1)} 
          className="btn btn-success mr-2" 
          type="button" >
           &laquo; Siguiente
        </button> 
      }
    </div>
	)
}