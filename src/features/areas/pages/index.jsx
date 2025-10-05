import { Link } from "react-router-dom"
import { Layers, Loader2, Plus } from "lucide-react"
import { useAreas } from "@/features/areas/hooks/areasHooks"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreasTable } from "@/features/areas/components/areas-table"
import ListContent from "@/components/List-content"
import { useState } from "react"
import { Pagination } from "@/components/ui/pagination"
import PaginationContentt from "@/components/Pagination"

export default function Areas() {
  const { searchTerm } = useSearch()
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("ativas")
  const { areas, pagination, isLoading } = useAreas(filter, page, searchTerm)

  const filtered = areas.filter((area) =>
    area.name_area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.email_area?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative space-y-4">
      {/* Cabeçalho e filtro */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Áreas</h1>

        <Select
          onValueChange={(val) => {
            setFilter(val)
            setPage(1) // sempre volta pra primeira página
          }}
          defaultValue={filter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ativas">Activas</SelectItem>
            <SelectItem value="removidas">Inactivas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ListContent
        isLoading={isLoading}
        data={areas}
        filtered={filtered}
        resource="área"
        icon={Layers}
        filter={filter} // 🔥 passa o filtro atual
      >
        <AreasTable areas={filtered} currentFilter={filter} />
        <PaginationContentt
          currentPage={pagination?.current_page}
          totalPages={pagination?.last_page}
          onPageChange={setPage}
        />
      </ListContent>

      <Link to="/dashboard/areas/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Criar área
          </span>
        </Button>
      </Link>
    </div>
  )
}
