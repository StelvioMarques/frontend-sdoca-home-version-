import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, Layers, Boxes, Building } from "lucide-react"
import { useEditDepartamentoForm } from "../hooks/forms/useEditForm"
import { DepartamentoForm } from "../components/departamento-form"

export default function EditDepartamento() {
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
    departamento,
    organizations
  } = useEditDepartamentoForm(id)

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
        <Link to='/dashboard/departments'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-medium">Editar Departamento</h1>
        </div>
        <p className="text-muted-foreground">
          Actualize as informações do Departamento
        </p>
      </div>

      <DepartamentoForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        isEdit={true}
        errors={errors}
        isValid={isValid}
        departamento={departamento}
        organizations={organizations}
      />
    </>
  )
}
