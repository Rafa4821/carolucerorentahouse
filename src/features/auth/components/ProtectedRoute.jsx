import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../../../layout/components/LoadingSpinner'

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner fullPage />
  }

  return currentUser ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
