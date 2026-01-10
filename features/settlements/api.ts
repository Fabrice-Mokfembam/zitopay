import { Settlement } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const settlementsApi = {
  list: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<{ data: Settlement[]; total: number }> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const response = await fetch(
      `${API_BASE_URL}/settlements?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch settlements");
    }

    return response.json();
  },

  getById: async (id: string): Promise<Settlement> => {
    const response = await fetch(`${API_BASE_URL}/settlements/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch settlement");
    }

    return response.json();
  },
};
