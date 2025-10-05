import { z } from "zod";

export const comunaSchema = z.object({
  name_org: z
    .string()
    .min(3, "Nome muito curto")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  nif_org: z
    .string()
    .max(20, "NIF deve ter no máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "NIF deve conter apenas letras e números"),

  telefone_org: z
    .string()
    .min(9, "Telefone deve ter 9 dígitos")
    .max(9, "Telefone deve ter 9 dígitos")
    .regex(/^(?:\+244|0)?(?:91|92|93|95|99)\d{7}$/, "Telefone inválido"),

  email_org: z
    .string()
    .email("E-mail inválido"),

  provincia_org: z
    .string()
    .min(1, "Nome da província muito curto")
    .max(50, "Nome da província muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s.]+$/, "Nome da província deve conter apenas letras, espaços, acentos e pontos"),

  regime_org: z
    .string()
    .nonempty("Selecione o regime"),

  descricao_org: z
    .string()
    .min(7, "Descrição muito curta"),
})
