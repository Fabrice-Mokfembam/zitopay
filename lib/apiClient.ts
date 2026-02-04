import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { API_BASE_URL } from '@/constants/api';
import { getAccessToken, getRefreshToken, getAuthData, storeAuthData, clearAuthData } from '@/features/auth/utils/storage';

/**
 * Main API client instance
 * Configured with base URL and JSON headers
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds timeout
});

// Log API base URL in development for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('API Base URL:', API_BASE_URL);
}

/**
 * Request interceptor
 * Automatically adds Authorization header to all requests
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();

        // Public endpoints that don't need authentication
        const publicEndpoints = [
            '/public/v1/auth/register',
            '/public/v1/auth/login',
            '/public/v1/auth/verify-email',
            '/public/v1/auth/resend-verification',
            '/public/v1/auth/forgot-password',
            '/public/v1/auth/verify-reset-code',
            '/public/v1/auth/reset-password',
            '/public/v1/auth/resend-reset-code',
            '/public/v1/auth/refresh',
            '/public/v1/config/merchant-registration',
        ];

        const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

        // Add token to protected endpoints
        if (token && !isPublicEndpoint) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * Handles token refresh on 401 errors
 */
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Check if this is a network error (no response from server)
        const isNetworkError = error.code === 'ERR_NETWORK' ||
            error.message === 'Network Error' ||
            !error.response;

        // If it's a network error, don't try to refresh - just pass it through
        if (isNetworkError) {
            return Promise.reject(error);
        }

        // Extract error message from API response if available
        // This ensures that all parts of the app receive the user-friendly message from the server
        if (error.response?.data && typeof error.response.data === 'object') {
            const data = error.response.data as Record<string, unknown>;
            // Prefer 'message' but fallback to 'error' (type) if message is missing
            const apiMessage = (data.message || data.error) as string;
            if (apiMessage) {
                // We modify the error message to be the one from the API
                // This allows toast.error(error.message) to work correctly across the app
                error.message = apiMessage;
            }
        }

        // Public endpoints that don't need authentication - should not trigger refresh/redirect
        const publicEndpoints = [
            '/public/v1/auth/register',
            '/public/v1/auth/login',
            '/public/v1/auth/admin/login',
            '/public/v1/auth/verify-email',
            '/public/v1/auth/resend-verification',
            '/public/v1/auth/forgot-password',
            '/public/v1/auth/verify-reset-code',
            '/public/v1/auth/reset-password',
            '/public/v1/auth/resend-reset-code',
            '/public/v1/auth/refresh',
            '/public/v1/config/merchant-registration',
        ];

        const isPublicEndpoint = publicEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));

        // If 404 error (account not found/deleted), clear auth and redirect
        // If 404 error (account not found/deleted), clear auth and redirect
        // EXCEPTION: /merchant/v1/merchants/first returning 404 is valid for new users (no merchant yet)
        const isFirstMerchantEndpoint = originalRequest.url?.includes('/merchant/v1/merchants/first');

        if (error.response?.status === 404 && !isPublicEndpoint && !isFirstMerchantEndpoint) {
            // Account not found - likely deleted, clear auth
            clearAuthData();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }

        // If 401 error and haven't retried yet, and it's NOT a public endpoint
        if (error.response?.status === 401 && !originalRequest._retry && !isPublicEndpoint) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();

            if (refreshToken) {
                try {
                    // Call refresh endpoint
                    const { data } = await axios.post(`${API_BASE_URL}/public/v1/auth/refresh`, {
                        refreshToken,
                    });

                    // Store new access token
                    // storeAuthData will automatically update the cookie
                    // Get current auth data to preserve user if not in response
                    const currentAuthData = getAuthData();
                    storeAuthData({
                        user: data.user || currentAuthData?.user || { id: '', email: '', role: 'merchant-user' },
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken || refreshToken, // Use new refresh token if provided, otherwise keep old one
                    });

                    // Retry original request with new token
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    }
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // Refresh failed, clear auth and redirect to login
                    clearAuthData();
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                    return Promise.reject(refreshError);
                }
            } else {
                // No refresh token, clear auth and redirect
                clearAuthData();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export { apiClient };
