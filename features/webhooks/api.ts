import { Webhook, CreateWebhookRequest } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const webhooksApi = {
  list: async (): Promise<Webhook[]> => {
    const response = await fetch(`${API_BASE_URL}/webhooks`);

    if (!response.ok) {
      throw new Error("Failed to fetch webhooks");
    }

    return response.json();
  },

  create: async (data: CreateWebhookRequest): Promise<Webhook> => {
    const response = await fetch(`${API_BASE_URL}/webhooks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create webhook");
    }

    return response.json();
  },

  update: async (id: string, data: Partial<CreateWebhookRequest>): Promise<Webhook> => {
    const response = await fetch(`${API_BASE_URL}/webhooks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update webhook");
    }

    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/webhooks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete webhook");
    }
  },
};
