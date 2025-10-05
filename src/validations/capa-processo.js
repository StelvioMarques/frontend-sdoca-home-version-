import { z } from "zod";

export const capaProcessoSchema = z.object({
  num_capa_processo: z.coerce
    .number({
      required_error: "Preencha este campo",
      invalid_type_error: "O número da capa de processo deve ser numérico",
    })
    .int("O número da capa de processo deve ser inteiro")
    .min(1, "O número da capa de processo deve ser maior que 0"),

  num_documentos: z.coerce
    .number({
      required_error: "Preencha este campo",
      invalid_type_error: "O número de documentos deve ser numérico",
    })
    .int("O número de documentos deve ser inteiro")
    .min(1, "A capa de processo deve armazenar no mínimo 1 documento"),

  gaveta_id: z.coerce
    .number({
      required_error: "Selecione uma gaveta",
      invalid_type_error: "Selecione uma gaveta válida",
    })
    .int()
    .min(1, "Selecione uma gaveta"),

  tipo_doc_id: z.coerce
    .number({
      required_error: "Selecione o tipo de documento",
      invalid_type_error: "Selecione um tipo de documento válido",
    })
    .int()
    .min(1, "Selecione o tipo de documento"),
});
