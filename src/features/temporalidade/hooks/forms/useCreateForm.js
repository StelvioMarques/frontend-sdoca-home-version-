import { useForm } from "react-hook-form"
import { useCreateTemporalidade } from "@/features/temporalidade/hooks/temporalidadeHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { temporalidadeSchema } from "@/validations/temporalidade"

export function useCreateForm() {
  const mutation = useCreateTemporalidade()

  const form = useForm({
    resolver: zodResolver(temporalidadeSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      nome_fase: "",
      prazo_guarda: "",
      destino_final: "",
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
    isLoading: false,
    isPending: mutation.isPending,
    onSubmit,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    ...form,
  }
}
