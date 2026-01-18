import { useQuery } from '@tanstack/react-query';
import * as reportApi from '../api';

/**
 * Hook to fetch dashboard statistics
 */
export const useDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: reportApi.getDashboardStats,
        staleTime: 5 * 60 * 1000, // 5 minutes matching server cache
    });
};

/**
 * Hook to fetch dashboard quick stats
 */
export const useDashboardQuickStats = () => {
    return useQuery({
        queryKey: ['dashboard-quick-stats'],
        queryFn: reportApi.getDashboardQuickStats,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook to fetch recent transactions
 */
export const useRecentTransactions = () => {
    return useQuery({
        queryKey: ['dashboard-recent-transactions'],
        queryFn: reportApi.getRecentTransactions,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
