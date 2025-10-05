
import { Calendar, Edit, Mail, MapPin, Phone, Users, Layers, Loader2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useOrganization } from "../hooks/OrganizationsHooks"
import { useParams } from "react-router-dom"
/* import { useNavigate } from "react-router-dom" */


export default function ViewOrganization() {
  const { id } = useParams()
  /* const navigate = useNavigate() */
  const { organization, isLoading } = useOrganization(id)

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Side */}
      <div className="space-y-6 lg:col-span-1">
        {/* Card Principal */}
        <Card className='shadow-none'>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-sm font-bold rounded-full bg-primary text-primary-foreground">
              {organization.logo || 'Cazenga'}
            </div>
            <CardTitle className="text-xl">{organization.name_org}</CardTitle>
            <CardDescription>{organization.descricao_org}</CardDescription>
            {/*  <Badge variant={organization.status === "active" ? "default" : "secondary"} className="mx-auto w-fit">
              {organization.status === "active" ? "Ativa" : "Inativa"}
            </Badge> */}
          </CardHeader>
          {/* <CardContent>
            <Button className="w-full" /* onClick={() => navigate(`/dashboard/organization/edit/${organization.}`)}>
              <Edit className="w-4 h-4 mr-2" />
              Editar Organização
            </Button>
          </CardContent> */}
        </Card>

        {/* Card de Estatísticas */}
        <Card className='shadow-none'>
          <CardHeader>
            <CardTitle className="text-lg">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Funcionários</span>
              </div>
              <span className="font-semibold">{organization.totais.usuarios}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Departamentos</span>
              </div>
              <span className="font-semibold">{organization.totais.departamentos}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Fundada</span>
              </div>
              <span className="font-semibold">{new Date(organization.created_at).getFullYear()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Card de Contato */}
        <Card className='shadow-none'>
          <CardHeader>
            <CardTitle className="text-lg">Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{organization.telefone_org}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{organization.email_org}</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{organization.provincia_org}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Área principal com tabela */}
      <div className="lg:col-span-2">
        <Card className="shadow-none h-fit">
          <CardHeader>
            <CardTitle>Departamentos</CardTitle>
            <CardDescription>Visualização detalhada de todos departamentos</CardDescription>
          </CardHeader>
          <CardContent>
            {organization.departamentos.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Departamento</TableHead>
                    {/* <TableHead>Responsável</TableHead>
                    <TableHead className="text-center">Funcionários</TableHead> */}
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-20 text-center"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organization.departamentos.map((depart) => (
                    <TableRow key={depart.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{depart.name_departamento}</p>
                          <p className="text-sm text-muted-foreground">{depart.description}</p>
                        </div>
                      </TableCell>
                      {/* <TableCell>{area.manager}</TableCell> */}
                      {/*  <TableCell className="text-center">{area.employees}</TableCell> */}
                      <TableCell className="text-center">
                        <Badge variant={depart.status_departamento === '1' ? "default" : "secondary"}>
                          {depart.status_departamento === '1' ? "Ativa" : "Inativa"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-12 text-center">
                <Layers className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Nenhum departamento encontrado</h3>
                <p className="mb-4 text-muted-foreground">
                  Esta organização ainda não possui departamentos cadastrados.
                </p>
                {/* <Button>
                  <Layers className="w-4 h-4 mr-2" />
                  Criar Primeira Área
                </Button> */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
