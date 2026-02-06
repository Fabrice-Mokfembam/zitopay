import { apiClient } from '@/lib/apiClient';
import {
  AdminUser,
  SystemStats,
  PlatformMetricsResponse,
  HealthMetricsResponse,
  GatewayPerformanceResponse,
  MerchantUsersResponse,
  CreateMerchantRequest,
  CreateMerchantResponse,
  AdminTransactionsResponse,
  AdminTransactionFilters,
  GetPlatformSettingsResponse,
  UpdateMerchantRegistrationSettingsRequest,
  UpdateMerchantRegistrationSettingsResponse,
  FeeVersionsResponse,
  CreateFeeVersionRequest,
  CreateFeeVersionResponse,
  ActivateFeeVersionResponse,
  FeeRulesResponse,
  FeeRuleResponse,
  FeeRuleFilters,
  CreateFeeRuleRequest,
  CreateFeeRuleResponse,
  UpdateFeeRuleRequest,
  DeactivateFeeRuleResponse,
  ActivateFeeRuleResponse,
  FeeTiersResponse,
  CreateFeeTierRequest,
  CreateFeeTierResponse,
  UpdateFeeTierRequest,
  UpdateFeeTierResponse,
  MerchantFeeOverridesResponse,
  MerchantFeeOverrideResponse,
  MerchantFeeOverrideFilters,
  CreateMerchantFeeOverrideRequest,
  UpdateMerchantFeeOverrideRequest,
  DeactivateMerchantFeeOverrideResponse,
  PlatformWalletFeeSettingsResponse,
  UpdatePlatformWalletFeeSettingsRequest,
  DeleteMerchantResponse,
  GenerateBypassPasswordRequest,
  GenerateBypassPasswordResponse,
  GetGlobalGatewaysResponse,
  UpdateGlobalGatewayRequest,
  UpdateGlobalGatewayResponse,
  MerchantStatusUpdate,
  UpdateMerchantStatusResponse,
  MerchantCapabilitiesUpdate,
  UpdateMerchantCapabilitiesResponse,
  MerchantGatewayConfigUpdate,
  UpdateMerchantGatewayConfigResponse,
  GatewayCode
} from "./types";

const ADMIN_BASE_URL = '/admin/v1';
const ADMIN_DASHBOARD_URL = `${ADMIN_BASE_URL}/dashboard`;
const FEE_BASE_URL = '/v1/admin';

/**
 * Get platform metrics (total merchants, active merchants, platform revenue, total volume)
 */
export const getPlatformMetrics = async (): Promise<PlatformMetricsResponse> => {
  const response = await apiClient.get<PlatformMetricsResponse>(
    `${ADMIN_DASHBOARD_URL}/platform-metrics`
  );
  return response.data;
};

/**
 * Get health metrics (success rate, failed transactions, pending KYB, recon issues)
 */
export const getHealthMetrics = async (): Promise<HealthMetricsResponse> => {
  const response = await apiClient.get<HealthMetricsResponse>(
    `${ADMIN_DASHBOARD_URL}/health-metrics`
  );
  return response.data;
};

/**
 * Get gateway performance metrics
 */
export const getGatewayPerformance = async (): Promise<GatewayPerformanceResponse> => {
  const response = await apiClient.get<GatewayPerformanceResponse>(
    `${ADMIN_DASHBOARD_URL}/gateway-performance`
  );
  return response.data;
};

/**
 * Get all merchant users
 * Returns comprehensive list of all merchant-user relationships
 */
export const getAllMerchantUsers = async (): Promise<MerchantUsersResponse> => {
  const response = await apiClient.get<MerchantUsersResponse>(
    `${ADMIN_BASE_URL}/merchant-users`
  );
  return response.data;
};

export const createMerchantAccount = async (
  payload: CreateMerchantRequest
): Promise<CreateMerchantResponse> => {
  const response = await apiClient.post<CreateMerchantResponse>(
    `${ADMIN_BASE_URL}/merchants/create`,
    payload
  );
  return response.data;
};

export const getPlatformSettings = async (): Promise<GetPlatformSettingsResponse> => {
  const response = await apiClient.get<GetPlatformSettingsResponse>(
    `${ADMIN_BASE_URL}/settings`
  );
  return response.data;
};

export const updateMerchantRegistrationSettings = async (
  payload: UpdateMerchantRegistrationSettingsRequest
): Promise<UpdateMerchantRegistrationSettingsResponse> => {
  const response = await apiClient.put<UpdateMerchantRegistrationSettingsResponse>(
    `${ADMIN_BASE_URL}/settings/merchant-registration`,
    payload
  );
  return response.data;
};

/**
 * Generate a new bypass password (master key)
 * Can be used with ANY merchant email to login
 */
