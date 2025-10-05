import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, FileType } from "lucide-react"
import { useCreateForm } from "@/features/doc-type/hooks/forms/useCreateForm"
import { DocTypeForm } from "@/features/doc-type/components/doc-type-form"

export default function NewDocType() {
  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isValid,
    isPending,
    isLoading,
    temporalidades
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
        <Link to='/dashboard/doc-types'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-medium">Criar Novo Tipo de Documento</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para registrar um novo tipo de documento no sistema
        </p>
      </div>

      <DocTypeForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        errors={errors}
        isValid={isValid}
        isPending={isPending}
        temporalidades={temporalidades}
      />
    </>
  )
}




