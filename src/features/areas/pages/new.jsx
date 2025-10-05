import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, Layers } from "lucide-react"
import { useCreateAreaForm } from "@/features/areas/hooks/forms/useCreateForm"
import { AreaForm } from "@/features/areas/components/area-form"

export default function NewArea() {
  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isValid,
    isPending,
    isLoading,
    departamentos
  } = useCreateAreaForm()

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
        <Link to='/dashboard/areas'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2 ">
          <h1 className="text-3xl font-medium">Criar Nova Área</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para registrar uma nova área no sistema
        </p>
      </div>

      <AreaForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        isPending={isPending}
        departamentos={departamentos}
        errors={errors}
        isValid={isValid}
      />
    </>
  )
}




