import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, EyeIcon, EyeOffIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PhotoUploader from "@/components/profile-photo-uploader"
import SignatureUploader from "@/components/assinatura_uploader"

export function UserForm({
  register,
  handleSubmit,
  setValue,
  onSubmit,
  errors,
  /*   isValid, */
  isPending,
  data,
  profilePhotoInitial,
  signatureImgInitial,
  isEdit = false,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto rounded-xl bg-muted/50"
    >
      <Card className="shadow-none">
        <CardContent className="p-6 pt-1 pb-1">
          <div className="flex flex-col gap-5">
            {/* Foto */}
            <div className="*:not-first:mt-2 flex flex-col justify-center items-center">
              <PhotoUploader setValue={setValue} initialPreview={profilePhotoInitial} />
              {errors?.profile_photo_path && <span className="text-xs text-red-500">{errors.profile_photo_path.message}</span>}
            </div>

            {/* Nome */}
            <div className="*:not-first:mt-2">
              <Label htmlFor="name_user">Nome</Label>
              <Input
                readOnly={isEdit}
                {...register("name_user")}
                id="name_user"
                placeholder="Ex: Nome Exemplo"
              />
              {errors?.name_user && <span className="text-xs text-red-500">{errors.name_user.message}</span>}
            </div>

            {/* Email */}
            <div className="*:not-first:mt-2">
              <Label htmlFor="email_user">E-mail</Label>
              <Input
                /* readOnly={isEdit} */
                {...register("email_user")}
                id="email_user"
                placeholder="Ex: user@exemplo.com"
              />
              {errors?.email_user && <span className="text-xs text-red-500">{errors.email_user.message}</span>}
            </div>

            {/* Senhas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor="password_user">Senha</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password_user"
                    placeholder="Senha"
                    {...register("password_user")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 flex items-center justify-center end-0 w-9"
                  >
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
                {errors?.password_user && <span className="text-xs text-red-500">{errors.password_user.message}</span>}
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="password_user_confirmation">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="password_user_confirmation"
                    placeholder="Confirme a senha"
                    {...register("password_user_confirmation")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 flex items-center justify-center end-0 w-9"
                  >
                    {showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
                {errors?.password_user_confirmation && <span className="text-xs text-red-500">{errors.password_user_confirmation.message}</span>}
              </div>
            </div>

            {/* Área e Permissão */}
            <div className="grid grid-cols-2 gap-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor="area_user">Área</Label>
                <Select
                  defaultValue={data?.user?.id_area ? String(data.user.id_area) : ""}
                  onValueChange={(value) => setValue("area_user", value)}
                >
                  <SelectTrigger id="area_user" className="w-full">
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.areas?.map((area) => (
                      <SelectItem key={area.id} value={String(area.id)}>
                        {area.area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors?.area_user && <span className="text-xs text-red-500">{errors.area_user.message}</span>}
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor="tipo_user">Permissão</Label>
                <Select
                  defaultValue={data?.user?.id_role ? String(data.user.id_role) : ""}
                  onValueChange={(value) => setValue("tipo_user", value)}
                >
                  <SelectTrigger id="tipo_user" className="w-full">
                    <SelectValue placeholder="Selecione a permissão" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.roles?.map((role) => (
                      <SelectItem key={role.id} value={String(role.id)}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors?.tipo_user && <span className="text-xs text-red-500">{errors.tipo_user.message}</span>}
              </div>
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor='assinatura_path'>Imagem da assinatura</Label>
              {/* <Input
                {...register("assinatura_path")}
                id='assinatura_path'
                className=" pe-3 file:me-3 file:border-0 file:border-e"
                type="file"
              /> */}
              <SignatureUploader setValue={setValue} previewInitial={signatureImgInitial} />
              {errors?.assinatura_path && <span className="text-xs text-red-500">{errors.assinatura_path.message}</span>}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isEdit ? (
                "Actualizar usuário"
              ) : (
                "Criar usuário"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
