import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function ImageUploader({ setValue, defaultImage = null }) {
  const maxSizeMB = 2
  const maxSize = maxSizeMB * 1024 * 1024

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
  })

  const [initialPreview, setInitialPreview] = useState(defaultImage)

  // 🔥 Atualiza preview quando defaultImage mudar
  useEffect(() => {
    if (defaultImage && !files.length) {
      setInitialPreview(defaultImage)
    }
  }, [defaultImage, files.length])

  useEffect(() => {
    if (files.length > 0) {
      setInitialPreview(null) // limpa preview antigo
      setValue && setValue("logo_org", files[0].file)
    }
  }, [files, setValue])

  const previewUrl = files[0]?.preview || initialPreview
  const fileName = files[0]?.file.name || ''

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
        >
          <input {...getInputProps()} className="sr-only" name="logo_org" aria-label="Upload image file" />
          {previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={previewUrl}
                alt={fileName || "Uploaded image"}
                className="object-contain max-h-full mx-auto rounded"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div className="flex items-center justify-center mb-2 border rounded-full bg-background size-11 shrink-0">
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">Arraste sua imagem aqui</p>
              <p className="text-xs text-muted-foreground">
                SVG, PNG, JPG ou GIF (máx. {maxSizeMB}MB)
              </p>
              <Button variant="outline" type="button" className="mt-4" onClick={openFileDialog}>
                <UploadIcon className="-ms-1 size-4 opacity-60" aria-hidden="true" />
                Selecionar imagem
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => {
                if (files[0]) {
                  removeFile(files[0]?.id)
                } else {
                  setInitialPreview(null) // remove imagem do servidor
                  setValue && setValue("logo_org", null)
                }
              }}
              aria-label="Remover imagem"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-destructive" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
}
