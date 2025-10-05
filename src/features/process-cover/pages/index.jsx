import { Link } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { ProcessCoversTable } from "@/features/process-cover/components/process-cover-table"
import ListContent from "@/components/List-content"
import { useProcessCovers } from "../hooks/process-coverHooks"

export default function ProcessCovers() {
  const { searchTerm } = useSearch()
  const { processCovers, isLoading } = useProcessCovers()

  const filtered = processCovers.filter((processCover) => {
    const num_capa_processo = String(processCover.num_capa_processo)
    const gaveta_id = String(processCover.gaveta_id)

    return num_capa_processo.includes(searchTerm) || gaveta_id.includes(searchTerm)
  })

  return (
    <div className="relative space-y-4">
      <h1 className="text-2xl font-semibold">Capas de processo</h1>

      <ListContent
        isLoading={isLoading}
        data={processCovers}
        filtered={filtered}
        resource="capa de processo cadastrada"
      >
        <ProcessCoversTable processCovers={filtered} />
      </ListContent>

      <Link to="/dashboard/process-covers/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Adicionar Capa
          </span>
        </Button>
      </Link>
    </div>
  )
}
