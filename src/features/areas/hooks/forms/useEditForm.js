import { useForm } from "react-hook-form"
import { useArea, useUpdateArea } from "@/features/areas/hooks/areasHooks"
import { useDepartamentos } from "./useDepartamentos"
import { zodResolver } from "@hookform/resolvers/zod"
import { areaSchema } from "@/validations/area"

export function useEditAreaForm(id) {
  const { area, isLoading } = useArea(id)
  const { departamentos } = useDepartamentos()
  const mutation = useUpdateArea(id)

  const form = useForm({
    resolver: zodResolver(areaSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    values: area?.name_area ? {
      name_area: area.name_area,
      slogan_area: area.slogan_area,
      telefone_area: area.telefone_area,
      email_area: area.email_area,
      descricao_area: area.descricao_area,
      depart_id: String(area.depart_id),
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
    area,
    departamentos
  }
}