export const generateBypassPassword = async (
  payload: GenerateBypassPasswordRequest = {}
): Promise<GenerateBypassPasswordResponse> => {
  const response = await apiClient.post<GenerateBypassPasswordResponse>(
    `${ADMIN_BASE_URL}/bypass-passwords/generate`,
    payload
  );
  return response.data;
};

/**
 * Get all transactions
 * Returns comprehensive list of all transactions with filters and pagination
 */
export const getAllTransactions = async (
  filters?: AdminTransactionFilters
): Promise<AdminTransactionsResponse> => {
  const params: Record<string, string> = {};

  if (filters?.limit) params.limit = filters.limit.toString();
  if (filters?.offset) params.offset = filters.offset.toString();
  if (filters?.status) params.status = filters.status;
  if (filters?.transactionType) params.transactionType = filters.transactionType;
  if (filters?.gateway) params.gateway = filters.gateway;
  if (filters?.merchantId) params.merchantId = filters.merchantId;
  if (filters?.environment) params.environment = filters.environment;

  const response = await apiClient.get<AdminTransactionsResponse>(
    `${ADMIN_BASE_URL}/transactions`,
    { params }
  );
  return response.data;
};

// Legacy API (keeping for backward compatibility)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Fee Versions API
export const getFeeVersions = async (): Promise<FeeVersionsResponse> => {
  const response = await apiClient.get<FeeVersionsResponse>(`${FEE_BASE_URL}/fee-versions`);
  return response.data;
};

export const createFeeVersion = async (data: CreateFeeVersionRequest): Promise<CreateFeeVersionResponse> => {
  const response = await apiClient.post<CreateFeeVersionResponse>(`${FEE_BASE_URL}/fee-versions`, data);
  return response.data;
};

export const activateFeeVersion = async (id: string): Promise<ActivateFeeVersionResponse> => {
  const response = await apiClient.post<ActivateFeeVersionResponse>(`${FEE_BASE_URL}/fee-versions/${id}/activate`);
  return response.data;
};

// Fee Rules API
export const getFeeRules = async (filters?: FeeRuleFilters): Promise<FeeRulesResponse> => {
  const params: Record<string, string> = {};
  if (filters?.gateway) params.gateway = filters.gateway;
  if (filters?.transactionType) params.transactionType = filters.transactionType;
  if (filters?.currency) params.currency = filters.currency;
  if (filters?.status) params.status = filters.status;
  if (filters?.feeVersionId) params.feeVersionId = filters.feeVersionId;

  const response = await apiClient.get<FeeRulesResponse>(`${FEE_BASE_URL}/fee-rules`, { params });
  return response.data;
};

export const getFeeRule = async (id: string): Promise<FeeRuleResponse> => {
  const response = await apiClient.get<FeeRuleResponse>(`${FEE_BASE_URL}/fee-rules/${id}`);
  return response.data;
};

export const createFeeRule = async (data: CreateFeeRuleRequest): Promise<CreateFeeRuleResponse> => {
  const response = await apiClient.post<CreateFeeRuleResponse>(`${FEE_BASE_URL}/fee-rules`, data);
  return response.data;
};

export const updateFeeRule = async (id: string, data: UpdateFeeRuleRequest): Promise<FeeRuleResponse> => {
  const response = await apiClient.patch<FeeRuleResponse>(`${FEE_BASE_URL}/fee-rules/${id}`, data);
  return response.data;
};

export const activateFeeRule = async (id: string): Promise<ActivateFeeRuleResponse> => {
  const response = await apiClient.post<ActivateFeeRuleResponse>(`${FEE_BASE_URL}/fee-rules/${id}/activate`);
  return response.data;
};

export const deactivateFeeRule = async (id: string): Promise<DeactivateFeeRuleResponse> => {
  const response = await apiClient.post<DeactivateFeeRuleResponse>(`${FEE_BASE_URL}/fee-rules/${id}/deactivate`);
  return response.data;
};

// Fee Tiers API
export const getFeeTiers = async (feeRuleId: string): Promise<FeeTiersResponse> => {
  const response = await apiClient.get<FeeTiersResponse>(`${FEE_BASE_URL}/fee-rules/${feeRuleId}/tiers`);
  return response.data;
};

export const createFeeTier = async (feeRuleId: string, data: CreateFeeTierRequest): Promise<CreateFeeTierResponse> => {
  const response = await apiClient.post<CreateFeeTierResponse>(`${FEE_BASE_URL}/fee-rules/${feeRuleId}/tiers`, data);
  return response.data;
};

export const updateFeeTier = async (id: string, data: UpdateFeeTierRequest): Promise<UpdateFeeTierResponse> => {
  const response = await apiClient.patch<UpdateFeeTierResponse>(`${FEE_BASE_URL}/fee-tiers/${id}`, data);
  return response.data;
};

