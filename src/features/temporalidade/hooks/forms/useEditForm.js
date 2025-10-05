import { useForm } from "react-hook-form"
import { useTemporalidade, useUpdateTemporalidade } from "@/features/temporalidade/hooks/temporalidadeHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { temporalidadeSchema } from "@/validations/temporalidade"

export function useEditForm(id) {
  const { temporalidade, isLoading } = useTemporalidade(id)
  const mutation = useUpdateTemporalidade(id)

  const form = useForm({
    resolver: zodResolver(temporalidadeSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    values: temporalidade?.nome_fase ? {
      nome_fase: temporalidade.nome_fase,
      prazo_guarda: temporalidade.prazo_guarda,
      destino_final: temporalidade.destino_final,
    } : undefined
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
    temporalidade
  }
}
