import { Link } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { useCabinets } from "@/features/cabinet/hooks/cabinetHooks"
import { CabinetsTable } from "@/features/cabinet/components/cabinet-table"
import ListContent from "@/components/List-content"

export default function Cabinets() {
  const { searchTerm } = useSearch()
  const { cabinets, isLoading } = useCabinets()

  const filtered = cabinets.filter((cabinet) => {
    const numArmario = String(cabinet.num_armario || "");
    const numGavetas = String(cabinet.num_gavetas || "");

    return numArmario.includes(searchTerm) || numGavetas.includes(searchTerm)
  });


  return (
    <div className="relative space-y-4">
      <h1 className="text-2xl font-semibold">Armários</h1>

      <ListContent
        isLoading={isLoading}
        data={cabinets}
        filtered={filtered}
        resource="armário cadastrado"
      >
        <CabinetsTable cabinets={filtered} />
      </ListContent>


      <Link to="/dashboard/cabinets/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Novo armário
          </span>
        </Button>
      </Link>
    </div>
  )
}
