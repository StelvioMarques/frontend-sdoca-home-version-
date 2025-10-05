import { Link } from "react-router-dom"
import { ChevronLeftIcon, Building2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrganizationForm } from "@/features/organization/components/organization-form"
import { useCreateOrganizationForm } from "@/features/organization/hooks/forms/useCreateForm"

export default function NewOrganization() {
  const {
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isValid,
    isPending,
    isLoading
  } = useCreateOrganizationForm()

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
        <Link to='/dashboard/organizations'>
          <Button variant="link" className="gap-1">
            <ChevronLeftIcon className="opacity-60" size={16} />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-2 ">
          <h1 className="text-3xl font-medium">Criar nova organização</h1>
        </div>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para cadastrar uma nova organização no sistema
        </p>
      </div>

      <OrganizationForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        onSubmit={onSubmit}
        errors={errors}
        isValid={isValid}
        isPending={isPending}
      />
    </>
  )
}
