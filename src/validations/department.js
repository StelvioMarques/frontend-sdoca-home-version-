import { z } from "zod";

export const departmentSchema = z.object({
  name_departamento: z
    .string()
    .min(3, "Nome muito curto")
    .regex(/^[a-zA-ZÀ-ÿ\s.]+$/, "Nome deve conter apenas letras, espaços e pontos"),

  sigla_departamento: z.string().min(2, "Mínimo 2 caracteres. Ex.: SG"),

  telefone_departamento: z
    .string()
    .min(9, "Telefone deve ter 9 dígitos")
    .max(9, "Telefone deve ter 9 dígitos")
    .regex(/^(?:\+244|0)?(?:91|92|93|94|95|99)\d{7}$/, "Telefone inválido"),

  email_departamento: z
    .string()
    .email("E-mail inválido"),

  descricao_departamento: z.string().min(7, "Descrição muito curta"),

  org_id: z
    .string()
    .nonempty("Selecione um departamento"),
})
