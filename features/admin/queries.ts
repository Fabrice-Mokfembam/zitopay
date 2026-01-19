"use client";

import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { 
  adminApi, 
  getPlatformMetrics, 
  getHealthMetrics, 
  getGatewayPerformance, 
  getAllMerchantUsers, 
  getAllTransactions,
  getFeeVersions,
  createFeeVersion,
  activateFeeVersion,
  getFeeRules,
  getFeeRule,
  createFeeRule,
  updateFeeRule,
  deactivateFeeRule,
  getFeeTiers,
  createFeeTier,
  updateFeeTier,
  getMerchantFeeOverrides,
  createMerchantFeeOverride,
  updateMerchantFeeOverride,
  deactivateMerchantFeeOverride,
  getPlatformWalletFeeSettings,
  updatePlatformWalletFeeSettings
} from "./api";
import { 
  PlatformMetricsResponse, 
  HealthMetricsResponse, 
  GatewayPerformanceResponse,
  MerchantUsersResponse,
  AdminTransactionsResponse,
  AdminTransactionFilters,
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
  UpdatePlatformWalletFeeSettingsRequest
} from "./types";

/**
 * Legacy hook for admin stats (keeping for backward compatibility)
 */
export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => adminApi.getStats(),
  });
}

/**
 * Hook for fetching platform metrics
 * Returns total merchants, active merchants, platform revenue, and total volume
 */
export function usePlatformMetrics(): UseQueryResult<PlatformMetricsResponse, Error> {
  return useQuery({
    queryKey: ["admin", "dashboard", "platform-metrics"],
    queryFn: () => getPlatformMetrics(),
    refetchInterval: 30000, // Refetch every 30 seconds (matches backend cache TTL)
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}

/**
 * Hook for fetching health metrics
 * Returns success rate, failed transactions, pending KYB, and recon issues
 */
export function useHealthMetrics(): UseQueryResult<HealthMetricsResponse, Error> {
  return useQuery({
    queryKey: ["admin", "dashboard", "health-metrics"],
    queryFn: () => getHealthMetrics(),
    refetchInterval: 30000, // Refetch every 30 seconds (matches backend cache TTL)
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}

/**
 * Hook for fetching gateway performance metrics
 * Returns performance data for each gateway (MTN, Orange, etc.)
 */
export function useGatewayPerformance(): UseQueryResult<GatewayPerformanceResponse, Error> {
  return useQuery({
    queryKey: ["admin", "dashboard", "gateway-performance"],
    queryFn: () => getGatewayPerformance(),
    refetchInterval: 30000, // Refetch every 30 seconds (matches backend cache TTL)
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}

/**
 * Hook for fetching all merchant users
 * Returns comprehensive list of all merchant-user relationships
 */
export function useMerchantUsers(): UseQueryResult<MerchantUsersResponse, Error> {
  return useQuery({
    queryKey: ["admin", "merchant-users"],
    queryFn: () => getAllMerchantUsers(),
    refetchInterval: 60000, // Refetch every 60 seconds
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}

/**
 * Hook for fetching all transactions
 * Returns comprehensive list of all transactions with filters and pagination
 */
export function useAdminTransactions(
  filters?: AdminTransactionFilters,
  enabled: boolean = true
): UseQueryResult<AdminTransactionsResponse, Error> {
  return useQuery({
    queryKey: ["admin", "transactions", filters],
    queryFn: () => getAllTransactions(filters),
    enabled,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 30000, // Consider data stale after 30 seconds
  });
}

// Fee Versions Hooks
export function useFeeVersions(): UseQueryResult<FeeVersionsResponse, Error> {
  return useQuery({
    queryKey: ["admin", "fee-versions"],
    queryFn: () => getFeeVersions(),
    staleTime: 30000,
  });
}

export function useCreateFeeVersion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFeeVersionRequest) => createFeeVersion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "fee-versions"] });
    },
  });
}

export function useActivateFeeVersion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => activateFeeVersion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "fee-versions"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "fee-rules"] });
    },
  });
}

// Fee Rules Hooks
export function useFeeRules(filters?: FeeRuleFilters): UseQueryResult<FeeRulesResponse, Error> {
  return useQuery({
    queryKey: ["admin", "fee-rules", filters],
    queryFn: () => getFeeRules(filters),
    staleTime: 30000,
  });
}

export function useFeeRule(id: string, enabled: boolean = true): UseQueryResult<FeeRuleResponse, Error> {
  return useQuery({
    queryKey: ["admin", "fee-rules", id],
    queryFn: () => getFeeRule(id),
    enabled: enabled && !!id,
    staleTime: 30000,
  });
}

export function useCreateFeeRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFeeRuleRequest) => createFeeRule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "fee-rules"] });
    },
  });
}

export function useUpdateFeeRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFeeRuleRequest }) => updateFeeRule(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "fee-rules"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "fee-rules", variables.id] });
    },
  });
}

export function useDeactivateFeeRule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deactivateFeeRule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "fee-rules"] });
    },
  });
}

// Fee Tiers Hooks
export function useFeeTiers(feeRuleId: string, enabled: boolean = true): UseQueryResult<FeeTiersResponse, Error> {
  return useQuery({
    queryKey: ["admin", "fee-tiers", feeRuleId],
    queryFn: () => getFeeTiers(feeRuleId),
    enabled: enabled && !!feeRuleId,
    staleTime: 30000,
  });
}

export function useCreateFeeTier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ feeRuleId, data }: { feeRuleId: string; data: CreateFeeTierRequest }) => createFeeTier(feeRuleId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "fee-tiers", variables.feeRuleId] });
    },
  });
}

export function useUpdateFeeTier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFeeTierRequest }) => updateFeeTier(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "fee-tiers"] });
    },
  });
}

// Merchant Fee Overrides Hooks
export function useMerchantFeeOverrides(filters?: MerchantFeeOverrideFilters): UseQueryResult<MerchantFeeOverridesResponse, Error> {
  return useQuery({
    queryKey: ["admin", "merchant-fee-overrides", filters],
    queryFn: () => getMerchantFeeOverrides(filters),
    staleTime: 30000,
  });
}

export function useCreateMerchantFeeOverride() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMerchantFeeOverrideRequest) => createMerchantFeeOverride(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "merchant-fee-overrides"] });
    },
  });
}

export function useUpdateMerchantFeeOverride() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMerchantFeeOverrideRequest }) => updateMerchantFeeOverride(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "merchant-fee-overrides"] });
    },
  });
}

export function useDeactivateMerchantFeeOverride() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deactivateMerchantFeeOverride(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "merchant-fee-overrides"] });
    },
  });
}

// Platform Wallet Fee Settings Hooks
export function usePlatformWalletFeeSettings(): UseQueryResult<PlatformWalletFeeSettingsResponse, Error> {
  return useQuery({
    queryKey: ["admin", "platform-wallet-fee-settings"],
    queryFn: () => getPlatformWalletFeeSettings(),
    staleTime: 30000,
  });
}

export function useUpdatePlatformWalletFeeSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePlatformWalletFeeSettingsRequest) => updatePlatformWalletFeeSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "platform-wallet-fee-settings"] });
    },
  });
}
