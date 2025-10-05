import { Outlet } from 'react-router-dom'
import { AppSidebar } from "@/components/app-sidebar"
import { NotificationsPanel } from "@/components/notifications-panel"
import { UserNav } from "@/components/user-dropdown-action"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "sonner"
import { GlobalSearch } from "@/components/global-search"
import { SearchProvider } from "@/context/SearchContext"
import { useAuth } from '@/context/AuthContext'

export default function DashboardLayout() {
const {user}= useAuth()

  return (
    <SearchProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex items-center gap-2 h-14 shrink-0">
            <div className="flex items-center flex-1 gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" decorative className="mr-2 !h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">{user.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-3 ml-auto">
              <GlobalSearch placeholder="Pesquise..." />
              <NotificationsPanel />
              <UserNav />
            </div>
          </header>
          <div className="flex flex-col flex-1 gap-4 p-4">
            <Outlet />
          </div>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </SearchProvider>
  )
}