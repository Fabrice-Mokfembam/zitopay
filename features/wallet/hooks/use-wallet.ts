"use client";

import { useQuery } from "@tanstack/react-query";
import { walletApi } from "../api";
import { WalletActivityParams } from "../types";

/**
 * Hook to fetch wallet balance summary
 * 
 * @returns Query result with wallet summary data
 * 
 * @example
 * ```tsx
 * const { data: summary, isLoading, error } = useWalletSummary();
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error loading wallet</div>;
 * 
 * return <div>Available: {summary.available}</div>;
 * ```
 */
export function useWalletSummary() {
    return useQuery({
        queryKey: ["wallet", "summary"],
        queryFn: () => walletApi.getSummary(),
        // Refetch every 30 seconds to keep balance updated
        refetchInterval: 30000,
        // Keep previous data while refetching
        placeholderData: (previousData) => previousData,
    });
}

/**
 * Hook to fetch wallet activity
 * 
 * @param params - Query parameters (limit)
 * @returns Query result with wallet activity data
 * 
 * @example
 * ```tsx
 * const { data: activities, isLoading, error } = useWalletActivity({ limit: 20 });
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error loading activity</div>;
 * 
 * return (
 *   <ul>
 *     {activities.map((activity, i) => (
 *       <li key={i}>{activity.label}: {activity.amount}</li>
 *     ))}
 *   </ul>
 * );
 * ```
 */
export function useWalletActivity(params?: WalletActivityParams) {
    return useQuery({
        queryKey: ["wallet", "activity", params],
        queryFn: () => walletApi.getActivity(params),
        // Refetch every minute to keep activity updated
        refetchInterval: 60000,
        // Keep previous data while refetching
        placeholderData: (previousData) => previousData,
    });
}
