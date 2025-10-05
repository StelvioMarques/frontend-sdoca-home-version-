// components/AreaForm.jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function DocTypeForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  /*   isValid, */
  isPending,
  setValue,
  temporalidades = [],
  doc_type = null,
  isEdit = false,
}) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
    >
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            <div className="*:not-first:mt-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                placeholder="Ex: certificado"
                {...register("nome")}
              />
              {errors?.nome && <span className="text-xs text-red-500">{errors.nome.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="nivel">Nível</Label>
              <Input
                type='number'
                id="nivel"
                placeholder="Ex: nivel 1"
                {...register("nivel")}
              />
              {errors?.nivel && <span className="text-xs text-red-500">{errors.nivel.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="temporalidade_id">Temporalidade</Label>
              <Select
                defaultValue={doc_type?.temporalidade_id ? String(doc_type?.temporalidade_id) : ""}
                onValueChange={(value) => setValue("temporalidade_id", value)}>
                <SelectTrigger id="temporalidade_id" className="w-full">
                  <SelectValue
                    placeholder="Selecione a temporalidade deste tipo"
                  />
                </SelectTrigger>
                <SelectContent>
                  {temporalidades.map((temporalidade) => (
                    <SelectItem key={temporalidade.id} value={String(temporalidade.id)}>
                      {temporalidade.nome_fase} - {temporalidade.prazo_guarda}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.temporalidade_id && <span className="text-xs text-red-500">{errors.temporalidade_id.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Ex: xxxx..."
                {...register("descricao")}
              />
              {errors?.descricao && <span className="text-xs text-red-500">{errors.descricao.message}</span>}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Actualizar tipo de documento"
              ) : (
                "Criar tipo de documento"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
