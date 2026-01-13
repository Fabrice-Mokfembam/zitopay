import { useMutation, useQuery, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { addDomain, verifyDomain, getDomains } from '../api/index';
import type {
    AddDomainRequest,
    AddDomainResponse,
    VerifyDomainResponse,
    GetDomainsResponse,
} from '../types/index';

/**
 * Hook for adding a domain for verification
 */
export const useAddDomain = (
    merchantId: string
): UseMutationResult<AddDomainResponse, Error, AddDomainRequest> => {
    return useMutation({
        mutationFn: (data: AddDomainRequest) => addDomain(merchantId, data),
    });
};

/**
 * Hook for verifying domain ownership via DNS TXT record
 */
export const useVerifyDomain = (
    merchantId: string,
    domainId: string
): UseMutationResult<VerifyDomainResponse, Error, void> => {
    return useMutation({
        mutationFn: () => verifyDomain(merchantId, domainId),
    });
};

/**
 * Hook for fetching all domains for a merchant
 */
export const useGetDomains = (
    merchantId: string,
    enabled: boolean = true
): UseQueryResult<GetDomainsResponse, Error> => {
    return useQuery({
        queryKey: ['domains', merchantId],
        queryFn: () => getDomains(merchantId),
        enabled: enabled && !!merchantId,
    });
};
