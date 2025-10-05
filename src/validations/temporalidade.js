import { z } from "zod";

export const temporalidadeSchema = z.object({
  nome_fase: z
    .string()
    .min(3, "Nome da fase muito curto")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome da fase deve conter apenas letras e espaços"),

  prazo_guarda: z
    .string()
    .regex(
      /^\d+\s*(semana|semanas|mês|meses|ano|anos)$/i,
      "Prazo deve estar no formato correto (ex: '1 mês', '6 meses', '4 anos')"
    ),

  destino_final: z
    .string()
    .nonempty("Insira o destino final"),
});
