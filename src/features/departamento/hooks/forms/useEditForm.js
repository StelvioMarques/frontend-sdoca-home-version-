import { useForm } from "react-hook-form"
import { useDepartamento, useUpdateDepartamento } from "../departamentoHooks"
import { useOrganizations } from "@/features/organization/hooks/OrganizationsHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { departmentSchema } from "@/validations/department"

export function useEditDepartamentoForm(id) {
  const { departamento, isLoading } = useDepartamento(id)
  const { organizations } = useOrganizations()
  const mutation = useUpdateDepartamento()

  const form = useForm({
    resolver: zodResolver(departmentSchema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    values: departamento?.name_departamento ? {
      name_departamento: departamento.name_departamento,
      sigla_departamento: departamento.sigla_departamento,
      telefone_departamento: departamento.telefone_departamento,
      email_departamento: departamento.email_departamento,
      org_id: String(departamento.org_id),
      descricao_departamento: departamento.descricao_departamento,
    } : undefined,
  })

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
    departamento,
    organizations
  }
}