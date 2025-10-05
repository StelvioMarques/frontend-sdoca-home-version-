import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function CabinetForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  /*   isValid, */
  isPending,
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
              <Label htmlFor="num_armario">Número do armário</Label>
              <Input
                min='1'
                type='number'
                id="num_armario"
                placeholder="Ex: 5"
                {...register("num_armario")}
              />
              {errors?.num_armario && <span className="text-xs text-red-500">{errors.num_armario.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="num_gavetas">Número de gavetas</Label>
              <Input
                min='1'
                type='number'
                id="num_gavetas"
                placeholder="Ex: 5"
                {...register("num_gavetas")}
              />
              {errors?.num_gavetas && <span className="text-xs text-red-500">{errors.num_gavetas.message}</span>}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Actualizar armário"
              ) : (
                "Criar armário"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
