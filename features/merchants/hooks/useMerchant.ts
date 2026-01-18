import { useMutation, useQuery, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import {
    createMerchant,
    getUserMerchants,
    getMerchant,
    getFirstMerchant,
    updateMerchant,
    submitKYB,
    approveKYB,
    rejectKYB,
    requestProduction,
    approveProduction,
    suspendSandbox,
    reactivateSandbox,
    suspendProduction,
    reactivateProduction,
    regenerateSandboxCredentials,
    regenerateProductionCredentials,
    getPendingKYBSubmissions,
} from '../api/index';
import type {
    CreateMerchantRequest,
    CreateMerchantResponse,
    GetMerchantResponse,
    GetFirstMerchantResponse,
    GetUserMerchantsResponse,
    UpdateMerchantRequest,
    UpdateMerchantResponse,
    SubmitKYBResponse,
    ApproveKYBResponse,
    RejectKYBResponse,
    RequestProductionResponse,
    ApproveProductionResponse,
    SuspendSandboxResponse,
    ReactivateSandboxResponse,
    SuspendProductionResponse,
    ReactivateProductionResponse,
    RegenerateSandboxCredentialsResponse,
    RegenerateProductionCredentialsResponse,
    GetPendingKYBSubmissionsResponse,
} from '../types/index';

/**
 * Hook for creating a new merchant account
 * Automatically creates sandbox credentials
 */
export const useCreateMerchant = (): UseMutationResult<
    CreateMerchantResponse,
    Error,
    CreateMerchantRequest
> => {
    return useMutation({
        mutationFn: (data: CreateMerchantRequest) => createMerchant(data),
    });
};

/**
 * Hook for fetching all merchants that the authenticated user has access to
 */
export const useGetUserMerchants = (
    enabled: boolean = true
): UseQueryResult<GetUserMerchantsResponse, Error> => {
    return useQuery({
        queryKey: ['merchants'],
        queryFn: () => getUserMerchants(),
        enabled: enabled,
    });
};

/**
 * Hook for fetching merchant profile details
 */
export const useGetMerchant = (
    merchantId: string,
    enabled: boolean = true
): UseQueryResult<GetMerchantResponse, Error> => {
    return useQuery({
        queryKey: ['merchant', merchantId],
        queryFn: () => getMerchant(merchantId),
        enabled: enabled && !!merchantId,
    });
};

/**
 * Hook for fetching the first merchant account associated with the authenticated user
 * Returns 404 if user has no merchant accounts
 * Refetches on mount and when enabled state changes to ensure fresh data
 */
export const useGetFirstMerchant = (
    enabled: boolean = true
): UseQueryResult<GetFirstMerchantResponse, Error> => {
    return useQuery({
        queryKey: ['merchant', 'first'],
        queryFn: () => getFirstMerchant(),
        enabled: enabled,
        refetchOnMount: true, // Always refetch when component mounts
        staleTime: 0, // Consider data stale immediately to ensure fresh fetch on app load
    });
};

/**
 * Hook for updating merchant profile information
 */
export const useUpdateMerchant = (
    merchantId: string
): UseMutationResult<UpdateMerchantResponse, Error, UpdateMerchantRequest> => {
    return useMutation({
        mutationFn: (data: UpdateMerchantRequest) => updateMerchant(merchantId, data),
    });
};

/**
 * Hook for submitting KYB documents for verification
 */
export const useSubmitKYB = (
    merchantId: string
): UseMutationResult<SubmitKYBResponse, Error, void> => {
    return useMutation({
        mutationFn: () => submitKYB(merchantId),
    });
};

/**
 * Hook for approving merchant's KYB submission (Admin only)
 */
export const useApproveKYB = (
    merchantId: string
): UseMutationResult<ApproveKYBResponse, Error, void> => {
    return useMutation({
        mutationFn: () => approveKYB(merchantId),
    });
};

/**
 * Hook for rejecting merchant's KYB submission (Admin only)
 */
export const useRejectKYB = (
    merchantId: string
): UseMutationResult<RejectKYBResponse, Error, void> => {
    return useMutation({
        mutationFn: () => rejectKYB(merchantId),
    });
};

/**
 * Hook for requesting production environment access
 */
export const useRequestProduction = (
    merchantId: string
): UseMutationResult<RequestProductionResponse, Error, void> => {
    return useMutation({
        mutationFn: () => requestProduction(merchantId),
    });
};

/**
 * Hook for approving production access (Admin only)
 * Generates production credentials
 */
export const useApproveProduction = (
    merchantId: string
): UseMutationResult<ApproveProductionResponse, Error, void> => {
    return useMutation({
        mutationFn: () => approveProduction(merchantId),
    });
};

/**
 * Hook for suspending merchant's sandbox environment (Admin only)
 */
export const useSuspendSandbox = (
    merchantId: string
): UseMutationResult<SuspendSandboxResponse, Error, void> => {
    return useMutation({
        mutationFn: () => suspendSandbox(merchantId),
    });
};

/**
 * Hook for reactivating merchant's sandbox environment (Admin only)
 */
export const useReactivateSandbox = (
    merchantId: string
): UseMutationResult<ReactivateSandboxResponse, Error, void> => {
    return useMutation({
        mutationFn: () => reactivateSandbox(merchantId),
    });
};

/**
 * Hook for suspending merchant's production environment (Admin only)
 */
export const useSuspendProduction = (
    merchantId: string
): UseMutationResult<SuspendProductionResponse, Error, void> => {
    return useMutation({
        mutationFn: () => suspendProduction(merchantId),
    });
};

/**
 * Hook for reactivating merchant's production environment (Admin only)
 */
export const useReactivateProduction = (
    merchantId: string
): UseMutationResult<ReactivateProductionResponse, Error, void> => {
    return useMutation({
        mutationFn: () => reactivateProduction(merchantId),
    });
};

/**
 * Hook for regenerating sandbox API credentials
 * WARNING: Old credentials will be invalidated immediately
 */
export const useRegenerateSandboxCredentials = (
    merchantId: string
): UseMutationResult<RegenerateSandboxCredentialsResponse, Error, void> => {
    return useMutation({
        mutationFn: () => regenerateSandboxCredentials(merchantId),
    });
};

/**
 * Hook for regenerating production API credentials
 * WARNING: Old credentials will be invalidated immediately
 * Requires production environment to be ACTIVE
 */
export const useRegenerateProductionCredentials = (
    merchantId: string
): UseMutationResult<RegenerateProductionCredentialsResponse, Error, void> => {
    return useMutation({
        mutationFn: () => regenerateProductionCredentials(merchantId),
    });
};

/**
 * Hook for fetching pending KYB submissions (Admin only)
 * Returns all merchants with kycStatus = 'PENDING'
 */
export const useGetPendingKYBSubmissions = (): UseQueryResult<GetPendingKYBSubmissionsResponse, Error> => {
    return useQuery({
        queryKey: ['pending-kyb-submissions'],
        queryFn: getPendingKYBSubmissions,
    });
};
