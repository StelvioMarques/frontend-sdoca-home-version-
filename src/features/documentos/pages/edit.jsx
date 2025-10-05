import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, Tags } from "lucide-react"
import { useEditForm } from "@/features/documentos/hooks/forms/useEditForm"
import { DocumentForm } from "@/features/documentos/components/document-form"

export default function EditClassification() {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    isPending,
    isLoading,
    areas,
    tiposDocumentos
  } = useEditForm(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return (
    <>
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
          <h1 className="text-3xl font-medium">Editar Documento</h1>
        </div>
        <p className="text-muted-foreground">
          Atualize os dados abaixo para editar o documento no sistema
        </p>
      </div>

      <DocumentForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        areas={areas}
        doc_types={tiposDocumentos}
        isEdit={true}
      />
    </>
  )
}
