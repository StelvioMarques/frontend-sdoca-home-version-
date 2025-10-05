import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, FileText, Loader2 } from "lucide-react"
import { useCreateArchiveForm } from "@/features/archives/hooks/forms/useCreateForm"
import { DocumentForm } from "@/features/archives/components/archive-form"
import PdfViewer from "@/components/pdf-viewer"

export default function NewArchive() {
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    isPending,
    isLoading,
    tiposDocumentos,
    cabinets,
    drawers,
    processCovers,
    errors,
    isValid,
    watch
  } = useCreateArchiveForm()

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
        <Link to='/dashboard/archives'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-medium">Cadastrar novo arquivo</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para cadastrar um novo arquivo ao sistema
        </p>
      </div>

      <DocumentForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        doc_types={tiposDocumentos}
        cabinets={cabinets}
        drawers={drawers}
        processCovers={processCovers}
        onPreviewPdf={setSelectedPdfUrl}
        watch={watch}
        errors={errors}
        isValid={isValid}
      />
    </>
  )
}
