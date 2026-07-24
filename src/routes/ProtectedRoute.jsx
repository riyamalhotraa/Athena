
// import { Navigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth.js'

// /**
//  * Guards nested routes behind an authenticated session.
//  * Unauthenticated users are redirected to /login and the
//  * originally requested location is preserved for a post-login redirect.
//  */
// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth()
//   const location = useLocation()

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />
//   }

//   return children
// }



export default function ProtectedRoute({ children }) {
  return children
}