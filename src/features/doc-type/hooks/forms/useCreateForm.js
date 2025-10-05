import { useForm } from "react-hook-form"
import { useCreateTipoDocumento } from "@/features/doc-type/hooks/doc-typeHooks"
import { useTemporalidades } from "@/features/temporalidade/hooks/temporalidadeHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { docTypeSchema } from "@/validations/doc-type"

export function useCreateForm() {
  const { temporalidades, isLoading } = useTemporalidades()
  const mutation = useCreateTipoDocumento()

  const form = useForm({
    resolver: zodResolver(docTypeSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      nome: "",
      nivel: "",
      temporalidade_id: "",
      descricao: "",
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutation.mutate(formData), {
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
    }
  })

  return {
    isLoading,
    isPending: mutation.isPending,
    onSubmit,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    ...form,
    temporalidades
  }
}
