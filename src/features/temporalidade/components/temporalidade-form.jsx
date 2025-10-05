// components/AreaForm.jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { normalizePrazoGuarda } from "@/utils/formatar-prazo-guarda"
import { Controller } from "react-hook-form"

export function TemporalidadeForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  /*   isValid, */
  isPending,
  setValue,
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
              <Label htmlFor="nome_fase">Nome da Fase</Label>
              <Input
                id="nome_fase"
                placeholder="Ex: Corrente"
                {...register("nome_fase")}
              />
              {errors?.nome_fase && <span className="text-xs text-red-500">{errors.nome_fase.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="prazo_guarda">Prazo de Guarda</Label>
              <Input
                id="prazo_guarda"
                placeholder="Ex: 5 anos"
                {...register("prazo_guarda")}
                onBlur={(e) => {
                  const normalized = normalizePrazoGuarda(e.target.value);
                  setValue("prazo_guarda", normalized, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />
              {errors?.prazo_guarda && <span className="text-xs text-red-500">{errors.prazo_guarda.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="destino_final">Destino Final</Label>
              <Input
                id="destino_final"
                placeholder="Ex: arquivo"
                {...register("destino_final")}
              />
              {errors?.destino_final && <span className="text-xs text-red-500">{errors.destino_final.message}</span>}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Actualizar temporalidade"
              ) : (
                "Criar temporalidade"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
