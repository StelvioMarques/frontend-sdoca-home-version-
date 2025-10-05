import { MoreHorizontal, TrashIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ActionMenuTable({
  label = "Acções",
  actions = [],
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuGroup>
          {actions.map((action, i) => (
            <DropdownMenuItem
              key={i}
              onClick={(e) => {
                e.stopPropagation() // não deixa o click chegar no TableRow
                action.onClick?.(e)
              }}
            >
              {action.Icon && (
                <action.Icon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
              )}
              {action.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


