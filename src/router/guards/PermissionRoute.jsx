import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"

export default function PermissionRoute({ children, permissions = [] }) {
  const { user, canAny } = useAuth()

/*   if (!user) {
    return <Navigate to="/login" />
  } */

    if (!user) {
      return <Navigate to="/" />
    }

  if (!canAny(permissions)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
