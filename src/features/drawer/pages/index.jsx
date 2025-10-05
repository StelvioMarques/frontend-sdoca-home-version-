import { Link } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { useDrawers } from "@/features/drawer/hooks/drawerHooks"
import { DrawersTable } from "@/features/drawer/components/drawer-table"
import ListContent from "@/components/List-content"

export default function Drawers() {
  const { searchTerm } = useSearch()
  const { drawers, isLoading } = useDrawers()

  const filtered = drawers.filter((drawer) => {
    const num_gaveta = String(drawer.num_gaveta)
    const num_processos = String(drawer.num_processos)

    return num_gaveta.includes(searchTerm) || num_processos.includes(searchTerm)
  })

  return (
    <div className="relative space-y-4">
      <h1 className="text-2xl font-semibold">Gavetas</h1>

      <ListContent
        isLoading={isLoading}
        data={drawers}
        filtered={filtered}
        resource="gaveta cadastrada"
      >
        <DrawersTable drawers={filtered} />
      </ListContent>

      <Link to="/dashboard/drawers/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Adicionar gaveta
          </span>
        </Button>
      </Link>
    </div>
  )
}
