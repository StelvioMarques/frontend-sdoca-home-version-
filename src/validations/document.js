import { z } from "zod"

const provincias = [
  "LU", "BI", "HU", "ZA", "MO", "CA", "CU", "CO", "ZA", "KU","KN", "LS", "LM", "LA"
] // coloca todas as siglas válidas

const biRegex = new RegExp(`^\\d{9}(${provincias.join("|")})\\d{3}$`)

export const documentSchema = z.object({
  n_bi: z.string().regex(biRegex, "BI inválido! O número deve seguir o padrão correto (ex: 02196735LA058)"),

  nome: z
    .string()
    .min(3, "Nome muito curto")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),

  email: z.string().email("E-mail inválido"),

  telefone: z
    .string()
    .regex(/^(?:\+244|0)?(?:91|92|93|94|95|97|99)\d{7}$/, "Telefone inválido")
    .min(9, "Telefone deve ter 9 dígitos")
    .max(9, "Telefone deve ter 9 dígitos"),

  titulo_doc: z.string().min(3, "Título obrigatório"),

  descricao_doc: z.string().min(10, "Descrição muito curta"),

  tipo_doc_id: z.string().nonempty("Selecione um tipo de documento"),

  privacidade: z.enum(["0", "1", "2"], { required_error: "Selecione o nível" }),

  area_origem_id: z.string(),

  area_destinos_ids: z
    .array(z.union([z.string(), z.number()])),

  armario_id: z.string().nonempty("Selecione o armário"),

  gaveta_id: z.string().nonempty("Selecione a gaveta"),

  capa_processo_id: z.string().nonempty("Selecione a capa"),

  anexo_docs: z
    .array(z.any())
    .min(1, "Adicione pelo menos um documento")
    .max(6, "Você pode anexar no máximo 6 arquivos"),
})
