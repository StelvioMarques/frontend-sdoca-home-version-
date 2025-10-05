"use client"

import * as React from "react"
import { Building2, Calendar, Eye, MoreHorizontal, Pencil, Plus, Search, Trash2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

// Dados de exemplo das organizações
const organizations = [
  {
    id: 1,
    name: "TechCorp Solutions",
    description: "Empresa de tecnologia especializada em soluções corporativas",
    areas: 8,
    users: 45,
    status: "active",
    createdAt: "2023-01-15",
    logo: "TC",
  },
  {
    id: 2,
    name: "Inovação Digital",
    description: "Consultoria em transformação digital e inovação",
    areas: 5,
    users: 23,
    status: "active",
    createdAt: "2023-03-22",
    logo: "ID",
  },
  {
    id: 3,
    name: "Global Services",
    description: "Prestação de serviços globais para empresas multinacionais",
    areas: 12,
    users: 78,
    status: "active",
    createdAt: "2022-11-08",
    logo: "GS",
  },
  {
    id: 4,
    name: "StartUp Hub",
    description: "Incubadora de startups e projetos inovadores",
    areas: 3,
    users: 15,
    status: "inactive",
    createdAt: "2023-06-10",
    logo: "SH",
  },
  {
    id: 5,
    name: "Consultoria Estratégica",
    description: "Consultoria em estratégia empresarial e gestão",
    areas: 6,
    users: 32,
    status: "active",
    createdAt: "2023-02-28",
    logo: "CE",
  },
  {
    id: 6,
    name: "Educação Online",
    description: "Plataforma de ensino à distância e cursos online",
    areas: 4,
    users: 28,
    status: "active",
    createdAt: "2023-04-12",
    logo: "EO",
  },
]

export function OrganizationsCards() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.description.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleView = (org) => {
    console.log("Visualizar organização:", org)
  }

  const handleEdit = (org) => {
    console.log("Editar organização:", org)
  }

  const handleDelete = (org) => {
    console.log("Excluir organização:", org)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Organizações</h1>
          <p className="text-muted-foreground">Gerencie todas as organizações do sistema</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Organização
        </Button>
      </div>
      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar organizações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8" />
        </div>
      </div>
      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrganizations.map((org) => (
          <Card key={org.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                  {org.logo}
                </div>
                <div>
                  <CardTitle className="text-lg">{org.name}</CardTitle>
                  <Badge
                    variant={org.status === "active" ? "default" : "secondary"}
                    className="text-xs">
                    {org.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleView(org)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(org)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDelete(org)} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{org.description}</CardDescription>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Áreas:</span>
                  <span className="font-medium">{org.areas}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Usuários:</span>
                  <span className="font-medium">{org.users}</span>
                </div>
                <div className="flex items-center space-x-2 col-span-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Criado em:</span>
                  <span className="font-medium">{new Date(org.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredOrganizations.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhuma organização encontrada</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros de busca.</p>
        </div>
      )}
    </div>
  );
}
