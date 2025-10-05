import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, Tags } from "lucide-react"
import { useCreateForm } from "@/features/process-cover/hooks/forms/useCreateForm"
import { PeocessCoverForm } from "@/features/process-cover/components/process-cover-form"

export default function NewProcessCover() {
  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isValid,
    isPending,
    isLoading,
    drawers,
    tiposDocumentos
  } = useCreateForm()

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
        <Link to='/dashboard/process-covers'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-medium">Nova Capa de Processo</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para adicionar uma capa de processo a gaveta
        </p>
      </div>

      <PeocessCoverForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        errors={errors}
        isValid={isValid}
        drawers={drawers}
        docTypes={tiposDocumentos}
      />
    </>
  )
}




