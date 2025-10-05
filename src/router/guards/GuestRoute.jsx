import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"
import APPLoader from "@/components/loader"

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <APPLoader />
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
