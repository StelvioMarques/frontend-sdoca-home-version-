import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function UserResultGroup({ title, Icon, users }) {
  return (
    <div className="mb-10 md:px-5">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-5">
        {Icon && <Icon className="w-5 h-5 text-accent-foreground" />}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Lista de usuários */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user, index) => (
          <Card key={index}>
            <CardContent>
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <Avatar className="flex items-center justify-center w-12 h-12 text-sm font-bold rounded-full bg-primary text-primary-foreground">
                  {user.avatar}
                </Avatar>

                {/* Infos */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-sm truncate text-muted-foreground">{user.area}</p>
                  <p className="text-sm truncate text-muted-foreground">{user.email}</p>
                </div>
              </div>

              {/* Ação */}
              <div className="flex justify-end mt-1">
                <Button variant="link" size="sm" className='hover:text-accent-foreground'>
                  Ver perfil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
