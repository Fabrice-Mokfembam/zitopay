"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { merchantsApi } from "./api";
import { Merchant } from "./types";

export function useMerchantProfile() {
  return useQuery({
    queryKey: ["merchant", "profile"],
    queryFn: () => merchantsApi.getProfile(),
  });
}

export function useUpdateMerchantProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Merchant>) => merchantsApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merchant", "profile"] });
    },
  });
}
