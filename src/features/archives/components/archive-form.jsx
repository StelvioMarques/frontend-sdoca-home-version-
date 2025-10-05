import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentUploader from "@/features/documentos/components/document-uploader"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useScanMutation } from "@/lib/scan"
import { Loader2 } from "lucide-react"
import { useState, useCallback } from "react"
import useModalStore from "@/store/modalStore"
import ScanDialog from "@/components/dialogs/scan-options-dialog"

export function DocumentForm({
  watch,
  register,
  setValue,
  onSubmit,
  isPending,
  handleSubmit,
  onPreviewPdf,
  doc_types = [],
  cabinets = [],
  drawers = [],
  processCovers = [],
  isEdit = false,
  errors,
  /*   isValid */
}) {
  const { isOpen, modalType, /* data, */ open, close } = useModalStore()
  const currentFiles = watch("anexo_docs") || []
  const [uploaderFiles, setUploaderFiles] = useState([])
  const [isScanning, setIsScanning] = useState(false)

  const addFileToUploader = useCallback((file) => {
    setUploaderFiles(prev => {
      const fileExists = prev.some(f => f.name === file.name)
      if (fileExists) return prev
      return [...prev, file]
    })
  }, [])

  const { mutate, /* isPending: isMutationPending */ } = useScanMutation({
    currentFiles,
    setValue,
    onScanComplete: (file) => {
      // Adiciona o arquivo no uploader local
      addFileToUploader(file)

      // Atualiza o form e força validação
      const updatedFiles = [...currentFiles, file]
      const deduplicated = Array.from(new Map(updatedFiles.map(f => [f.name, f])).values())
      setValue("anexo_docs", deduplicated, { shouldValidate: true, shouldDirty: true })

      // Finaliza o estado de escaneamento
      setIsScanning(false)
    },
    onScanError: () => {
      // Finaliza o estado de escaneamento em caso de erro
      setIsScanning(false)
    }
  })

  const selectedCabinet = watch('armario_id')
  const filteredDrawers = drawers.filter((drawer) => {
    return String(drawer.armario_id) === String(selectedCabinet)
  })

  const selectedDrawer = watch('gaveta_id')
  const filteredProcessCovers = processCovers.filter((cover) => {
    return String(cover.gaveta_id) === String(selectedDrawer)
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50">
        <Tabs defaultValue='info' className='bg-background'>
          <TabsList className='w-full'>
            <TabsTrigger value='info'>
              Informações do arquivo
            </TabsTrigger>

            <TabsTrigger value='uploads'>
              Ficheiros
            </TabsTrigger>
          </TabsList>

          {/* Tab doc data */}
          <TabsContent value='info' forceMount>
            <Card className="shadow-none">
              <CardContent className="p-6 pt-1 pb-1">
                <div className="flex flex-col gap-5">
                  {/* título */}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="titulo_doc">Título do arquivo</Label>
                    <Input
                      readOnly={isEdit}
                      {...register("titulo_doc")}
                      id="titulo_doc"
                      placeholder="Ex: Relatório de estágio"
                    />
                    {errors?.titulo_doc && <span className="text-xs text-red-500">{errors.titulo_doc.message}</span>}
                  </div>

                  {/* tipo de documento */}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="tipo_doc_id">Tipo de arquivo</Label>
                    <Select
                      defaultValue={doc_types?.id ? String(doc_types.id) : ""}
                      onValueChange={(value) => setValue("tipo_doc_id", value, { shouldValidate: true, shouldDirty: true })}
                    >
                      <SelectTrigger id="tipo_doc_id" className="w-full">
                        <SelectValue placeholder="Selecione o tipo de documento" />
                      </SelectTrigger>
                      <SelectContent >
                        {doc_types.map((doc_type) => (
                          <SelectItem key={doc_type.id} value={String(doc_type.id)} >
                            {doc_type.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors?.tipo_doc_id && <span className="text-xs text-red-500">{errors.tipo_doc_id.message}</span>}
                  </div>

                  {/* Mapeamento Físico */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="*:not-first:mt-2">
                      <Label htmlFor="armario_id">Armário</Label>
                      <Select

                        onValueChange={(value) => {
                          // seta armário e força validar
                          setValue("armario_id", value, { shouldValidate: true, shouldDirty: true })
                          // reseta gaveta e capa e força validar esses campos também
                          setValue("gaveta_id", "", { shouldValidate: true, shouldDirty: true })
                          setValue("capa_processo_id", "", { shouldValidate: true, shouldDirty: true })
                        }}
                      >
                        <SelectTrigger id="armario_id" className="w-full">
                          <SelectValue placeholder="Selecione o armário" />
                        </SelectTrigger>
                        <SelectContent>
                          {cabinets.map((cabinet) => (
                            <SelectItem key={cabinet.id} value={String(cabinet.id)}>
                              Armário {cabinet.num_armario}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors?.armario_id && <span className="text-xs text-red-500">{errors.armario_id.message}</span>}
                    </div>

                    {/* gaveta */}
                    <div className="*:not-first:mt-2">
                      <Label htmlFor="gaveta_id">Gaveta</Label>
                      <Select

                        value={watch("gaveta_id") || ""}
                        onValueChange={(value) => {
                          setValue("gaveta_id", value, { shouldValidate: true, shouldDirty: true });
                          // reseta capa ao trocar gaveta e garante validação
                          setValue("capa_processo_id", "", { shouldValidate: true, shouldDirty: true })
                        }}
                        disabled={!selectedCabinet || filteredDrawers.length === 0}
                      >
                        <SelectTrigger id="gaveta_id" className="w-full">
                          <SelectValue
                            placeholder={
                              !selectedCabinet
                                ? "Selecione um armário primeiro"
                                : filteredDrawers.length === 0
                                  ? "Nenhuma gaveta disponível"
                                  : "Selecione a gaveta"
                            }
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {filteredDrawers.map((drawer) => (
                            <SelectItem key={drawer.id} value={String(drawer.id)}>
                              Gaveta {drawer.num_gaveta} - {drawer.titulo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors?.gaveta_id && <span className="text-xs text-red-500">{errors.gaveta_id.message}</span>}
                    </div>

                    {/* capa */}
                    <div className="*:not-first:mt-2">
                      <Label htmlFor="capa_processo_id">Capa de Processo</Label>
                      <Select

                        value={watch("capa_processo_id") || ""}
                        onValueChange={(value) => setValue("capa_processo_id", value, { shouldValidate: true, shouldDirty: true })}
                        disabled={!selectedDrawer || filteredProcessCovers.length === 0}
                      >
                        <SelectTrigger id="capa_processo_id" className="w-full">
                          <SelectValue
                            placeholder={
                              !selectedDrawer
                                ? "Selecione uma gaveta primeiro"
                                : filteredProcessCovers.length === 0
                                  ? "Nenhuma capa disponível"
                                  : "Selecione a capa"
                            }
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {filteredProcessCovers.map((cover) => (
                            <SelectItem key={cover.id} value={String(cover.id)}>
                              {cover.num_capa_processo} - {cover.nome_tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors?.capa_processo_id && <span className="text-xs text-red-500">{errors.capa_processo_id.message}</span>}
                    </div>
                  </div>

                  {/* descrição */}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="descricao_doc">Descrição</Label>
                    <Textarea
                      readOnly={isEdit}
                      {...register("descricao_doc")}
                      id="descricao_doc"
                      placeholder="Ex: arquivos de..."
                    />
                    {errors?.descricao_doc && <span className="text-xs text-red-500">{errors.descricao_doc.message}</span>}
                  </div>

                  {/* submit button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : isEdit ? (
                      "Atualizar arquivo"
                    ) : (
                      "Cadastrar arquivo"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab doc files uploader */}
          <TabsContent value='uploads' forceMount>
            <Card className="shadow-none">
              <CardContent className="p-6 pt-1 pb-1">
                <div className="flex flex-col gap-5">
                  {/* Scan button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() => open('scan-options')}
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Escaneando...
                      </>
                    ) :
                      'Escanear arquivos'
                    }
                  </Button>

                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-px bg-border" />
                    <span className="text-sm text-muted-foreground">ou</span>
                    <div className="flex-grow h-px bg-border" />
                  </div>

                  {/* Document uploader */}
                  <div className="*:not-first:mt-2">
                    <DocumentUploader
                      name="anexo_docs"
                      onPreviewPdf={onPreviewPdf}
                      initialFiles={uploaderFiles}
                      onChange={(newFiles, isRemoval = false) => {
                        // Se for uma remoção, substitui completamente os arquivos
                        // Se for adição, concatena com os existentes
                        const updated = isRemoval ? newFiles : [...currentFiles, ...newFiles]
                        const deduplicated = Array.from(new Map(updated.map(f => [f.name, f])).values())
                        // força validação ao atualizar arquivos
                        setValue("anexo_docs", deduplicated, { shouldValidate: true, shouldDirty: true })
                        // Atualiza também o estado local do uploader para manter sincronizado
                        if (isRemoval) {
                          setUploaderFiles(deduplicated)
                        }
                      }}
                    />
                    {errors?.anexo_docs && <span className="text-xs text-red-500">{errors.anexo_docs.message}</span>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : isEdit ? (
                      "Atualizar arquivo"
                    ) : (
                      "Cadastrar arquivo"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>

      {modalType === "scan-options" && (
        <ScanDialog
          showDialog={isOpen}
          onOpenChange={(v) => (v ? null : close())}
          onScanStart={(data) => {
            setIsScanning(true)
            mutate(data)
          }}
        />
      )}
    </>
  )
}
