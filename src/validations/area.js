import { z } from "zod";

export const areaSchema = z.object({
  name_area: z
    .string()
    .min(3, "Nome muito curto")
    .regex(/^[a-zA-ZÀ-ÿ\s.]+$/, "Nome deve conter apenas letras e espaços"),

  slogan_area: z.string().min(1, "Mínimo 1 caractere."),

  telefone_area: z
    .string()
    .regex(/^(?:\+244|0)?(?:91|92|93|94|95|99)\d{7}$/, "Telefone inválido")
    .min(9, "Telefone deve ter 9 dígitos")
    .max(9, "Telefone deve ter 9 dígitos"),

  email_area: z
    .string()
    .email("E-mail inválido"),

  descricao_area: z.string().min(7, "Descrição muito curta"),

  depart_id: z
    .string()
    .nonempty("Selecione um departamento"),
})
