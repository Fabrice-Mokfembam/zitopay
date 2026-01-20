import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDashboardSummary,
  getDashboardStats,
  getRecentTransactions,
  getVolumeOverTime,
  getSuccessVsFailed,
  getGatewayBreakdown,
  getCollectionsVsPayouts,
  getTransactionReport,
  exportTransactions,
  getSettlementReport,
  getRevenueReport,
  getScheduledReports,
  getScheduledReport,
  createScheduledReport,
  updateScheduledReport,
  deleteScheduledReport,
  getPlatformSummary,
  getTopMerchantsByVolume,
  getTopMerchantsByRevenue,
  getRecentlyOnboardedMerchants,
} from './api/index';
import type {
  TransactionReportFilters,
  SettlementReportFilters,
  RevenueReportFilters,
  CreateScheduledReportRequest,
  UpdateScheduledReportRequest,
} from './types/index';

// Dashboard Summary
export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ['reports', 'dashboard', 'summary'],
    queryFn: getDashboardSummary,
    staleTime: 2000, // 2 seconds cache
  });
};

// Dashboard Stats
export const useDashboardStats = (
  merchantId: string,
  period: '7d' | '30d' | '90d' | 'all' = '30d'
) => {
  return useQuery({
    queryKey: ['reports', 'dashboard', 'stats', merchantId, period],
    queryFn: () => getDashboardStats(merchantId, period),
    enabled: !!merchantId,
    staleTime: 2000,
  });
};

// Recent Transactions
export const useRecentTransactions = (
  merchantId: string,
  limit: number = 10,
  type?: 'collection' | 'payout' | 'refund'
) => {
  return useQuery({
    queryKey: ['reports', 'dashboard', 'recent-transactions', merchantId, limit, type],
    queryFn: () => getRecentTransactions(merchantId, limit, type),
    enabled: !!merchantId,
    staleTime: 2000,
  });
};

// Chart Data
export const useVolumeOverTime = (days: number = 30) => {
  return useQuery({
    queryKey: ['reports', 'dashboard', 'volume-over-time', days],
    queryFn: () => getVolumeOverTime(days),
    staleTime: 2000,
  });
};

export const useSuccessVsFailed = () => {
  return useQuery({
    queryKey: ['reports', 'dashboard', 'success-vs-failed'],
    queryFn: getSuccessVsFailed,
    staleTime: 2000,
  });
};

export const useGatewayBreakdown = () => {
  return useQuery({
    queryKey: ['reports', 'dashboard', 'gateway-breakdown'],
    queryFn: getGatewayBreakdown,
    staleTime: 2000,
  });
};

export const useCollectionsVsPayouts = () => {
  return useQuery({
    queryKey: ['reports', 'dashboard', 'collections-vs-payouts'],
    queryFn: getCollectionsVsPayouts,
    staleTime: 2000,
  });
};

// Transaction Reports
export const useTransactionReport = (filters: TransactionReportFilters = {}) => {
  return useQuery({
    queryKey: ['reports', 'transactions', filters],
    queryFn: () => getTransactionReport(filters),
  });
};

export const useExportTransactions = () => {
  return useMutation({
    mutationFn: ({
      format,
      filters,
    }: {
      format: 'CSV' | 'EXCEL';
      filters: Omit<TransactionReportFilters, 'page' | 'limit'>;
    }) => exportTransactions(format, filters),
  });
};

// Settlement Reports
export const useSettlementReport = (filters: SettlementReportFilters = {}) => {
  return useQuery({
    queryKey: ['reports', 'settlements', filters],
    queryFn: () => getSettlementReport(filters),
  });
};

// Revenue Reports
export const useRevenueReport = (filters: RevenueReportFilters = {}) => {
  return useQuery({
    queryKey: ['reports', 'revenue', filters],
    queryFn: () => getRevenueReport(filters),
  });
};

// Scheduled Reports
export const useScheduledReports = () => {
  return useQuery({
    queryKey: ['reports', 'scheduled'],
    queryFn: getScheduledReports,
  });
};

export const useScheduledReport = (id: string) => {
  return useQuery({
    queryKey: ['reports', 'scheduled', id],
    queryFn: () => getScheduledReport(id),
    enabled: !!id,
  });
};

export const useCreateScheduledReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateScheduledReportRequest) => createScheduledReport(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports', 'scheduled'] });
    },
  });
};

export const useUpdateScheduledReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateScheduledReportRequest }) =>
      updateScheduledReport(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reports', 'scheduled'] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'scheduled', variables.id] });
    },
  });
};

export const useDeleteScheduledReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteScheduledReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports', 'scheduled'] });
    },
  });
};

// Admin Routes
export const usePlatformSummary = () => {
  return useQuery({
    queryKey: ['admin', 'reports', 'platform-summary'],
    queryFn: getPlatformSummary,
    staleTime: 2000,
  });
};

export const useTopMerchantsByVolume = (limit: number = 10) => {
  return useQuery({
    queryKey: ['admin', 'reports', 'merchants', 'top-by-volume', limit],
    queryFn: () => getTopMerchantsByVolume(limit),
    staleTime: 2000,
  });
};

export const useTopMerchantsByRevenue = (limit: number = 10) => {
  return useQuery({
    queryKey: ['admin', 'reports', 'merchants', 'top-by-revenue', limit],
    queryFn: () => getTopMerchantsByRevenue(limit),
    staleTime: 2000,
  });
};

export const useRecentlyOnboardedMerchants = (limit: number = 10) => {
  return useQuery({
    queryKey: ['admin', 'reports', 'merchants', 'recently-onboarded', limit],
    queryFn: () => getRecentlyOnboardedMerchants(limit),
    staleTime: 2000,
  });
};
