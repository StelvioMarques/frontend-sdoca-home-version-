import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DrawerForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
/*   isValid, */
  isPending,
  setValue,
  drawer = null,
  cabinets = [],
  isEdit = false,
}) {

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
    >
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            <div className="*:not-first:mt-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                type='text'
                id="titulo"
                placeholder="Ex: xxxx"
                {...register("titulo")}
                onChange={(e) => {
                  register("titulo").onChange(e);
                  setValue("titulo", e.target.value, { shouldValidate: false });
                }}
              />
              {errors?.titulo && <span className="text-xs text-red-500">{errors.titulo.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="num_gaveta">Número da gaveta</Label>
              <Input
              min='1'
                type='number'
                id="num_gaveta"
                placeholder="Ex: 4"
                {...register("num_gaveta")}
                onChange={(e) => {
                  register("num_gaveta").onChange(e);
                  setValue("num_gaveta", e.target.value, { shouldValidate: false });
                }}
              />
              {errors?.num_gaveta && <span className="text-xs text-red-500">{errors.num_gaveta.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="num_processos">Número de processos</Label>
              <Input
              min='1'
                type='number'
                id="num_processos"
                placeholder="Ex: 5"
                {...register("num_processos")}
                onChange={(e) => {
                  register("num_processos").onChange(e);
                  setValue("num_processos", e.target.value, { shouldValidate: false });
                }}
              />
              {errors?.num_processos && <span className="text-xs text-red-500">{errors.num_processos.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="armario_id">Armário pertencente</Label>
              <Select
                defaultValue={drawer?.armario_id ? String(drawer?.armario_id) : ""}
                onValueChange={(value) => {
                  setValue("armario_id", value, { shouldValidate: false });
                }}>
                <SelectTrigger id="armario_id" className="w-full">
                  <SelectValue
                    placeholder="Selecione o armário"
                  />
                </SelectTrigger>
                <SelectContent>
                  {cabinets.map((cabinet) => (
                    <SelectItem key={cabinet.id} value={String(cabinet.id)}>
                      Armário - {cabinet.num_armario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.armario_id && <span className="text-xs text-red-500">{errors.armario_id.message}</span>}
            </div>


            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Actualizar gaveta"
              ) : (
                "Criar gaveta"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
