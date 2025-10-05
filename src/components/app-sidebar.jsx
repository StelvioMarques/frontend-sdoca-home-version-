import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Archive, Boxes, Building, Building2, FileText, Home, Layers, Search, Settings, Settings2, Users } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Organizações",
      url: "/dashboard/organizations",
      icon: Building2,
      permissions: ["rh-post"],
    },
    {
      title: "Departamentos",
      url: "/dashboard/departments",
      icon: Building,
      permissions: ["rh-post"],
    },
    {
      title: "Áreas",
      url: "/dashboard/areas",
      icon: Layers,
      permissions: ["rh-post"],
    },
    {
      title: "Usuários",
      url: "/dashboard/users",
      icon: Users,
      permissions: ["rh-post"],
    },
    {
      title: "Documentos",
      url: "/dashboard/documents",
      icon: FileText,
      permissions: ["tecnico-post"],
    },
    {
      title: "Arquivos",
      url: "/dashboard/archives",
      icon: Archive,
      permissions: ["tecnico-post"],
    },
    {
      title: "Definições",
      url: "/dashboard/settings",
      icon: Settings2,
      permissions: ["tecnico-post"],
    },
    /*  {
       title: "Pesquisa",
       url: "/dashboard/search",
       icon: Search,
       permissions: ["user-post"],
     }, */
  ],
}

export function AppSidebar({ ...props }) {
  const { canAny } = useAuth()
  const location = useLocation()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/dashboard">
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="text-lg font-semibold truncate">SDOCA</span>
                <span className="text-xs truncate text-muted-foreground">Gestão documental e arquivos</span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.filter((item) => !item.permissions || canAny(item.permissions)).map((item) => {
              const isHome = item.url === "/dashboard"
              const isActive = isHome
                ? location.pathname === item.url
                : location.pathname.startsWith(item.url)

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    onClick={() => console.log('testando...')}
                  >
                    <Link to={item.url} className="hover:[&>svg]:text-sidebar-icon-hover">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}


/* import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Link, useLocation } from "react-router-dom"
import { Building2, FileText, Home, Layers, Users, Briefcase, ChevronRight } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Organizações",
      url: "/dashboard/organizations",
      icon: Building2,
      permissions: ["super-admin-post", "admin-post"],
      items: [
        { title: "Departamentos", url: "/dashboard/organizations/departments", icon: Briefcase },
        { title: "Áreas", url: "/dashboard/areas", icon: Layers },
        { title: "Usuários", url: "/dashboard/users", icon: Users },
      ],
    },
    {
      title: "Documentos",
      url: "/dashboard/documents",
      icon: FileText,
      permissions: ["user-post"],
    },
  ],
}

export function AppSidebar({ ...props }) {
  const { canAny } = useAuth()
  const location = useLocation()

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/dashboard">
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="text-lg font-semibold truncate">SDOCA</span>
                <span className="text-xs truncate text-muted-foreground">
                  Gestão documental e arquivos
                </span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain
              .filter((item) => !item.permissions || canAny(item.permissions))
              .map((item) => {
                const isHome = item.url === "/dashboard"
                const isActive = isHome
                  ? location.pathname === item.url
                  : location.pathname.startsWith(item.url)

                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.items?.length && location.pathname.startsWith(item.url)}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                        <Link to={item.url}>
                          {item.icon && <item.icon className="" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>

                      {item.items?.length ? (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="flex items-center justify-center data-[state=open]:rotate-90">
                              <ChevronRight className="w-4 h-4 rounded-full text-accent-foreground hover:bg-muted dark:hover:bg-gray-700" />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((sub) => {
                                const isSubActive = location.pathname === sub.url
                                return (
                                  <SidebarMenuSubItem key={sub.title}>
                                    <SidebarMenuSubButton asChild isActive={isSubActive}>
                                      <Link to={sub.url}>
                                        {sub.icon && <sub.icon className="w-6 h-6" />}
                                        <span>{sub.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                )
              })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
 */
