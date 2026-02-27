import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types';
import { authApi } from '../services/api';

interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<boolean>;
    register: (firstName: string, lastName: string, email: string, password: string, phone?: string) => Promise<boolean>;
    logout: () => Promise<void>;
    fetchMe: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await authApi.login({ email, password });

                    if (response.success && response.data) {
                        set({ user: response.data.user, isAuthenticated: true, isLoading: false });
                        return true;
                    } else {
                        set({ error: response.error || 'Giriş başarısız', isLoading: false, isAuthenticated: false });
                        return false;
                    }
                } catch {
                    set({
                        error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
                        isLoading: false,
                        isAuthenticated: false
                    });
                    return false;
                }
            },

            register: async (firstName, lastName, email, password, phone) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await authApi.register({ firstName, lastName, email, password, phone });

                    if (response.success && response.data) {
                        set({ user: response.data.user, isAuthenticated: true, isLoading: false });
                        return true;
                    } else {
                        set({ error: response.error || 'Kayıt başarısız', isLoading: false, isAuthenticated: false });
                        return false;
                    }
                } catch {
                    set({
                        error: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.',
                        isLoading: false,
                        isAuthenticated: false
                    });
                    return false;
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await authApi.logout();
                    set({ user: null, isAuthenticated: false, isLoading: false, error: null });
                } catch {
                    set({ isLoading: false });
                }
            },

            fetchMe: async () => {
                set({ isLoading: true });
                try {
                    const response = await authApi.getMe();
                    if (response.success && response.data) {
                        set({ user: response.data, isAuthenticated: true, isLoading: false });
                    } else {
                        set({ user: null, isAuthenticated: false, isLoading: false });
                    }
                } catch {
                    set({ user: null, isAuthenticated: false, isLoading: false });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user }),
        }
    )
);
