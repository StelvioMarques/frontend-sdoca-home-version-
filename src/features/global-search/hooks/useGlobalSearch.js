import { useQuery } from "@tanstack/react-query"
import axios from "@/lib/axios"

export function useGlobalSearch(query) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) return []
      const res = await axios.get(`/search`, {
        params: { q: query },
      })
      return res.data
    },
    enabled: !!query,
  })
}
