import { z } from "zod"

// ───────────────── ORG SCHEMA ─────────────────
export const orgSchema = z.object({
  name_org: z.string().min(1, "Nome é obrigatório"),
  nif_org: z.string().min(1, "NIF é obrigatório"),
  telefone_org: z.string().min(1, "Telefone é obrigatório"),
  email_org: z.string().email("Email inválido"),
  provincia_org: z.string().min(1, "Província é obrigatória"),
  regime_org: z.string().min(1, "Regime é obrigatório"),
  descricao_org: z.string().min(1, "Descrição é obrigatória"),
})


// ───────────────── LOGIN SCHEMA ───────────────
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})


// ───────────────── REGISTER SCHEMA ────────────
export const registerSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha fraca"),
  confirmPassword: z.string().min(6, "Confirmação inválida")
})
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})
