import { useForm } from "react-hook-form"
import { useAreas } from "@/features/areas/hooks/areasHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { useDocument, useUpdateDocument } from "@/features/documentos/hooks/docHooks"
import { useCabinets } from "@/features/cabinet/hooks/cabinetHooks"
import { useDrawers } from "@/features/drawer/hooks/drawerHooks"
import { useProcessCovers } from "@/features/process-cover/hooks/process-coverHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { documentSchema } from "@/validations/document"

export function useEditForm(id) {
  const { areas } = useAreas()
  const { tiposDocumentos } = useTiposDocumentos()
  const { cabinets } = useCabinets()
  const { drawers } = useDrawers()
  const { processCovers } = useProcessCovers()
  const { document, isLoading } = useDocument(id)
  const mutation = useUpdateDocument(id)

  const form = useForm({
    resolver: zodResolver(documentSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    values: document?.id ? {
      titulo_doc: document.titulo_doc,
      tipo_doc_id: document.tipo_doc_id,
      area_origem_id: document.area_origem_id,
      area_destinos_ids: document.area_destinos_ids || [],
      descricao_doc: document.descricao_doc,
      n_bi: document.n_bi,
      nome: document.nome,
      email: document.email,
      telefone: document.telefone,
      privacidade: document.privacidade,
      armario_id: document.armario_id,
      gaveta_id: document.gaveta_id,
      capa_processo_id: document.capa_processo_id,
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
    document,
    areas,
    tiposDocumentos,
    cabinets,
    drawers,
    processCovers
  }
}
