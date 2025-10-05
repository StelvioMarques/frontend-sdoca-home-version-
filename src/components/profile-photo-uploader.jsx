import { CircleUserRoundIcon, XIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"

export default function PhotoUploader({ setValue, initialPreview = null }) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    })

  const [preview, setPreview] = useState(initialPreview)

  // atualiza preview quando a prop inicial mudar
  useEffect(() => {
    if (initialPreview) setPreview(initialPreview)
  }, [initialPreview])

  // atualiza valor do form e preview quando sobe um arquivo
  useEffect(() => {
    if (files.length > 0) {
      const file = files[0].file
      setValue("profile_photo_path", file, { shouldValidate: false })
      setPreview(URL.createObjectURL(file))
    }
  }, [files, setValue])

  const handleRemove = () => {
    if (files.length > 0) removeFile(files[0].id)
    // Usar um valor especial '__PHOTO_REMOVED__' para indicar explicitamente que a foto foi removida
    // em vez de uma string "null" que pode ser confundida com um valor não alterado
    setValue("profile_photo_path", "__PHOTO_REMOVED__", { shouldValidate: false })
    setPreview(null)
  }

  const fileName = files[0]?.file.name || null

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative inline-flex">
        <Button
          type="button"
          variant="outline"
          className="relative p-0 overflow-hidden rounded-full shadow-none size-26"
          onClick={openFileDialog}
          aria-label={preview ? "Change image" : "Upload image"}>
          {preview ? (
            <img
              className="object-cover size-full"
              src={preview}
              alt="Preview of uploaded image"
              width={104}
              height={104}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </Button>

        {preview && (
          <Button
            onClick={handleRemove}
            type="button"
            size="icon"
            className="absolute border-2 rounded-full shadow-none border-background focus-visible:border-background -top-2 -right-2 size-6"
            aria-label="Remove image">
            <XIcon className="size-3.5" />
          </Button>
        )}

        <input
          {...getInputProps()}
          name="profile_photo_path"
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>

      {fileName && <p className="text-xs text-muted-foreground">{fileName}</p>}
    </div>
  )
}
