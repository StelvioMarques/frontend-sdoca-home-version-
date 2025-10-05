import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

export default function ResultGroup({ title, items, Icon }) {
  return (
    <div className="mb-8 md:px-5">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-5">
        {Icon && <Icon className="w-5 h-5 text-accent-foreground" />}
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {items.map((item, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{item.titulo || item.title}</CardTitle>
              {(item.descricao || item.desc) && (
                <CardDescription>
                  {item.descricao || item.desc}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent>
              {/* Tipo */}
              {item.tipo && (
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-bold">Tipo:</span> {item.tipo}
                </p>
              )}

              {/* Código do documento */}
              {item.codigo_documento && (
                <span className="text-xs text-muted-foreground">
                  <span className="font-bold">Código:</span> {item.codigo_documento}
                </span>
              )}

              {item.actions && item.actions.length > 0 && (
                <div className='flex justify-end'>
                  {item.actions.map((action, j) => (
                    <Link to={action.url}>
                      <Button
                        key={j}
                        variant="link"
                        size="sm"
                        className="hover:text-accent-foreground"
                      >
                        {action.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}
