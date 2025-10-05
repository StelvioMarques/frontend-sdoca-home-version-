import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { IconBrandGoogle } from "@tabler/icons-react"


export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { Login, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Login({ email, password })
  }

  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        {/* Logo da org */}
        {/* <div className="flex justify-center mb-6">
          <img
            src='/edit.png'
            alt="Logo da organização"
            className="w-auto h-16 object-"
          />
        </div> */}

        <Card>
          <CardHeader>
            <CardTitle>Faça login na sua conta</CardTitle>
            <CardDescription>
              Digite seu e-mail abaixo para acessar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <div className="relative flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      placeholder="Senha"
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center justify-center w-9"
                    >
                      {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Entrando..." : "Login"}
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    <img src="/google.png" alt="google logo" className="size-5" /> Continuar com Google
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
