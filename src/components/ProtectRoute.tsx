import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/auth'

const ProtectRoute = () => {
  const { user } = useAuthContext()
  const location = useLocation()

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  )
}

export default ProtectRoute
