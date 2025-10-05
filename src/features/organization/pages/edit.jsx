import { useParams, Link } from "react-router-dom"
import { ChevronLeftIcon, Building2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrganizationForm } from "@/features/organization/components/organization-form"
import { useEditOrganizationForm } from "@/features/organization/hooks/forms/useEditForm"

export default function EditOrganization() {
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
    organization
  } = useEditOrganizationForm(id)

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
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-medium">Editar Comuna</h1>
        </div>
        <p className="text-muted-foreground">
          Actualize os dados abaixo para editar a Comuna no sistema
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
        organization={organization}
        isEdit={true}
      />
    </>
  )
}
