import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, FileText, Loader2 } from "lucide-react"
import { useFinalizarForm } from "@/features/documentos/hooks/forms/useFinalizarForm"
import { FinalizarForm } from "@/features/documentos/components/document-finalizar-form"
import PdfViewer from "@/components/pdf-viewer"

export default function FinalizarDocument() {
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null)
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    isPending,
    isLoading,
    watch,
    areas,
  } = useFinalizarForm(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* PDF Viewer em tela cheia */}
      <PdfViewer selectedPdfUrl={selectedPdfUrl} setSelectedPdfUrl={setSelectedPdfUrl} />

      <div className="pt-2 pl-4">
        <Link to='/dashboard/documents'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <FileText className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-medium">Finalizar Documento</h1>
        </div>
        <p className="text-muted-foreground">
          Revise os dados abaixo para finalizar este documento no sistema
        </p>
      </div>

      <FinalizarForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        areas={areas}
        watch={watch}
        onPreviewPdf={setSelectedPdfUrl}
      />
    </>
  )
}
