import { Outlet, Navigate } from 'react-router-dom'








const ProtectedRoutes = ({isLoggedIn}) => {
  
  return isLoggedIn ? <Outlet/> : <Navigate to="/dashboard/login"/>
}

export default ProtectedRoutes
