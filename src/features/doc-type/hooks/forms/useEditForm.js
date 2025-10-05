import { useForm } from "react-hook-form"
import { useTipoDocumento, useUpdateTipoDocumento } from "@/features/doc-type/hooks/doc-typeHooks"
import { useTemporalidades } from "@/features/temporalidade/hooks/temporalidadeHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { docTypeSchema } from "@/validations/doc-type"

export function useEditForm(id) {
  const { temporalidades } = useTemporalidades()
  const { tipoDocumento, isLoading } = useTipoDocumento(id)
  const mutation = useUpdateTipoDocumento(id)

  const form = useForm({
    resolver: zodResolver(docTypeSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    values: tipoDocumento?.nome ? {
      nome: tipoDocumento.nome,
      nivel: tipoDocumento.nivel,
      temporalidade_id: String(tipoDocumento.temporalidade_id),
      descricao: tipoDocumento.descricao,
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
    tipoDocumento,
    temporalidades
  }
}