// Merchant Fee Overrides API
export const getMerchantFeeOverrides = async (filters?: MerchantFeeOverrideFilters): Promise<MerchantFeeOverridesResponse> => {
  const params: Record<string, string> = {};
  if (filters?.merchantId) params.merchantId = filters.merchantId;
  if (filters?.gateway) params.gateway = filters.gateway;
  if (filters?.transactionType) params.transactionType = filters.transactionType;
  if (filters?.currency) params.currency = filters.currency;
  if (filters?.status) params.status = filters.status;

  const response = await apiClient.get<MerchantFeeOverridesResponse>(`${FEE_BASE_URL}/merchant-fee-overrides`, { params });
  return response.data;
};

export const createMerchantFeeOverride = async (data: CreateMerchantFeeOverrideRequest): Promise<MerchantFeeOverrideResponse> => {
  const response = await apiClient.post<MerchantFeeOverrideResponse>(`${FEE_BASE_URL}/merchant-fee-overrides`, data);
  return response.data;
};

export const updateMerchantFeeOverride = async (id: string, data: UpdateMerchantFeeOverrideRequest): Promise<MerchantFeeOverrideResponse> => {
  const response = await apiClient.patch<MerchantFeeOverrideResponse>(`${FEE_BASE_URL}/merchant-fee-overrides/${id}`, data);
  return response.data;
};

export const deactivateMerchantFeeOverride = async (id: string): Promise<DeactivateMerchantFeeOverrideResponse> => {
  const response = await apiClient.post<DeactivateMerchantFeeOverrideResponse>(`${FEE_BASE_URL}/merchant-fee-overrides/${id}/deactivate`);
  return response.data;
};

// Platform Wallet Fee Settings API
export const getPlatformWalletFeeSettings = async (): Promise<PlatformWalletFeeSettingsResponse> => {
  const response = await apiClient.get<PlatformWalletFeeSettingsResponse>(`${ADMIN_BASE_URL}/platform/wallet-fee-settings`);
  return response.data;
};

export const updatePlatformWalletFeeSettings = async (data: UpdatePlatformWalletFeeSettingsRequest): Promise<PlatformWalletFeeSettingsResponse> => {
  const response = await apiClient.patch<PlatformWalletFeeSettingsResponse>(`${ADMIN_BASE_URL}/platform/wallet-fee-settings`, data);
  return response.data;
};

/**
 * Delete a merchant and all related data
 * Permanently deletes the merchant account and all associated data
 */
export const deleteMerchant = async (merchantId: string): Promise<DeleteMerchantResponse> => {
  const response = await apiClient.delete<DeleteMerchantResponse>(`${ADMIN_BASE_URL}/merchants/${merchantId}`);
  return response.data;
};

// ----------------------------------------------------------------------
// GATEWAY ACCESS & MERCHANT STATUS API
// ----------------------------------------------------------------------

/**
 * Get detailed list of all global gateways
 */
export const getGlobalGateways = async (): Promise<GetGlobalGatewaysResponse> => {
  const response = await apiClient.get<GetGlobalGatewaysResponse>(`${ADMIN_BASE_URL}/gateways`);
  return response.data;
};

/**
 * Update global settings for a specific gateway
 */
export const updateGlobalGateway = async (
  code: string,
  data: UpdateGlobalGatewayRequest
): Promise<UpdateGlobalGatewayResponse> => {
  const response = await apiClient.put<UpdateGlobalGatewayResponse>(`${ADMIN_BASE_URL}/gateways/${code}`, data);
  return response.data;
};

/**
 * Change a merchant's account status (e.g., Ban or Suspend)
 */
export const updateMerchantStatus = async (
  merchantId: string,
  data: MerchantStatusUpdate
): Promise<UpdateMerchantStatusResponse> => {
  const response = await apiClient.put<UpdateMerchantStatusResponse>(
    `${ADMIN_BASE_URL}/merchants/${merchantId}/status`,
    data
  );
  return response.data;
};

/**
 * Toggle specific high-level capabilities for a merchant
 */
export const updateMerchantCapabilities = async (
  merchantId: string,
  data: MerchantCapabilitiesUpdate
): Promise<UpdateMerchantCapabilitiesResponse> => {
  const response = await apiClient.put<UpdateMerchantCapabilitiesResponse>(
    `${ADMIN_BASE_URL}/merchants/${merchantId}/capabilities`,
    data
  );
  return response.data;
};

/**
 * Configure a specific gateway for a specific merchant
 */
export const updateMerchantGatewayConfig = async (
  merchantId: string,
  data: MerchantGatewayConfigUpdate
): Promise<UpdateMerchantGatewayConfigResponse> => {
  const response = await apiClient.put<UpdateMerchantGatewayConfigResponse>(
    `${ADMIN_BASE_URL}/merchants/${merchantId}/gateways`,
    data
  );
  return response.data;
};

// Legacy API (keeping for backward compatibility)
export const adminApi = {
  getStats: async (): Promise<SystemStats> => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`);

    if (!response.ok) {
      throw new Error("Failed to fetch admin stats");
    }

    return response.json();
  },
};
