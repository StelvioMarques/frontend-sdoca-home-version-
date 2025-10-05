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
import { Controller } from "react-hook-form"
import AreasSelector from "@/components/multiple-select"
import useModalStore from "@/store/modalStore"
import ScanDialog from "@/components/dialogs/scan-options-dialog"

export function DocumentForm({
  watch,
  register,
  setValue,
  onSubmit,
  control,
  isPending,
  handleSubmit,
  onPreviewPdf,
  areas = [],
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
        <Tabs defaultValue='utentes' className='bg-background'>
          <TabsList className='w-full'>
            <TabsTrigger value='utentes'>
              Dados do utentes
            </TabsTrigger>

            <TabsTrigger value='info'>
              Informações do documento
            </TabsTrigger>

            <TabsTrigger value='uploads'>
              Ficheiros
            </TabsTrigger>
          </TabsList>

          {/* Tab utente data */}
          <TabsContent value='utentes' forceMount>
            <Card className="shadow-none">
              <CardContent className="p-6 pt-1 pb-1">
                <div className="flex flex-col gap-5">
                  {/* nº bi*/}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="n_bi">Nº Bilhete/NIF</Label>
                    <Input
                      readOnly={isEdit}
                      {...register("n_bi")}
                      id="n_bi"
                      placeholder="Ex: 021986560LA054"
                    />
                    {errors?.n_bi && <span className="text-xs text-red-500">{errors.n_bi.message}</span>}
                  </div>

                  {/* Nome */}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      readOnly={isEdit}
                      {...register("nome")}
                      id="nome"
                      placeholder="Ex: João Silva"
                    />
                    {errors?.nome && <span className="text-xs text-red-500">{errors.nome.message}</span>}
                  </div>

                  {/* email*/}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      readOnly={isEdit}
                      {...register("email")}
                      id="email"
                      placeholder="Ex: exemplo@email.com"
                    />
                    {errors?.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                  </div>

                  {/* nº telefone */}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      readOnly={isEdit}
                      type='number'
                      {...register("telefone")}
                      id="telefone"
                      placeholder="Ex: 923000000"
                    />
                    {errors?.telefone && <span className="text-xs text-red-500">{errors.telefone.message}</span>}
                  </div>

                  {/* submit button */}
                  <Button type="submit" className="w-full" disabled={isPending} >
                    {isPending ?
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      : isEdit ? "Atualizar Documento" : "Criar Documento"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab doc data */}
          <TabsContent value='info' forceMount>
            <Card className="shadow-none">
              <CardContent className="p-6 pt-1 pb-1">
                <div className="flex flex-col gap-5">
                  {/* título */}
                  <div className="*:not-first:mt-2">
                    <Label htmlFor="titulo_doc">Título do documento</Label>
                    <Input
                      readOnly={isEdit}
                      {...register("titulo_doc")}
                      id="titulo_doc"
                      placeholder="Ex: Relatório de estágio"
                    />
                    {errors?.titulo_doc && <span className="text-xs text-red-500">{errors.titulo_doc.message}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* tipo de documento */}
                    <div className="*:not-first:mt-2">
                      <Label htmlFor="tipo_doc_id">Tipo de documento</Label>
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

                    {/* Privacidade */}
                    <div className="*:not-first:mt-2">
                      <Label htmlFor="privacidade">Nível Prioridade</Label>

                      <Controller
                        name="privacidade"
                        control={control}
                        defaultValue="0"
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger id="privacidade" className="w-full">
                              <SelectValue placeholder="Selecione o nível" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Normal</SelectItem>
                              <SelectItem value="1">Urgente</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors?.privacidade && <span className="text-xs text-red-500">{errors.privacidade.message}</span>}
                    </div>
                  </div>

                  {/* origem e destino */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="*:not-first:mt-2">
                      <Label htmlFor="area_origem_id">Área de origem</Label>
                      <Select
                        defaultValue={areas?.id ? String(areas.id) : ""}
                        onValueChange={(value) => setValue("area_origem_id", value, { shouldValidate: true, shouldDirty: true })}
                      >
                        <SelectTrigger id="area_origem_id" className="w-full">
                          <SelectValue placeholder="Selecione a área de origem" />
                        </SelectTrigger>
                        <SelectContent>
                          {areas.map((area) => (
                            <SelectItem key={area.id} value={String(area.id)}>
                              {area.name_area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors?.area_origem_id && <span className="text-xs text-red-500">{errors.area_origem_id.message}</span>}
                    </div>

                    <div className="*:not-first:mt-2">
                      <Controller
                        name="area_destinos_ids"
                        control={control}
                        render={({ field }) => (
                          <AreasSelector
                            areas={areas}
                            selected={(field.value ?? []).map(id => areas.find(a => a.id === id) || {})}
                            onChange={(value) => {
                              field.onChange(value);
                              // garante validação ao mudar a multiple select
                              setValue("area_destinos_ids", value, { shouldValidate: true, shouldDirty: true })
                            }}
                          />
                        )}
                      />
                      {errors?.area_destinos_ids && <span className="text-xs text-red-500">{errors.area_destinos_ids.message}</span>}

                    </div>
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
                      placeholder="Ex: relatório do estágio de Stelvio Marques"
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
                      "Atualizar Documento"
                    ) : (
                      "Criar Documento"
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
                      'Escanear Documento'
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
                      "Atualizar Documento"
                    ) : (
                      "Cadastrar documento"
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
