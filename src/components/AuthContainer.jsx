import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useUserStore from '../store/userSlice'

export const AuthContainer = ({children}) => {
  const isLoggedIn = useUserStore(state => state.isLoggedIn)
  const navigate = useNavigate();
  
  return (
    <>
      { isLoggedIn ? <Navigate to='/profile'/> : children }
    </>
  )

}
