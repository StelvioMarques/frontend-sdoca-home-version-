// components/AreaForm.jsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function AreaForm({
  register,
  handleSubmit,
  setValue,
  onSubmit,
  errors,
/*   isValid, */
  isPending,
  isEdit = false,
  area = null,
  departamentos = []
}) {


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
    >
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor="name_area">Nome</Label>
                <Input
                  id="name_area"
                  placeholder="Ex: área de desenvolvimento"
                  {...register("name_area")}
                />
                {errors?.name_area && <span className="text-xs text-red-500">{errors.name_area.message}</span>}
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="slogan_area">Sigla</Label>
                <Input
                  id="slogan_area"
                  placeholder="Ex: AD"
                  {...register("slogan_area")}
                />
                {errors?.slogan_area && <span className="text-xs text-red-500">{errors.slogan_area.message}</span>}
              </div>
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="telefone_area">Telefone</Label>
              <Input
                id="telefone_area"
                placeholder="Ex: 923000000"
                {...register("telefone_area")}
              />
              {errors?.telefone_area && <span className="text-xs text-red-500">{errors.telefone_area.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="email_area">E-mail</Label>
              <Input
                id="email_area"
                placeholder="Ex: desenvolvimento@area.ao"
                {...register("email_area")}
              />
              {errors?.email_area && <span className="text-xs text-red-500">{errors.email_area.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="depart_id">Departamento Pertencente</Label>
              <Select
                defaultValue={area?.depart_id ? String(area.depart_id) : ""}
                onValueChange={(value) => setValue("depart_id", value)}>
                <SelectTrigger id="depart_id" className="w-full">
                  <SelectValue
                    placeholder="Selecione o departamento"
                  />
                </SelectTrigger>
                <SelectContent>
                  {departamentos.map((departamento) => (
                    <SelectItem key={departamento.id} value={String(departamento.id)}>
                      {departamento.name_departamento}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.depart_id && <span className="text-xs text-red-500">{errors.depart_id.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="descricao_area">Descrição</Label>
              <Textarea
                id="descricao_area"
                placeholder="Descreva a área..."
                rows={5}
                {...register("descricao_area")}
              />
              {errors?.descricao_area && <span className="text-xs text-red-500">{errors.descricao_area.message}</span>}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Actualizar área"
              ) : (
                "Criar área"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
