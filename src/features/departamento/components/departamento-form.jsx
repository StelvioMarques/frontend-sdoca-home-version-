import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export function DepartamentoForm({
  register,
  handleSubmit,
  setValue,
  onSubmit,
  errors,
  /*   isValid, */
  isPending,
  isEdit = false,
  departamento = null,
  organizations = []
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
                <Label htmlFor="name_departamento">Nome</Label>
                <Input
                  id="name_departamento"
                  placeholder="Ex: Recursos humanos"
                  {...register("name_departamento")}
                />
                {errors?.name_departamento && <span className="text-xs text-red-500">{errors.name_departamento.message}</span>}
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="sigla_departamento">Sigla</Label>
                <Input
                  id="sigla_departamento"
                  placeholder="Ex: RH"
                  {...register("sigla_departamento")}
                />
                {errors?.sigla_departamento && <span className="text-xs text-red-500">{errors.sigla_departamento.message}</span>}
              </div>
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="telefone_departamento">Telefone</Label>
              <Input
                type='number'
                id="telefone_departamento"
                placeholder="Ex: 923000000"
                {...register("telefone_departamento")}
              />
              {errors?.telefone_departamento && <span className="text-xs text-red-500">{errors.telefone_departamento.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="email_departamento">E-mail</Label>
              <Input
                id="email_departamento"
                placeholder="Ex: rh.departamento@gmail.com"
                {...register("email_departamento")}
              />
              {errors?.email_departamento && <span className="text-xs text-red-500">{errors.email_departamento.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="org_id">Organização Pertencente</Label>
              <Select
                defaultValue={departamento?.org_id ? String(departamento.org_id) : ""}
                onValueChange={(value) => setValue("org_id", value)}>
                <SelectTrigger id="org_id" className="w-full">
                  <SelectValue
                    placeholder="Selecione a organização"
                  />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={String(org.id)}>
                      {org.name_org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.org_id && <span className="text-xs text-red-500">{errors.org_id.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="descricao_departamento">Descrição</Label>
              <Textarea
                id="descricao_departamento"
                placeholder="Descreva o departamento..."
                rows={5}
                {...register("descricao_departamento")}
              />
              {errors?.descricao_departamento && <span className="text-xs text-red-500">{errors.descricao_departamento.message}</span>}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Actualizar departamento"
              ) : (
                "Criar departamento"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
