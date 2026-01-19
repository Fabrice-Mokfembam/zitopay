import { apiClient } from '@/lib/apiClient';
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
    AddDomainRequest,
    AddDomainResponse,
    VerifyDomainResponse,
    GetDomainsResponse,
    GetGatewaysResponse,
    ConfigureGatewayRequest,
    ConfigureGatewayResponse,
    SetFeeOverrideRequest,
    SetFeeOverrideResponse,
    RegenerateSandboxCredentialsResponse,
    RegenerateProductionCredentialsResponse,
    GetPendingKYBSubmissionsResponse,
    DashboardStatsResponse,
    RecentTransactionsResponse,
    TopUpRequest,
    TopUpResponse,
    WithdrawRequest,
    WithdrawResponse,
    WalletOperationsResponse,
} from '../types/index';

const MERCHANT_BASE_URL = '/merchant/v1/merchants';

/**
 * Create a new merchant account
 * Automatically creates sandbox credentials
 */
export const createMerchant = async (
    data: CreateMerchantRequest
): Promise<CreateMerchantResponse> => {
    const response = await apiClient.post<CreateMerchantResponse>(
        MERCHANT_BASE_URL,
        data
    );
    return response.data;
};

/**
 * Get all merchants that the authenticated user has access to
 */
export const getUserMerchants = async (): Promise<GetUserMerchantsResponse> => {
    const response = await apiClient.get<GetUserMerchantsResponse>(
        MERCHANT_BASE_URL
    );
    return response.data;
};

/**
 * Get the first merchant account associated with the authenticated user
 * Returns 404 if user has no merchant accounts
 */
export const getFirstMerchant = async (): Promise<GetFirstMerchantResponse> => {
    const response = await apiClient.get<GetFirstMerchantResponse>(
        `${MERCHANT_BASE_URL}/first`
    );
    return response.data;
};

/**
 * Get merchant profile details
 */
export const getMerchant = async (
    merchantId: string
): Promise<GetMerchantResponse> => {
    const response = await apiClient.get<GetMerchantResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}`
    );
    return response.data;
};

/**
 * Update merchant profile information
 */
export const updateMerchant = async (
    merchantId: string,
    data: UpdateMerchantRequest
): Promise<UpdateMerchantResponse> => {
    const response = await apiClient.put<UpdateMerchantResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}`,
        data
    );
    return response.data;
};

/**
 * Submit KYB documents for verification
 */
export const submitKYB = async (
    merchantId: string
): Promise<SubmitKYBResponse> => {
    const response = await apiClient.post<SubmitKYBResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/kyb/submit`
    );
    return response.data;
};

/**
 * Approve merchant's KYB submission (Admin only)
 */
export const approveKYB = async (
    merchantId: string
): Promise<ApproveKYBResponse> => {
    const response = await apiClient.post<ApproveKYBResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/kyb/approve`
    );
    return response.data;
};

/**
 * Reject merchant's KYB submission (Admin only)
 */
export const rejectKYB = async (
    merchantId: string
): Promise<RejectKYBResponse> => {
    const response = await apiClient.post<RejectKYBResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/kyb/reject`
    );
    return response.data;
};

/**
 * Request production environment access
 */
export const requestProduction = async (
    merchantId: string
): Promise<RequestProductionResponse> => {
    const response = await apiClient.post<RequestProductionResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/production-request`
    );
    return response.data;
};

/**
 * Approve production access and generate production credentials (Admin only)
 */
export const approveProduction = async (
    merchantId: string
): Promise<ApproveProductionResponse> => {
    const response = await apiClient.post<ApproveProductionResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/production-approve`
    );
    return response.data;
};

/**
 * Suspend merchant's sandbox environment (Admin only)
 */
export const suspendSandbox = async (
    merchantId: string
): Promise<SuspendSandboxResponse> => {
    const response = await apiClient.post<SuspendSandboxResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/sandbox/suspend`
    );
    return response.data;
};

/**
 * Reactivate merchant's sandbox environment (Admin only)
 */
export const reactivateSandbox = async (
    merchantId: string
): Promise<ReactivateSandboxResponse> => {
    const response = await apiClient.post<ReactivateSandboxResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/sandbox/reactivate`
    );
    return response.data;
};

/**
 * Suspend merchant's production environment (Admin only)
 */
export const suspendProduction = async (
    merchantId: string
): Promise<SuspendProductionResponse> => {
    const response = await apiClient.post<SuspendProductionResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/production/suspend`
    );
    return response.data;
};

/**
 * Reactivate merchant's production environment (Admin only)
 */
export const reactivateProduction = async (
    merchantId: string
): Promise<ReactivateProductionResponse> => {
    const response = await apiClient.post<ReactivateProductionResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/production/reactivate`
    );
    return response.data;
};

/**
 * Add a domain for verification
 */
export const addDomain = async (
    merchantId: string,
    data: AddDomainRequest
): Promise<AddDomainResponse> => {
    const response = await apiClient.post<AddDomainResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/domains`,
        data
    );
    return response.data;
};

