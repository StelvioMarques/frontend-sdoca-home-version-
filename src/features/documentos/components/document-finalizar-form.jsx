import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentUploader from "@/features/documentos/components/document-uploader"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function FinalizarForm({
  setValue,
  onSubmit,
  isPending,
  handleSubmit,
  watch,
  onPreviewPdf,
  areas = [],
}) {

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50">
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            {/* área destino */}
            <div className="*:not-first:mt-2">
              <Label htmlFor="area_destino_id">Área de destino</Label>
              <Select
                defaultValue={areas?.id ? String(areas.id) : ""}
                onValueChange={(value) => setValue("area_destino_id", value)}
              >
                <SelectTrigger id="area_destino_id" className="w-full">
                  <SelectValue placeholder="Selecione a área de destino" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={String(area.id)}>
                      {area.name_area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Document uploader */}
            <div className="*:not-first:mt-2">
              <DocumentUploader
                name="anexo_docs"
                onPreviewPdf={onPreviewPdf}
                onChange={(newFiles, isRemoval = false) => {
                  // Pega os arquivos atuais do RHF
                  const currentFiles = watch("anexo_docs") || []

                  // Se for remoção, substitui, se for adição, concatena e deduplica
                  const updated = isRemoval ? newFiles : [...currentFiles, ...newFiles]
                  const deduplicated = Array.from(new Map(updated.map(f => [f.name, f])).values())

                  // Atualiza RHF
                  setValue("anexo_docs", deduplicated, { shouldValidate: true, shouldDirty: true })
                }}
              />
            </div>


            {/* submit button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Finalizar Documento"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
