"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { webhooksApi } from "./api";
import { CreateWebhookRequest } from "./types";

export function useWebhooks() {
  return useQuery({
    queryKey: ["webhooks"],
    queryFn: () => webhooksApi.list(),
  });
}

export function useCreateWebhook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWebhookRequest) => webhooksApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
  });
}

export function useUpdateWebhook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateWebhookRequest> }) =>
      webhooksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
  });
}

export function useDeleteWebhook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => webhooksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
  });
}
