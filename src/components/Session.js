import React from 'react'
import { Query } from 'react-apollo';
import { USER_ACTUAL_QUERY } from '../queries'

export const Session = (Component) => (props) => {
	return (
    <Query query={USER_ACTUAL_QUERY}>
    {( {loading, error, data, refetch} ) =>{
      if ( loading ) return null
	    if ( error ) return `Èrror: ${error}`
		  return (
        <Component {...props} refetch={refetch} session={data}/>
      )
    }}
    </Query>
	)
}