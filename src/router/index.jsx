import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import Home from "@/pages/Home"
import { authRoutes } from "./modules/auth.routes"
import { orgRoutes } from "./modules/org.routes"
import { userRoutes } from "./modules/users.routes"
import { documentRoutes } from "./modules/docs.routes"
import { temporalidadeRoutes } from "./modules/temporalidades.routes"
import { docTypeRoutes } from "./modules/doc-types.routes"
import { cabinetsRoutes } from "./modules/cabinets.routes"
import { areaRoutes } from "./modules/areas.routes"
import { departmentsRoutes } from "./modules/departs.routes"
import { drawersRoutes } from "./modules/drawers.routes"
import { processCoversRoutes } from "./modules/process-covers.routes"
import { archiveRoutes } from "./modules/archives.routes"
import { settingsRoutes } from "./modules/settings.routes"
/* import { globalSearchRoutes } from "./modules/global-search.routes" */

import PrivateRoute from "./guards/PrivateRoutes"
import { AuthProvider } from "@/context/AuthContext"
import Landing from "@/features/landing/pages/Landing"
import QrCodePage from "@/pages/QrCodePage"

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/qrcode/:token", element: <QrCodePage /> },
  ...authRoutes,
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      ...orgRoutes,
      ...userRoutes,
      ...documentRoutes,
      ...archiveRoutes,
      ...temporalidadeRoutes,
      ...cabinetsRoutes,
      ...docTypeRoutes,
      ...departmentsRoutes,
      ...areaRoutes,
      ...drawersRoutes,
      ...processCoversRoutes,
      ...settingsRoutes
      /*       ...globalSearchRoutes */
    ],
  },
])

export default router
