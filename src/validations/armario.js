import { z } from "zod";

export const armarioSchema = z.object({
  num_armario: z.coerce
    .number({
      required_error: "Preencha este campo",
      invalid_type_error: "O número do armário deve ser numérico",
    })
    .int("O número do armário deve ser inteiro")
    .min(1, "O número do armário deve ser maior que 0"),

  num_gavetas: z.coerce
    .number({
      required_error: "Preencha este campo",
      invalid_type_error: "O número de gavetas deve ser numérico",
    })
    .int("O número de gavetas deve ser inteiro")
    .min(1, "O armário deve ter pelo menos 1 gaveta"),
});
