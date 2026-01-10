import { Merchant } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const merchantsApi = {
  getProfile: async (): Promise<Merchant> => {
    const response = await fetch(`${API_BASE_URL}/merchants/profile`);

    if (!response.ok) {
      throw new Error("Failed to fetch merchant profile");
    }

    return response.json();
  },

  updateProfile: async (data: Partial<Merchant>): Promise<Merchant> => {
    const response = await fetch(`${API_BASE_URL}/merchants/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update merchant profile");
    }

    return response.json();
  },
};
