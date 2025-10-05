import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export function Register() {
  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Crie uma conta</CardTitle>
            <CardDescription> Digite os seus dados abaixo para criação da conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" type="text" placeholder="Nome Exemplo" required />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" required />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  </div>
                  <Input id="confirm-password" type="password" required />
                </div>

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">Criar conta</Button>
                </div>
              </div>
              <div className="mt-4 text-sm text-center">
                Já tem uma conta?{" "}
                <Link to="/" className="underline underline-offset-4">Entrar</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
