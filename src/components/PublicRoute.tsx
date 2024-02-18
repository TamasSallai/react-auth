import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/auth'

const PublicRoute = () => {
  const { user } = useAuthContext()
  const location = useLocation()

  return !user ? (
    <Outlet />
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  )
}

export default PublicRoute
