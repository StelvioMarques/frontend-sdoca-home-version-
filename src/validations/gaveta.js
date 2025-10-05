import { z } from "zod";

export const gavetaSchema = z.object({
  titulo: z
    .string()
    .min(3, "Título muito curto")
    .regex(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, "O título deve conter letras, números, espaços, hífens ou sublinhados"),

  armario_id: z.coerce
    .number({
      required_error: "Selecione um armário",
      invalid_type_error: "Selecione um armário válido",
    })
    .int("O ID do armário deve ser inteiro")
    .min(1, "Selecione um armário"),

  num_gaveta: z.coerce
    .number({
      required_error: "Preencha este campo",
      invalid_type_error: "O número da gaveta deve ser numérico",
    })
    .int("O número da gaveta deve ser inteiro")
    .min(1, "O número da gaveta deve ser maior que 0"),

  num_processos: z.coerce
    .number({
      required_error: "Preencha este campo",
      invalid_type_error: "O número de capas deve ser numérico",
    })
    .int("O número de capas deve ser inteiro")
    .min(1, "A gaveta deve ter pelo menos 1 capa"),
});
