import { apiClient } from "@/lib/apiClient";
import { WalletSummary, WalletActivity, WalletActivityParams } from "../types";

const WALLET_BASE_URL = "/wallet";

/**
 * Wallet API Client
 * Provides methods to interact with the Wallet API endpoints
 */
export const walletApi = {
    /**
     * Get Wallet Balance Summary
     * Fetches comprehensive balance overview for dashboard display
     * 
     * @returns Promise<WalletSummary> - Balance summary data
     */
    getSummary: async (): Promise<WalletSummary> => {
        const response = await apiClient.get<WalletSummary>(`${WALLET_BASE_URL}/summary`);
        return response.data;
    },

    /**
     * Get Recent Wallet Activity
     * Fetches chronological list of recent transactions for activity feed
     * 
     * @param params - Query parameters (limit)
     * @returns Promise<WalletActivity[]> - Array of wallet activities
     */
    getActivity: async (params?: WalletActivityParams): Promise<WalletActivity[]> => {
        const queryParams = new URLSearchParams();

        if (params?.limit) {
            queryParams.append("limit", params.limit.toString());
        }

        const url = `${WALLET_BASE_URL}/activity${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

        const response = await apiClient.get<WalletActivity[]>(url);
        return response.data;
    },
};
