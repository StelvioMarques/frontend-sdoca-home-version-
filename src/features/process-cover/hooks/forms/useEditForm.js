import { useForm } from "react-hook-form"
import { useDrawers } from "@/features/drawer/hooks/drawerHooks"
import { useProcessCover, useUpdateProcessCover } from "../process-coverHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { capaProcessoSchema } from "@/validations/capa-processo"

export function useEditForm(id) {
  const { drawers } = useDrawers()
  const { tiposDocumentos } = useTiposDocumentos()
  const { processCover, isLoading } = useProcessCover(id)
  const { mutate, isPending } = useUpdateProcessCover(id)

  const form = useForm({
    resolver: zodResolver(capaProcessoSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    values: processCover?.id ? {
      num_capa_processo: processCover.num_capa_processo,
      num_documentos: processCover.num_documentos,
      gaveta_id: processCover.gaveta_id,
      tipo_doc_id: processCover.tipo_doc_id,
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
    drawers,
    tiposDocumentos,
    processCover,
  }
}
