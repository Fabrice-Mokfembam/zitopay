"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthData, getAuthData, storeAuthData, clearAuthData, isAuthenticated as checkAuth } from '../utils/storage';

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
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from storage on mount
    useEffect(() => {
        const loadUser = () => {
            try {
                const authData = getAuthData();
                const authenticated = checkAuth();

                if (authData && authenticated) {
                    setUser(authData.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error loading user from storage:', error);
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
