import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from '../components//Loader'

function PrivateRoute() {
  const {isLogin , chackingStatus} = useAuthStatus();
  
  if(chackingStatus){ 
    return <Spinner/>
  }

  return (
     isLogin ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoute