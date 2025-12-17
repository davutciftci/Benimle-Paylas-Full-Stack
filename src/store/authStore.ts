import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types';
import { authApi } from '../services/api';

interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: authApi.getCurrentUser(),
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await authApi.login({ email, password });

                    if (response.success && response.data) {
                        set({ user: response.data, isLoading: false });
                        return true;
                    } else {
                        set({ error: response.error || 'Giriş başarısız', isLoading: false });
                        return false;
                    }
                } catch (error) {
                    set({
                        error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
                        isLoading: false
                    });
                    return false;
                }
            },

            register: async (name, email, password) => {
                set({ isLoading: true, error: null });

                try {
                    // Demo: Create a mock user for registration
                    const mockUser: AuthUser = {
                        id: Date.now().toString(),
                        email,
                        name,
                        role: 'user'
                    };

                    // Simulate API delay
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    set({ user: mockUser, isLoading: false });
                    return true;
                } catch (error) {
                    set({
                        error: 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.',
                        isLoading: false
                    });
                    return false;
                }
            },

            logout: async () => {
                set({ isLoading: true });

                try {
                    await authApi.logout();
                    set({ user: null, isLoading: false, error: null });
                } catch (error) {
                    set({ isLoading: false });
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
