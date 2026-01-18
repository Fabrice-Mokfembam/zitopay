import { apiClient } from '@/lib/apiClient';
import type {
    DashboardStatsResponse,
    DashboardQuickStatsResponse,
    RecentTransactionsResponse
} from '../types';

const REPORTS_BASE_URL = '/reports/dashboard';

/**
 * Fetch main dashboard statistics cards
 */
export const getDashboardStats = async (): Promise<DashboardStatsResponse> => {
    const { data } = await apiClient.get<DashboardStatsResponse>(`${REPORTS_BASE_URL}/stats`);
    return data;
};

/**
 * Fetch quick summary metrics
 */
export const getDashboardQuickStats = async (): Promise<DashboardQuickStatsResponse> => {
    const { data } = await apiClient.get<DashboardQuickStatsResponse>(`${REPORTS_BASE_URL}/quick-stats`);
    return data;
};

/**
 * Fetch recent transactions list
 */
export const getRecentTransactions = async (): Promise<RecentTransactionsResponse> => {
    const { data } = await apiClient.get<RecentTransactionsResponse>(`${REPORTS_BASE_URL}/recent-transactions`);
    return data;
};
