import { useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { AnexosTable } from "@/features/archives/components/anexos-table"
import { Separator } from "@/components/ui/separator"
import { Tabs } from "@/components/ui/vercel-tabs"
import DetailsContent from "../components/details-content"
import { useState } from "react"
import { useArchive } from "../hooks/archiveHooks"

export default function ViewAnexos() {
  const { id } = useParams()
  const { data, isLoading } = useArchive(id)
  const [activeTab, setActiveTab] = useState("attachments")


  // Tabs base (sempre na ordem correta)
  const tabs = [
    { id: "attachments", label: "Ficheiros anexados", show: true },
    { id: "details", label: "Detalhes", show: true },
  ]


  return (
    <div className="relative space-y-6">
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col items-center w-full md:px-3 md:justify-between md:flex-row">
            <div className="order-2 text-center lfex md:order-1 md:text-start">
              <h1 className="text-2xl font-medium text-secondary-foreground">
                {data.arquivo.titulo_doc}
              </h1>

              <p className="mt-2 text-sm md:max-w-3xl text-muted-foreground ">
                {data.arquivo.descricao_doc}
              </p>
            </div>
          </div>

          <Separator />

          {/* Tabs customizadas */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
            className="mb-6"
          />

          {/* Conteúdo baseado na aba ativa */}
          <div className="space-y-6">
            {activeTab === "attachments" && (
              <AnexosTable Anexos={data.anexo_docs} />
            )}

            {activeTab === "details" && <DetailsContent data={data.arquivo} />}
          </div>
        </>
      )}
    </div>
  )
}
