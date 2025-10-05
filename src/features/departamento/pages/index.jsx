import { Link } from "react-router-dom"
import { Building, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import ListContent from "@/components/List-content"
import { useDepartamentos } from "../hooks/departamentoHooks"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DepartmentsTable } from "../components/departamentos-table"
import { useState } from "react"

export default function Departamentos() {
  const { searchTerm } = useSearch()
  const [filter, setFilter] = useState("ativos")
  const { departamentos, isLoading } = useDepartamentos(filter)

  const filtered = departamentos.filter((departamento) =>
    departamento.name_departamento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    departamento.descricao_departamento?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative space-y-4">
      {/* Cabeçalho e filtro */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Departamentos</h1>

        <Select onValueChange={setFilter} defaultValue={filter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ativos">Activos</SelectItem>
            <SelectItem value="removidos">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ListContent
        isLoading={isLoading}
        data={departamentos}
        filtered={filtered}
        resource="departamento inactivo"
        icon={Building}
      >
        <DepartmentsTable departments={filtered} />
      </ListContent>

      <Link to="/dashboard/departments/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Criar departamento
          </span>
        </Button>
      </Link>
    </div>
  )
}
