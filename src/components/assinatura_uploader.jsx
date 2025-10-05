import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react"
import { useFileUpload } from "@/hooks/use-file-upload"
import { useEffect, useState } from "react"

export default function SignatureUploader({ setValue, previewInitial = null }) {
  const maxSizeMB = 5
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
    accept: "image/*",
    maxSize,
  })

  const [preview, setPreview] = useState(null)

  // atualiza preview quando a prop inicial mudar
  // atualiza preview e valor inicial do form
  useEffect(() => {
    if (previewInitial) {
      setPreview(previewInitial)
      setValue("assinatura_path", previewInitial, { shouldValidate: true })
    }
  }, [previewInitial, setValue])


  // atualiza valor do form e preview quando sobe um arquivo
  useEffect(() => {
    if (files.length > 0) {
      const file = files[0].file
      setValue("assinatura_path", file, { shouldValidate: false })
      setPreview(URL.createObjectURL(files[0].file))
    }
  }, [files, setValue])

  const handleRemove = () => {
    if (files.length > 0) removeFile(files[0].id)
    setValue("assinatura_path", "__SIGNATURE_REMOVED__", { shouldValidate: false })
    setPreview(null)
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 relative flex h-20 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed p-2 transition-colors"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
          />
          {preview ? (
            <div className="absolute inset-0 flex items-center justify-center p-1">
              <img
                src={preview}
                alt="Preview da assinatura"
                className="object-contain max-w-full max-h-full rounded"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-2 text-center">
              <div
                className="flex items-center justify-center w-8 h-8 mb-1 border rounded-full bg-background shrink-0"
                aria-hidden="true"
              >
                <ImageUpIcon className="w-3 h-3 opacity-60" />
              </div>
              <p className="text-xs font-medium">Arraste ou clique</p>
              <p className="text-[10px] text-muted-foreground">
                Máx: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>

        {preview && (
          <div className="absolute top-1 right-1">
            <button
              type="button"
              className="flex items-center justify-center w-6 h-6 text-white rounded-full outline-none bg-black/60 hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-ring"
              onClick={handleRemove}
              aria-label="Remove image"
            >
              <XIcon className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="flex items-center gap-1 text-[10px] text-destructive" role="alert">
          <AlertCircleIcon className="w-3 h-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
}
