import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navigationLinks } from "./navigation-links-data"
import { cn } from "@/lib/utils"
import { Link as ScrollLink } from "react-scroll"

const ListItem = ({ className, label, url, description, icon: Icon, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <ScrollLink
          to={url}
          smooth={true}
          duration={500}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-muted-foreground",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            <div className="text-sm font-medium leading-none">{label}</div>
          </div>
          {description && (
            <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
              {description}
            </p>
          )}
        </ScrollLink>
      </NavigationMenuLink>
    </li>
  )
}

export default function DesktopMenu() {
  return (
    <NavigationMenu className="max-md:hidden">
      <NavigationMenuList>
        {navigationLinks.map((link) => (
          <NavigationMenuItem key={link.label}>
            {/* Link simples */}
            {!link.submenu ? (
              <NavigationMenuLink href={link.href} className='bg-transparent font-'>
                {link.label}
              </NavigationMenuLink>
            ) : (
              <>
                {/* Link drop */}
                <NavigationMenuTrigger className='bg-transparent'>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={cn(
                      "grid gap-3 p-2",
                      link.items.length > 3
                        ? "md:w-[500px] lg:w-[600px] md:grid-cols-2"
                        : "md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                    )}
                  >
                    {link.items.map((item) => (
                      <ListItem
                        key={item.label}
                        url={item.href}
                        label={item.label}
                        description={item.description}
                        icon={item.icon}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
