import { FileText } from "lucide-react"

export default function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 text-primary hover:text-primary/90 group">
      <div className="transition-transform duration-200 group-hover:scale-105">
        <FileText />
      </div>

      <span className="hidden text-lg font-medium sm:block">SDOCA</span>
    </a>
  )
}