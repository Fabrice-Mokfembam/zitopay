// Merchant API Types

// Merchant States
export type KYCStatus = 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type SandboxState = 'ACTIVE' | 'SUSPENDED';
export type ProductionState = 'NOT_REQUESTED' | 'PENDING_APPROVAL' | 'ACTIVE' | 'SUSPENDED';

// Merchant Object
export interface Merchant {
    id: string;
    businessName: string;
    email: string;
    phone: string;
    businessType: string;
    country: string;
    enabled: boolean;
    kycStatus: KYCStatus;
    sandboxState: SandboxState;
    productionState: ProductionState;
    sandboxApiKey: string;
    productionApiKey?: string;
    rateLimitPerMinute: number;
    userRole?: 'owner' | 'admin' | 'viewer';  // Role in merchant (for getUserMerchants)
    createdAt: string;
    updatedAt: string;
}

// Domain Object
export interface Domain {
    id: string;
    merchantId: string;
    domain: string;
    verified: boolean;
    verificationToken: string;
    verifiedAt?: string;
    createdAt: string;
}

// Gateway Configuration
export interface GatewayConfig {
    id: string;
    merchantId: string;
    gateway: string;
    enabled: boolean;
    minAmount: string;
    maxAmount: string;
    dailyLimit: string;
    createdAt: string;
    updatedAt: string;
}

// Fee Override
export interface FeeOverride {
    id: string;
    merchantId: string;
    gateway: string;
    percentage: string;
    flatFee: string;
    createdAt: string;
    updatedAt: string;
}

// Request Types
export interface CreateMerchantRequest {
    businessName: string;
    email?: string;
    phone?: string;
    businessType?: string;
    country?: string;
}

export interface UpdateMerchantRequest {
    businessName?: string;
    email?: string;
    phone?: string;
    businessType?: string;
    country?: string;
}

export interface AddDomainRequest {
    domain: string;
}

export interface ConfigureGatewayRequest {
    gateway: string;
    enabled?: boolean;
    minAmount?: string;
    maxAmount?: string;
    dailyLimit?: string;
}

export interface SetFeeOverrideRequest {
    gateway: string;
    percentage?: string;
    flatFee?: string;
}

// Response Types
export interface CreateMerchantResponse {
    merchant: {
        id: string;
        businessName: string;
        sandboxApiKey: string;
        sandboxSecretKey: string;
    };
}

export interface GetMerchantResponse {
    merchant: Merchant;
}

export interface GetUserMerchantsResponse {
    merchants: Merchant[];
}

export interface UpdateMerchantResponse {
    merchant: Merchant;
}

export interface SubmitKYBResponse {
    merchant: Merchant;
}

export interface ApproveKYBResponse {
    merchant: Merchant;
}

export interface RejectKYBResponse {
    merchant: Merchant;
}

export interface RequestProductionResponse {
    merchant: Merchant;
}

export interface ApproveProductionResponse {
    merchant: Merchant;
    productionApiKey: string;
    productionSecretKey: string;
}

export interface SuspendSandboxResponse {
    merchant: Merchant;
}

export interface ReactivateSandboxResponse {
    merchant: Merchant;
}

export interface SuspendProductionResponse {
    merchant: Merchant;
}

export interface ReactivateProductionResponse {
    merchant: Merchant;
}

export interface AddDomainResponse {
    domain: {
        id: string;
        domain: string;
        verificationToken: string;
    };
}

export interface VerifyDomainResponse {
    domain: Domain;
}

export interface GetDomainsResponse {
    domains: Domain[];
}

export interface ConfigureGatewayResponse {
    gateway: GatewayConfig;
}

export interface SetFeeOverrideResponse {
    feeOverride: FeeOverride;
}

export interface RegenerateSandboxCredentialsResponse {
    message: string;
    sandboxApiKey: string;
    sandboxSecretKey: string;
    warning: string;
}

export interface RegenerateProductionCredentialsResponse {
    message: string;
    productionApiKey: string;
    productionSecretKey: string;
    warning: string;
}
