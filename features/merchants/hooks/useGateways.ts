import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { configureGateway, setFeeOverride } from '../api/index';
import type {
    ConfigureGatewayRequest,
    ConfigureGatewayResponse,
    SetFeeOverrideRequest,
    SetFeeOverrideResponse,
} from '../types/index';

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
