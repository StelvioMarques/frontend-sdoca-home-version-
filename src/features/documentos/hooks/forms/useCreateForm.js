import { useForm } from "react-hook-form"
import { useAreas } from "@/features/areas/hooks/areasHooks"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { useCreateDocument, useUtenteData } from "@/features/documentos/hooks/docHooks"
import { useCabinets } from "@/features/cabinet/hooks/cabinetHooks"
import { useDrawers } from "@/features/drawer/hooks/drawerHooks"
import { useProcessCovers } from "@/features/process-cover/hooks/process-coverHooks"
import { documentSchema } from "@/validations/document"
import { zodResolver } from "@hookform/resolvers/zod"

export function useCreateForm() {
  const { utentes, isLoading } = useUtenteData()
  const { tiposDocumentos } = useTiposDocumentos()
  const { cabinets } = useCabinets()
  const { drawers } = useDrawers()
  const { processCovers } = useProcessCovers()
  const { allAreas } = useAreas()
  const mutation = useCreateDocument()

  const form = useForm({
    resolver: zodResolver(documentSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      n_bi: "",
      nome: "",
      email: "",
      telefone: "",
      titulo_doc: "",
      privacidade: "0",
      tipo_doc_id: "",
      area_origem_id: "",
      area_destinos_ids: [],
      descricao_doc: "",
      anexo_docs: [],
    },
  });

  console.log('campos com erros', form.formState.errors)


  const onSubmit = form.handleSubmit((formData) => {
    const data = new FormData()

    // Campos normais
    data.append("n_bi", formData.n_bi)
    data.append("nome", formData.nome)
    data.append("email", formData.email)
    data.append("telefone", formData.telefone)
    data.append("titulo_doc", formData.titulo_doc)
    data.append("privacidade", formData.privacidade)
    data.append("tipo_doc_id", formData.tipo_doc_id)
    data.append("area_origem_id", formData.area_origem_id)
    data.append("descricao_doc", formData.descricao_doc)
    data.append("capa_processo_id", Number(formData.capa_processo_id))

    // Array de destinos (manda um a um com [])
    formData.area_destinos_ids.forEach(id => {
      data.append("area_destinos_ids[]", id)
    })

    // ficheiros
    if (formData.anexo_docs?.length > 0) {
      formData.anexo_docs.forEach((file) => {
        data.append("anexo_docs[]", file)
      })
    }

    // 🚨 log bonito pra debug
    console.log("FORM DATA RAW:", formData)

    // ver o que foi montado no FormData
    for (const [key, value] of data.entries()) {
      console.log(key, value)
    }

    mutation.mutate(data, {
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
    ...form,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    areas: allAreas,
    tiposDocumentos,
    cabinets,
    drawers,
    processCovers,
    utentes
  }
}
