import { Link } from "react-router-dom"
import { Archive, FileType, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/context/SearchContext"
import { ArchivesTable } from "@/features/archives/components/archive-table"
import ListContent from "@/components/List-content"
import { useArchives } from "../hooks/archiveHooks"

export default function Archives() {
  const { searchTerm } = useSearch()
  const { archives, isLoading } = useArchives()

  const filtered = archives?.filter((archive) =>
    archive.titulo_doc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    archive.codigo_arquivo?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative space-y-4">
      <h1 className="text-2xl font-semibold">Arquivos</h1>

      <ListContent
        isLoading={isLoading}
        data={archives}
        filtered={filtered}
        resource="arquivo cadastrado"
        icon={Archive}
      >
        <ArchivesTable archives={filtered} />
      </ListContent>

      <Link to="/dashboard/archives/new" className="fixed z-50 bottom-6 right-6 group">
        <Button
          className="flex items-center h-12 gap-2 px-4 text-white transition-all duration-200 rounded-lg shadow-xl bg-primary group-hover:pr-6"
        >
          <Plus className="w-5 h-5 font" />
          <span className="text-sm font-medium transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Novo arquivo
          </span>
        </Button>
      </Link>
    </div>
  )
}
