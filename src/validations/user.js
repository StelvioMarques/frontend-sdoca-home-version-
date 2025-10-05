import { z } from "zod";

// Validação de telefone já existente se precisar:
// const telefoneRegex = /^(?:\+244|0)?(?:91|92|93|95|99)\d{7}$/;

// Schema para criação de usuário (foto opcional, assinatura obrigatória)
export const userSchema = z.object({
  name_user: z
    .string()
    .min(3, "Nome muito curto")
    .regex(/^[a-zA-ZÀ-ÿ\s.]+$/, "O nome deve conter apenas letras e espaços"),

  email_user: z
    .string()
    .email("E-mail inválido"),

  password_user: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres"),

  password_user_confirmation: z
    .string(),

  area_user: z
    .string()
    .nonempty("Selecione uma área"),

  tipo_user: z
    .string()
    .nonempty("Selecione um tipo de usuário"),

  profile_photo_path: z
    .any()
    .optional()
    .refine(file => !file || ["image/jpeg", "image/png"].includes(file.type), "A foto de perfil deve ser PNG ou JPEG"),

  assinatura_path: z
    .any()
    .optional()
    .refine(file => !file || ["image/jpeg", "image/png"].includes(file.type), "A imagem da assinatura deve ser PNG ou JPEG"),
})
  .superRefine(({ password_user, password_user_confirmation }, ctx) => {
    if (password_user !== password_user_confirmation) {
      ctx.addIssue({
        path: ["password_user_confirmation"],
        code: z.ZodIssueCode.custom,
        message: "As senhas não coincidem",
      });
    }
  });

// Schema para edição de usuário (foto e assinatura opcionais)
export const userEditSchema = z.object({
  name_user: z
    .string()
    .min(3, "Nome muito curto")
    .regex(/^[a-zA-ZÀ-ÿ\s.]+$/, "O nome deve conter apenas letras e espaços"),

  email_user: z
    .string()
    .email("E-mail inválido"),

  password_user: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .optional()
    .or(z.literal("")), // permite string vazia

  password_user_confirmation: z
    .string()
    .optional()
    .or(z.literal("")), // permite string vazia

  area_user: z
    .string()
    .nonempty("Selecione uma área"),

  tipo_user: z
    .string()
    .nonempty("Selecione um tipo de usuário"),

  profile_photo_path: z
    .any()
    .optional(),


  assinatura_path: z
    .any()
})
  .superRefine(({ password_user, password_user_confirmation }, ctx) => {
    if (password_user && password_user !== password_user_confirmation) {
      ctx.addIssue({
        path: ["password_user_confirmation"],
        code: z.ZodIssueCode.custom,
        message: "As senhas não coincidem",
      });
    }
  });
