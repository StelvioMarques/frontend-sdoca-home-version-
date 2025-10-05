import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useOrganization, useUpdateOrganization } from "@/features/organization/hooks/OrganizationsHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { comunaSchema } from "@/validations/comuna"

export function useEditOrganizationForm(id) {
  const { organization, isLoading } = useOrganization(id)
  const mutation = useUpdateOrganization()

  const form = useForm({
    resolver: zodResolver(comunaSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name_org: "",
      nif_org: "",
      telefone_org: "",
      email_org: "",
      provincia_org: "",
      regime_org: "",
      descricao_org: "",
    }
  })

  const { reset } = form

  // ✅ Quando os dados da org carregarem, reseta o form com eles
  useEffect(() => {
    if (organization?.name_org) {
      reset({
        name_org: organization.name_org,
        nif_org: organization.nif_org,
        telefone_org: organization.telefone_org,
        email_org: organization.email_org,
        provincia_org: organization.provincia_org,
        regime_org: organization.regime_org,
        descricao_org: organization.descricao_org,
      })
    }
  }, [organization, reset])

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate({ id, formData }, {
      onError: (error) => {
        // supondo que o back devolva algo tipo:
        // { errors: { email_user: ["Email já existe"], area_user: ["Área inválida"] } }
        if (error?.response?.data?.errors) {
          const serverErrors = error.response.data.errors
          Object.entries(serverErrors).forEach(([field, messages]) => {
            form.setError(field, {
              type: "server",
              message: messages[0], // pega só a primeira msg
            })
          })
        }
      },
    })
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    ...form,
    organization
  }
}
