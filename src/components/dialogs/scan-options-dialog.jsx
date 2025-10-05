import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { useScanMutation, useScannerList } from "@/lib/scan"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

export default function ScanDialog({
  showDialog = false,
  onOpenChange,
  onScanStart,
}) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      filename: "documento",
      format: "pdf",
      profile: "DEFAULT",
      scannerId: ""
    }
  })

  const { /* mutate,  */isPending } = useScanMutation({})
  const { scanners, isLoading } = useScannerList()
  const onSubmit = (data) => {
    onOpenChange(false) // Fecha o diálogo ao iniciar o scan
    if (onScanStart) onScanStart(data) // Notifica o componente pai que o scan começou com os dados do formulário
  }

  return (
    <AlertDialog open={showDialog} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Configurações de Scan</AlertDialogTitle>
          <AlertDialogDescription>
            Defina o nome do ficheiro, formato e perfil de scan antes de iniciar.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col w-full gap-5">
          {/* Nome do ficheiro */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="filename">Nome do ficheiro</Label>
            <Input
              id="filename"
              placeholder="ex: Bilhete de identidade"
              {...register("filename", { required: true })}
            />
          </div>

          {/* Formato */}
          <div className="flex flex-col w-full gap-2">
            <Label>Formato</Label>
            <Select
              defaultValue={watch("format")}
              onValueChange={(val) => setValue("format", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Scanner */}
          <Select
            value={watch("scannerId")}
            onValueChange={(val) => setValue("scannerId", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o scanner" />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <SelectItem disabled>Carregando...</SelectItem>
              ) : (
                scanners.map((device) => (
                  <SelectItem key={device.id} value={String(device.id)}>
                    {device.nome}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>


          {/* Perfil */}
          {/* <div className="flex flex-col gap-2">
            <Label>Perfil de Scan</Label>
            <Select
              defaultValue={watch("profile")}
              onValueChange={(val) => setValue("profile", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEFAULT">DEFAULT</SelectItem>
                <SelectItem value="AltaQualidade">Alta Qualidade</SelectItem>
                <SelectItem value="Rascunho">Rascunho</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit(onSubmit)} disabled={isPending}>
              Iniciar
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
