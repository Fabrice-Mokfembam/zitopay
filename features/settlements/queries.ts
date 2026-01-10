"use client";

import { useQuery } from "@tanstack/react-query";
import { settlementsApi } from "./api";

export function useSettlements(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["settlements", params],
    queryFn: () => settlementsApi.list(params),
  });
}

export function useSettlement(id: string | null) {
  return useQuery({
    queryKey: ["settlements", id],
    queryFn: () => (id ? settlementsApi.getById(id) : null),
    enabled: !!id,
  });
}
