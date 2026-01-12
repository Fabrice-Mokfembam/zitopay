import { apiClient } from '@/lib/apiClient';
import type {
    RegisterRequest,
    RegisterResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    ResendVerificationRequest,
    ResendVerificationResponse,
    LoginRequest,
    LoginResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    VerifyResetCodeRequest,
    VerifyResetCodeResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    GetCurrentUserResponse,
    LogoutResponse,
} from '../types/index';

/**
 * Register a new user account
 * Sends verification code to email
 */
export const register = async (credentials: RegisterRequest): Promise<RegisterResponse> => {
    const { data } = await apiClient.post<RegisterResponse>('/public/v1/auth/register', credentials);
    return data;
};

/**
 * Verify email with 6-digit code
 * Returns user data and tokens
 */
export const verifyEmail = async (payload: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
    const { data } = await apiClient.post<VerifyEmailResponse>('/public/v1/auth/verify-email', payload);
    return data;
};

/**
 * Resend email verification code
 */
export const resendVerificationCode = async (payload: ResendVerificationRequest): Promise<ResendVerificationResponse> => {
    const { data } = await apiClient.post<ResendVerificationResponse>('/public/v1/auth/resend-verification', payload);
    return data;
};

/**
 * Login with email and password
 * Returns user data and tokens
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/public/v1/auth/login', credentials);
    return data;
};

/**
 * Request password reset code
 * Sends 6-digit code to email
 */
export const forgotPassword = async (payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    const { data } = await apiClient.post<ForgotPasswordResponse>('/public/v1/auth/forgot-password', payload);
    return data;
};

/**
 * Verify password reset code
 * Optional step before resetting password
 */
export const verifyResetCode = async (payload: VerifyResetCodeRequest): Promise<VerifyResetCodeResponse> => {
    const { data } = await apiClient.post<VerifyResetCodeResponse>('/public/v1/auth/verify-reset-code', payload);
    return data;
};

/**
 * Reset password with code and new password
 */
export const resetPassword = async (payload: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    const { data } = await apiClient.post<ResetPasswordResponse>('/public/v1/auth/reset-password', payload);
    return data;
};

/**
 * Resend password reset code
 */
export const resendResetCode = async (payload: ResendVerificationRequest): Promise<ResendVerificationResponse> => {
    const { data } = await apiClient.post<ResendVerificationResponse>('/public/v1/auth/resend-reset-code', payload);
    return data;
};

/**
 * Get current authenticated user
 * Requires valid access token
 */
export const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
    const { data } = await apiClient.get<GetCurrentUserResponse>('/auth/v1/me');
    return data;
};

/**
 * Logout current user
 * Invalidates access token
 */
export const logout = async (): Promise<LogoutResponse> => {
    const { data } = await apiClient.post<LogoutResponse>('/auth/v1/logout');
    return data;
};
