import { useDepartamentos as useAllDepartamentos } from "@/features/departamento/hooks/departamentoHooks"

export function useDepartamentos() {
  const { departamentos, isLoading } = useAllDepartamentos()

  return {
    departamentos,
    isLoading
  }
}