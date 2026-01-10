import { AdminUser, SystemStats } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const adminApi = {
  getStats: async (): Promise<SystemStats> => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`);

    if (!response.ok) {
      throw new Error("Failed to fetch admin stats");
    }

    return response.json();
  },
};
