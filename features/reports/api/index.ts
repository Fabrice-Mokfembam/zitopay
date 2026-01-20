import { apiClient } from '@/lib/apiClient';
import type {
  DashboardSummaryResponse,
  DashboardStatsResponse,
  RecentTransactionsResponse,
  VolumeOverTimeResponse,
  SuccessVsFailedResponse,
  GatewayBreakdownResponse,
  CollectionsVsPayoutsResponse,
  TransactionReportResponse,
  TransactionReportFilters,
  SettlementReportResponse,
  SettlementReportFilters,
  RevenueReportResponse,
  RevenueReportFilters,
  ScheduledReportsResponse,
  ScheduledReportResponse,
  CreateScheduledReportRequest,
  UpdateScheduledReportRequest,
  PlatformSummaryResponse,
  TopMerchantByVolume,
  TopMerchantByRevenue,
  RecentlyOnboardedMerchant,
} from '../types/index';

const REPORTS_BASE_URL = '/reports';
const MERCHANT_BASE_URL = '/merchant/v1/merchants';

// Dashboard Summary
export const getDashboardSummary = async (): Promise<DashboardSummaryResponse> => {
  const response = await apiClient.get<DashboardSummaryResponse>(
    `${REPORTS_BASE_URL}/dashboard/summary`
  );
  return response.data;
};

// Dashboard Stats (Spec-Compliant)
export const getDashboardStats = async (
  merchantId: string,
  period: '7d' | '30d' | '90d' | 'all' = '30d'
): Promise<DashboardStatsResponse> => {
  const response = await apiClient.get<DashboardStatsResponse>(
    `${MERCHANT_BASE_URL}/${merchantId}/dashboard/stats`,
    { params: { period } }
  );
  return response.data;
};

// Recent Transactions
export const getRecentTransactions = async (
  merchantId: string,
  limit: number = 10,
  type?: 'collection' | 'payout' | 'refund'
): Promise<RecentTransactionsResponse> => {
  const params: Record<string, string | number> = { limit };
  if (type) params.type = type;

  const response = await apiClient.get<RecentTransactionsResponse>(
    `${MERCHANT_BASE_URL}/${merchantId}/dashboard/transactions/recent`,
    { params }
  );
  return response.data;
};

// Chart Data Endpoints
export const getVolumeOverTime = async (days: number = 30): Promise<VolumeOverTimeResponse> => {
  const response = await apiClient.get<VolumeOverTimeResponse>(
    `${REPORTS_BASE_URL}/dashboard/volume-over-time`,
    { params: { days } }
  );
  return response.data;
};

export const getSuccessVsFailed = async (): Promise<SuccessVsFailedResponse> => {
  const response = await apiClient.get<SuccessVsFailedResponse>(
    `${REPORTS_BASE_URL}/dashboard/success-vs-failed`
  );
  return response.data;
};

export const getGatewayBreakdown = async (): Promise<GatewayBreakdownResponse> => {
  const response = await apiClient.get<GatewayBreakdownResponse>(
    `${REPORTS_BASE_URL}/dashboard/gateway-breakdown`
  );
  return response.data;
};

export const getCollectionsVsPayouts = async (): Promise<CollectionsVsPayoutsResponse> => {
  const response = await apiClient.get<CollectionsVsPayoutsResponse>(
    `${REPORTS_BASE_URL}/dashboard/collections-vs-payouts`
  );
  return response.data;
};

// Transaction Reports
export const getTransactionReport = async (
  filters: TransactionReportFilters = {}
): Promise<TransactionReportResponse> => {
  const response = await apiClient.get<TransactionReportResponse>(
    `${REPORTS_BASE_URL}/transactions`,
    { params: filters }
  );
  return response.data;
};

export const exportTransactions = async (
  format: 'CSV' | 'EXCEL' = 'CSV',
  filters: Omit<TransactionReportFilters, 'page' | 'limit'> = {}
): Promise<Blob> => {
  const response = await apiClient.get(
    `${REPORTS_BASE_URL}/transactions/export`,
    {
      params: { format, ...filters },
      responseType: 'blob',
    }
  );
  return response.data;
};

// Settlement Reports
export const getSettlementReport = async (
  filters: SettlementReportFilters = {}
): Promise<SettlementReportResponse> => {
  const response = await apiClient.get<SettlementReportResponse>(
    `${REPORTS_BASE_URL}/settlements`,
    { params: filters }
  );
  return response.data;
};

// Revenue Reports
export const getRevenueReport = async (
  filters: RevenueReportFilters = {}
): Promise<RevenueReportResponse> => {
  const response = await apiClient.get<RevenueReportResponse>(
    `${REPORTS_BASE_URL}/revenue`,
    { params: filters }
  );
  return response.data;
};

// Scheduled Reports
export const getScheduledReports = async (): Promise<ScheduledReportsResponse> => {
  const response = await apiClient.get<ScheduledReportsResponse>(
    `${REPORTS_BASE_URL}/scheduled`
  );
  return response.data;
};

export const getScheduledReport = async (id: string): Promise<ScheduledReportResponse> => {
  const response = await apiClient.get<ScheduledReportResponse>(
    `${REPORTS_BASE_URL}/scheduled/${id}`
  );
  return response.data;
};

export const createScheduledReport = async (
  data: CreateScheduledReportRequest
): Promise<ScheduledReportResponse> => {
  const response = await apiClient.post<ScheduledReportResponse>(
    `${REPORTS_BASE_URL}/scheduled`,
    data
  );
  return response.data;
};

export const updateScheduledReport = async (
  id: string,
  data: UpdateScheduledReportRequest
): Promise<ScheduledReportResponse> => {
  const response = await apiClient.patch<ScheduledReportResponse>(
    `${REPORTS_BASE_URL}/scheduled/${id}`,
    data
  );
  return response.data;
};

export const deleteScheduledReport = async (id: string): Promise<void> => {
  await apiClient.delete(`${REPORTS_BASE_URL}/scheduled/${id}`);
};

// Admin Routes
const ADMIN_REPORTS_BASE_URL = '/admin/reports';

export const getPlatformSummary = async (): Promise<PlatformSummaryResponse> => {
  const response = await apiClient.get<PlatformSummaryResponse>(
    `${ADMIN_REPORTS_BASE_URL}/platform-summary`
  );
  return response.data;
};

export const getTopMerchantsByVolume = async (
  limit: number = 10
): Promise<TopMerchantByVolume[]> => {
  const response = await apiClient.get<TopMerchantByVolume[]>(
    `${ADMIN_REPORTS_BASE_URL}/merchants/top-by-volume`,
    { params: { limit } }
  );
  return response.data;
};

export const getTopMerchantsByRevenue = async (
  limit: number = 10
): Promise<TopMerchantByRevenue[]> => {
  const response = await apiClient.get<TopMerchantByRevenue[]>(
    `${ADMIN_REPORTS_BASE_URL}/merchants/top-by-revenue`,
    { params: { limit } }
  );
  return response.data;
};

export const getRecentlyOnboardedMerchants = async (
  limit: number = 10
): Promise<RecentlyOnboardedMerchant[]> => {
  const response = await apiClient.get<RecentlyOnboardedMerchant[]>(
    `${ADMIN_REPORTS_BASE_URL}/merchants/recently-onboarded`,
    { params: { limit } }
  );
  return response.data;
};
