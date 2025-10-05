import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function PaginationContentt({
  currentPage,
  totalPages,
  onPageChange
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground grow" aria-live="polite">
        Página <span className="text-foreground">{currentPage}</span> de{" "}
        <span className="text-foreground">{totalPages}</span>
      </p>
      <Pagination className="w-auto">
        <PaginationContent className="gap-3">
          <PaginationItem>
            <Button
              variant="outline"
              className="group aria-disabled:pointer-events-none aria-disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ArrowLeftIcon
                className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
              Anterior
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              className="group aria-disabled:pointer-events-none aria-disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Próximo
              <ArrowRightIcon
                className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
