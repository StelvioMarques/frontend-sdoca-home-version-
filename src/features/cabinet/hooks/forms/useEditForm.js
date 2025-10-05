import { useForm } from "react-hook-form"
import { useCabinet, useUpdateCabinet } from "@/features/cabinet/hooks/cabinetHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { armarioSchema } from "@/validations/armario"

export function useEditForm(id) {
  const { cabinet, isLoading } = useCabinet(id)
  const { mutate, isPending } = useUpdateCabinet(id)

  const form = useForm({
    resolver: zodResolver(armarioSchema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    values: cabinet?.num_armario ? {
      num_armario: cabinet.num_armario,
      num_gavetas: cabinet.num_gavetas,
    } : undefined
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutate({ id, formData }, {
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
    isPending,
    onSubmit,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    ...form,
    cabinet,
  }
}
