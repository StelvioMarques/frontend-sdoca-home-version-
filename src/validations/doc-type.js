import { z } from "zod";

export const docTypeSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome muito curto")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome da fase deve conter apenas letras e espaços"),

  nivel: z
    .string()
    .regex(/^\d+$/, "Nível deve ser um número")
    .transform((val) => parseInt(val, 10))
    .refine((num) => num > 0 && num <= 10, {
      message: "Nível deve ser entre 1 e 10",
    }),

  temporalidade_id: z
    .string()
    .nonempty("Selecione uma temporalidade"),

  descricao: z.string().min(7, "Descrição muito curta"),
});
