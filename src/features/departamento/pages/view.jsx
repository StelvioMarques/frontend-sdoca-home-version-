import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeftIcon, Loader2, Pencil, Layers } from "lucide-react"
import { useDepartamento } from "../hooks/departamentoHooks"

export default function ViewDepartamento() {
  const { id } = useParams()
  const { departamento, isLoading } = useDepartamento(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to='/dashboard/departments'>
            <Button variant="link" className="gap-1">
              <ChevronLeftIcon className="opacity-60" size={16} />
              Voltar
            </Button>
          </Link>
        </div>
        <Link to={`/dashboard/departments/${id}/edit`}>
          <Button>
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-md">
                  <span className="text-lg font-medium">{departamento?.slogan_departamento}</span>
                </div>
                <h2 className="text-xl font-semibold">{departamento?.name_departamento}</h2>
              </div>

              <div className="grid gap-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{departamento?.email_departamento}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Telefone</h3>
                  <p>{departamento?.telefone_departamento}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Descrição</h3>
                  <p>{departamento?.descricao_departamento}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Criado em</h3>
                  <p>{departamento?.created_at}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Áreas do Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            {departamento?.areas?.length > 0 ? (
              <div className="space-y-4">
                {departamento.areas.map((area) => (
                  <div key={area.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-md">
                        <span>{area.slogan_area}</span>
                      </div>
                      <span className="font-medium">{area.name_area}</span>
                    </div>
                    <Link to={`/dashboard/areas/${area.id}`}>
                      <Button variant="ghost" size="sm">
                        Ver detalhes
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Layers className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Nenhuma área encontrada</h3>
                <p className="mb-4 text-muted-foreground">
                  Este departamento ainda não possui áreas cadastradas.
                </p>
                <Button>
                  <Layers className="w-4 h-4 mr-2" />
                  Criar Primeira Área
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}