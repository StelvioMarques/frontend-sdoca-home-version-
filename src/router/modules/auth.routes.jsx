import { Login } from "@/features/auth/pages/Login"
import { Register } from "@/features/auth/pages/Register"
import GuestRoute from "@/router/guards/GuestRoute"
import { AuthProvider } from "@/context/AuthContext"

export const authRoutes = [
  {
    path: "/login",
    element: (
      <AuthProvider>
        <GuestRoute>
          <Login />
        </GuestRoute>
      </AuthProvider>
    ),
  },
  /* {
    path: "/register",
    element: (
      <AuthProvider>
        <GuestRoute>
          <Register />
        </GuestRoute>
      </AuthProvider>
    ),
  }, */
]
