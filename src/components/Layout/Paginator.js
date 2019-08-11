import React from 'react'

export const Paginator = (props) => {
	
  const { page, total , limit, onChangePage } = props
  const pages = Math.ceil(total / limit)
  if(page > pages){
    onChangePage(page-1)
  }
  return (
    <div className="mt-5 d-flex justify-content-center mb-2">
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