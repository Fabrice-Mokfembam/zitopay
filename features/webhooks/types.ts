export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWebhookRequest {
  url: string;
  events: string[];
}
