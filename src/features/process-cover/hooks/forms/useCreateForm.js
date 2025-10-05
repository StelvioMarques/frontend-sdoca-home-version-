import { useForm } from "react-hook-form"
import { useCreateProcessCover } from "@/features/process-cover/hooks/process-coverHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { useDrawers } from "@/features/drawer/hooks/drawerHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { capaProcessoSchema } from "@/validations/capa-processo"

export function useCreateForm() {
  const { drawers, isLoading } = useDrawers()
  const { tiposDocumentos } = useTiposDocumentos()
  const { mutate, isPending } = useCreateProcessCover()

  const form = useForm({
    resolver: zodResolver(capaProcessoSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      num_capa_processo: "",
      num_documentos: "",
      gaveta_id: "",
      tipo_doc_id: "",
    }
  })

  const onSubmit = form.handleSubmit((formData) => {
    mutate(formData, {
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
    drawers,
    tiposDocumentos,
  }
}
