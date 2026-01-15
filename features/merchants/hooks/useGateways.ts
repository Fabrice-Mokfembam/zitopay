import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { configureGateway, setFeeOverride, getGateways } from '../api/index';
import type {
    ConfigureGatewayRequest,
    ConfigureGatewayResponse,
    SetFeeOverrideRequest,
    SetFeeOverrideResponse,
    GetGatewaysResponse,
} from '../types/index';

/**
 * Hook to fetch configured gateways
 */
export const useGetGateways = (
    merchantId: string,
    enabled: boolean = true
): UseQueryResult<GetGatewaysResponse, Error> => {
    return useQuery({
        queryKey: ['merchants', merchantId, 'gateways'],
        queryFn: () => getGateways(merchantId),
        enabled: !!merchantId && enabled,
    });
};

/**
 * Hook for configuring payment gateway settings
 */
export const useConfigureGateway = (
    merchantId: string
): UseMutationResult<ConfigureGatewayResponse, Error, ConfigureGatewayRequest> => {
    return useMutation({
        mutationFn: (data: ConfigureGatewayRequest) => configureGateway(merchantId, data),
    });
};

/**
 * Hook for setting custom fee structure for a gateway
 */
export const useSetFeeOverride = (
    merchantId: string
): UseMutationResult<SetFeeOverrideResponse, Error, SetFeeOverrideRequest> => {
    return useMutation({
        mutationFn: (data: SetFeeOverrideRequest) => setFeeOverride(merchantId, data),
    });
};
