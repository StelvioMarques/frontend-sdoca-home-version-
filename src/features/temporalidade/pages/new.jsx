import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, Loader2, FileClock } from "lucide-react"
import { useCreateForm } from "@/features/temporalidade/hooks/forms/useCreateForm"
import { TemporalidadeForm } from "@/features/temporalidade/components/temporalidade-form"

export default function NewTemporalidade() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    onSubmit,
    errors,
    isValid,
    isPending,
    isLoading,
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
        <Link to='/dashboard/temps'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-medium">Criar Nova Temporalidade</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para registrar uma nova temporalidade no sistema
        </p>
      </div>

      <TemporalidadeForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        control={control}
        errors={errors}
        isValid={isValid}
        isPending={isPending}
      />
    </>
  )
}




