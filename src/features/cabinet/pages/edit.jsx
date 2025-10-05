import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, Tags } from "lucide-react"
import { useEditForm } from "@/features/cabinet/hooks/forms/useEditForm"
import { CabinetForm } from "@/features/cabinet/components/cabinet-form"

export default function EditCabinet() {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isValid,
    isPending,
    isLoading,
    cabinet,
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
        <Link to='/dashboard/cabinets'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-medium">Editar Armário</h1>
        </div>
        <p className="text-muted-foreground">
          Actualize os dados abaixo para editar o armário no sistema
        </p>
      </div>

      <CabinetForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        errors={errors}
        isValid={isValid}
        isPending={isPending}
        cabinet={cabinet}
        isEdit={true}
      />
    </>
  )
}
