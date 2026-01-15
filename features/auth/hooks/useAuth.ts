import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import { register, verifyEmail, resendVerificationCode, login, adminLogin, logout } from '../api/index';
// storeAuthData/clearAuthData removed as we use context now
import type {
    RegisterRequest,
    RegisterResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    ResendVerificationRequest,
    ResendVerificationResponse,
    LoginRequest,
    LoginResponse,
    LogoutResponse,
} from '../types/index';

/**
 * Hook for user registration
 * Sends verification code to email
 */
export const useRegister = (): UseMutationResult<RegisterResponse, Error, RegisterRequest> => {
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: RegisterRequest) => register(credentials),
        onSuccess: (_, variables) => {
            // Navigate to verification page with email
            router.push(`/verify-email-code?email=${encodeURIComponent(variables.email)}`);
        },
    });
};

/**
 * Hook for email verification
 * Stores tokens and navigates to success page
 */
export const useVerifyEmail = (): UseMutationResult<VerifyEmailResponse, Error, VerifyEmailRequest> => {
    const router = useRouter();
    const { login: authLogin } = useAuthContext();

    return useMutation({
        mutationFn: (payload: VerifyEmailRequest) => verifyEmail(payload),
        onSuccess: (data) => {
            // Update auth context (syncs state + storage)
            authLogin({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });

            // Navigate to success page
            router.push('/email-verified');
        },
    });
};

/**
 * Hook for resending verification code
 */
export const useResendVerification = (): UseMutationResult<ResendVerificationResponse, Error, ResendVerificationRequest> => {
    return useMutation({
        mutationFn: (payload: ResendVerificationRequest) => resendVerificationCode(payload),
    });
};

/**
 * Hook for user login
 * Stores tokens and navigates to dashboard
 */
export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
    const router = useRouter();
    const { login: authLogin } = useAuthContext();

    return useMutation({
        mutationFn: (credentials: LoginRequest) => login(credentials),
        onSuccess: (data) => {
            // Update auth context (syncs state + storage)
            authLogin({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });

            // Navigate to dashboard
            router.push('/dashboard');
        },
    });
};

/**
 * Hook for admin login
 * Stores tokens and navigates to admin dashboard
 * Only allows users with 'admin' role
 */
export const useAdminLogin = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
    const router = useRouter();
    const { login: authLogin } = useAuthContext();

    return useMutation({
        mutationFn: (credentials: LoginRequest) => adminLogin(credentials),
        onSuccess: (data) => {
            // Update auth context (syncs state + storage)
            authLogin({
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });

            // Navigate to admin dashboard
            router.push('/admin/dashboard');
        },
    });
};


/**
 * Hook for user logout
 * Clears tokens and navigates to login
 */
export const useLogout = (): UseMutationResult<LogoutResponse, Error, void> => {
    const router = useRouter();
    const { logout: authLogout } = useAuthContext();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            // Clear auth context (clears state + storage)
            authLogout();

            // Navigate to login page
            router.push('/login');
        },
        onError: () => {
            // Even if API call fails, clear local data and redirect
            authLogout();
            router.push('/login');
        },
    });
};
