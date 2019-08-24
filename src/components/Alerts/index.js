import React from 'react'

export const Success = ({ message }) => {
	return (
    <p className="alert alert-success py-3 text-center">
      { message }
    </p>
	)
}

export const ErrorAlert = ({ message }) => {
	return (
    <p className="alert alert-danger py-3 text-center">
      { message }
    </p>
	)
}
