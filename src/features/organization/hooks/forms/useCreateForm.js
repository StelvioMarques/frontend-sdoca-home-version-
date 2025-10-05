import { useForm } from "react-hook-form"
import { useCreateOrganization } from "@/features/organization/hooks/OrganizationsHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { comunaSchema } from "@/validations/comuna"

export function useCreateOrganizationForm() {
  const mutation = useCreateOrganization()

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

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate(formData, {
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
    isPending: mutation.isPending,
    onSubmit,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    ...form,
  }
}
