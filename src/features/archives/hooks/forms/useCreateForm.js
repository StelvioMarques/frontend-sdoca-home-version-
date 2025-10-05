import { useForm } from "react-hook-form"
import { useTiposDocumentos } from "@/features/doc-type/hooks/doc-typeHooks"
import { useCabinets } from "@/features/cabinet/hooks/cabinetHooks"
import { useDrawers } from "@/features/drawer/hooks/drawerHooks"
import { useProcessCovers } from "@/features/process-cover/hooks/process-coverHooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { archiveSchema } from "@/validations/archive"
import { useCreateArchive } from "../archiveHooks"

export function useCreateArchiveForm() {
  const { tiposDocumentos } = useTiposDocumentos()
  const { cabinets } = useCabinets()
  const { drawers } = useDrawers()
  const { processCovers } = useProcessCovers()
  const mutation = useCreateArchive()

  const form = useForm({
    resolver: zodResolver(archiveSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      titulo_doc: "",
      tipo_doc_id: "",
      descricao_doc: "",
      anexo_docs: [],
    },
  });

  console.log('campos com erros', form.formState.errors)


  const onSubmit = form.handleSubmit((formData) => {
    const data = new FormData()

    // Campos normais
    data.append("titulo_doc", formData.titulo_doc)
    data.append("tipo_doc_id", formData.tipo_doc_id)
    data.append("descricao_doc", formData.descricao_doc)
    data.append("capa_processo_id", Number(formData.capa_processo_id))

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
    isPending: mutation.isPending,
    onSubmit,
    ...form,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    tiposDocumentos,
    cabinets,
    drawers,
    processCovers,
  }
}
