import { Navigate, Outlet, useLocation } from 'react-router'
import Loader from './Loader'
import { useAuth } from '../store/AuthContext'

function RequireAuth() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="screen-loader">
        <Loader />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export default RequireAuth