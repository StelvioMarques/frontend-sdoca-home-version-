import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PeocessCoverForm({
  register,
  handleSubmit,
  onSubmit,
  isPending,
  setValue,
  errors,
/*   isValid, */
  processCover = null,
  drawers = [],
  docTypes = [],
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
              <Label htmlFor="num_capa_processo">Número da capa de processo</Label>
              <Input
                min='1'
                type='number'
                id="num_capa_processo"
                placeholder="Ex: 1"
                {...register("num_capa_processo")}
              />
              {errors?.num_capa_processo && <span className="text-xs text-red-500">{errors.num_capa_processo.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="num_documentos">Número de documentos</Label>
              <Input
                min='1'
                type='number'
                id="num_documentos"
                placeholder="Ex: 3"
                {...register("num_documentos")}
              />
              {errors?.num_documentos && <span className="text-xs text-red-500">{errors.num_documentos.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="tipo_doc_id">Tipo de documento</Label>
              <Select
                defaultValue={processCover?.tipo_doc_id ? String(processCover?.tipo_doc_id) : ""}
                onValueChange={(value) => setValue("tipo_doc_id", value)}>
                <SelectTrigger id="tipo_doc_id" className="w-full">
                  <SelectValue
                    placeholder="Selecione o tipo de documento"
                  />
                </SelectTrigger>

                <SelectContent>
                  {docTypes.map((docType) => (
                    <SelectItem key={docType.id} value={String(docType.id)}>
                      {docType.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.tipo_doc_id && <span className="text-xs text-red-500">{errors.tipo_doc_id.message}</span>}
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor="gaveta_id">Gaveta pertencente</Label>
              <Select
                defaultValue={processCover?.gaveta_id ? String(processCover?.gaveta_id) : ""}
                onValueChange={(value) => setValue("gaveta_id", value)}>
                <SelectTrigger id="gaveta_id" className="w-full">
                  <SelectValue
                    placeholder="Selecione a gaveta"
                  />
                </SelectTrigger>

                <SelectContent>
                  {drawers.map((drawer) => (
                    <SelectItem key={drawer.id} value={String(drawer.id)}>
                      Gaveta - {drawer.num_gaveta} (Armário - {drawer.num_armario})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.gaveta_id && <span className="text-xs text-red-500">{errors.gaveta_id.message}</span>}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Actualizar capa de processo"
              ) : (
                "Criar capa de processo"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
