import { z } from "zod"

export const archiveSchema = z.object({


  titulo_doc: z.string().min(3, "Título obrigatório"),

  descricao_doc: z.string().min(10, "Descrição muito curta"),

  tipo_doc_id: z.string().nonempty("Selecione um tipo de documento"),

  armario_id: z.string().nonempty("Selecione o armário"),

  gaveta_id: z.string().nonempty("Selecione a gaveta"),

  capa_processo_id: z.string().nonempty("Selecione a capa"),

  anexo_docs: z
    .array(z.any())
    .min(1, "Adicione pelo menos um documento")
    .max(6, "Você pode anexar no máximo 6 arquivos"),
})
