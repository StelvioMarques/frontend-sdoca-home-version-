import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"
import APPLoader from "@/components/loader"

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  console.log("🛡️ PrivateRoute:", { user, loading })

  if (loading) {
    return (
      <APPLoader />
    )
  }

/*   if (!user) {
    console.log("🔒 Redirecionando pro login...")
    return <Navigate to="/login" />
  } */

    if (!user) {
      console.log("🔒 Redirecionando pro login...")
      return <Navigate to="/" />
    }

  return children
}