/**
 * Verify domain ownership via DNS TXT record
 */
export const verifyDomain = async (
    merchantId: string,
    domainId: string
): Promise<VerifyDomainResponse> => {
    const response = await apiClient.post<VerifyDomainResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/domains/${domainId}/verify`
    );
    return response.data;
};

/**
 * Get all domains for a merchant
 */
export const getDomains = async (
    merchantId: string
): Promise<GetDomainsResponse> => {
    const response = await apiClient.get<GetDomainsResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/domains`
    );
    return response.data;
};

/**
 * Get configured gateways for a merchant
 */
export const getGateways = async (
    merchantId: string
): Promise<GetGatewaysResponse> => {
    const response = await apiClient.get<GetGatewaysResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/gateways`
    );
    return response.data;
};

/**
 * Configure payment gateway settings
 */
export const configureGateway = async (
    merchantId: string,
    data: ConfigureGatewayRequest
): Promise<ConfigureGatewayResponse> => {
    const response = await apiClient.post<ConfigureGatewayResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/gateways`,
        data
    );
    return response.data;
};

/**
 * Set custom fee structure for a gateway
 */
export const setFeeOverride = async (
    merchantId: string,
    data: SetFeeOverrideRequest
): Promise<SetFeeOverrideResponse> => {
    const response = await apiClient.post<SetFeeOverrideResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/fee-overrides`,
        data
    );
    return response.data;
};

/**
 * Regenerate sandbox API credentials
 * WARNING: Old credentials will be invalidated immediately
 */
export const regenerateSandboxCredentials = async (
    merchantId: string
): Promise<RegenerateSandboxCredentialsResponse> => {
    const response = await apiClient.post<RegenerateSandboxCredentialsResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/regenerate-sandbox-credentials`
    );
    return response.data;
};

/**
 * Regenerate production API credentials
 * WARNING: Old credentials will be invalidated immediately
 * Requires production environment to be ACTIVE
 */
export const regenerateProductionCredentials = async (
    merchantId: string
): Promise<RegenerateProductionCredentialsResponse> => {
    const response = await apiClient.post<RegenerateProductionCredentialsResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/regenerate-production-credentials`
    );
    return response.data;
};

/**
 * Get all pending KYB submissions (Admin only)
 * Returns merchants with kycStatus = 'PENDING'
 */
export const getPendingKYBSubmissions = async (): Promise<GetPendingKYBSubmissionsResponse> => {
    const response = await apiClient.get<GetPendingKYBSubmissionsResponse>(
        '/merchant/v1/admin/pending-kyb'
    );
    return response.data;
};

/**
 * Get Dashboard Overview Stats
 * Returns 5 key metric cards for the dashboard
 */
export const getDashboardStats = async (
    merchantId: string,
    period: '7d' | '30d' | '90d' | 'all' = '30d'
): Promise<DashboardStatsResponse> => {
    const response = await apiClient.get<DashboardStatsResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/dashboard/stats`,
        {
            params: { period },
        }
    );
    return response.data;
};

/**
 * Get Recent Transactions
 * Returns the most recent transactions for dashboard display
 */
export const getRecentTransactions = async (
    merchantId: string,
    limit: number = 10,
    type?: 'collection' | 'payout' | 'refund'
): Promise<RecentTransactionsResponse> => {
    const params: Record<string, string> = {
        limit: limit.toString(),
    };
    if (type) {
        params.type = type;
    }

    const response = await apiClient.get<RecentTransactionsResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/dashboard/transactions/recent`,
        {
            params,
        }
    );
    return response.data;
};

/**
 * Top Up Wallet
 * Add money to merchant wallet via mobile money collection
 */
export const topUpWallet = async (
    merchantId: string,
    data: TopUpRequest
): Promise<TopUpResponse> => {
    const response = await apiClient.post<TopUpResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/wallet/topup`,
        data
    );
    return response.data;
};

/**
 * Withdraw from Wallet
 * Withdraw money from merchant wallet to a mobile number
 */
export const withdrawFromWallet = async (
    merchantId: string,
    data: WithdrawRequest
): Promise<WithdrawResponse> => {
    const response = await apiClient.post<WithdrawResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/wallet/withdraw`,
        data
    );
    return response.data;
};

/**
 * Get Wallet Operation History
 * Retrieve history of all wallet top-ups and withdrawals
 */
export const getWalletOperations = async (
    merchantId: string,
    environment?: 'sandbox' | 'production',
    limit: number = 50
): Promise<WalletOperationsResponse> => {
    const params: Record<string, string> = {
        limit: limit.toString(),
    };
    if (environment) {
        params.environment = environment;
    }

    const response = await apiClient.get<WalletOperationsResponse>(
        `${MERCHANT_BASE_URL}/${merchantId}/wallet/operations`,
        {
            params,
        }
    );
    return response.data;
};
