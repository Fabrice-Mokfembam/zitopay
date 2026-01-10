"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi } from "./api";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => adminApi.getStats(),
  });
}
