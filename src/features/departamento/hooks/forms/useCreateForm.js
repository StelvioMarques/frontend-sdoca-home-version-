import { useForm } from "react-hook-form"
import { useOrganizations } from "@/features/organization/hooks/OrganizationsHooks"
import { useCreateDepartamento } from "../departamentoHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { departmentSchema } from "@/validations/department"

export function useCreateDepartamentoForm() {
  const { organizations, isLoading } = useOrganizations()
  const mutation = useCreateDepartamento()

  const form = useForm({
    resolver: zodResolver(departmentSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name_departamento: "",
      sigla_departamento: "",
      telefone_departamento: "",
      email_departamento: "",
      org_id: "",
      descricao_departamento: "",
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
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    ...form,
    organizations
  }
}