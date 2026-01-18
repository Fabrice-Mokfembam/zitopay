"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthData, getAuthData, storeAuthData, clearAuthData, getAccessToken } from '../utils/storage';
import { getCurrentUser } from '../api/index';

// Context type definition
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: AuthData) => void;
    logout: () => void;
}

// Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Manages user authentication state across the app
 * Fetches fresh user data from API on mount if token exists
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from storage and fetch fresh data from API on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = getAccessToken();
                const authData = getAuthData();

                // If no token, user is not authenticated
                if (!token) {
                    setUser(null);
                    setIsLoading(false);
                    return;
                }

                // First, set user from storage (for immediate UI update)
                if (authData?.user) {
                    setUser(authData.user);
                }

                // Then fetch fresh user data from API
                try {
                    const freshUser = await getCurrentUser();
                    
                    // Update context with fresh data
                    setUser(freshUser);
                    
                    // Update storage with fresh user data (keep existing tokens)
                    if (authData) {
                        storeAuthData({
                            ...authData,
                            user: freshUser,
                        });
                    }
                } catch (error) {
                    // If API call fails (token invalid/expired), clear auth
                    console.error('Failed to fetch current user:', error);
                    clearAuthData();
                    setUser(null);
                }
            } catch (error) {
                console.error('Error loading user:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (data: AuthData) => {
        storeAuthData(data);
        setUser(data.user);
    };

    const logout = () => {
        clearAuthData();
        setUser(null);
    };

    // Compute isAuthenticated from user state
    // We trust local state 'user' which is synced with storage on login/logout
    const isAuthenticated = !!user;

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 * Must be used within AuthProvider
 */
export function useAuthContext(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }

    return context;
}
