import { create } from 'zustand';
import type { Expert, ExpertFilters, PaginatedResponse } from '../types';
import { expertsApi } from '../services/api';

interface ExpertState {
    experts: Expert[];
    filters: ExpertFilters;
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
    isLoading: boolean;
    error: string | null;
    selectedExpert: Expert | null;

    fetchExperts: (page?: number) => Promise<void>;
    setFilters: (filters: Partial<ExpertFilters>) => void;
    clearFilters: () => void;
    selectExpert: (expertId: string) => Promise<void>;
    updateExpert: (expertId: string, data: Partial<Expert>) => Promise<boolean>;
}

const initialState = {
    experts: [],
    filters: {},
    pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
    },
    isLoading: false,
    error: null,
    selectedExpert: null,
};

export const useExpertStore = create<ExpertState>((set, get) => ({
    ...initialState,

    fetchExperts: async (page?: number) => {
        const currentPage = page || get().pagination.page;
        set({ isLoading: true, error: null });

        try {
            const response = await expertsApi.getAll(
                get().filters,
                currentPage,
                get().pagination.pageSize
            );

            if (response.success && response.data) {
                set({
                    experts: response.data.data,
                    pagination: {
                        page: response.data.page,
                        pageSize: response.data.pageSize,
                        total: response.data.total,
                        totalPages: response.data.totalPages,
                    },
                    isLoading: false,
                });
            } else {
                set({ error: response.error || 'Uzmanlar yüklenemedi', isLoading: false });
            }
        } catch {
            set({ error: 'Bir hata oluştu', isLoading: false });
        }
    },

    setFilters: (newFilters) => {
        set((state) => {
            const merged: ExpertFilters = { ...state.filters, ...newFilters };
            (Object.keys(merged) as (keyof ExpertFilters)[]).forEach((key) => {
                if (merged[key] === undefined) {
                    delete merged[key];
                }
            });
            return {
                filters: merged,
                pagination: { ...state.pagination, page: 1 },
            };
        });
        get().fetchExperts(1);
    },

    clearFilters: () => {
        set({ filters: {}, pagination: { ...get().pagination, page: 1 } });
        get().fetchExperts(1);
    },

    selectExpert: async (expertId) => {
        set({ isLoading: true, error: null });

        try {
            const response = await expertsApi.getById(expertId);

            if (response.success && response.data) {
                set({ selectedExpert: response.data, isLoading: false });
            } else {
                set({ error: response.error || 'Uzman bulunamadı', isLoading: false });
            }
        } catch {
            set({ error: 'Bir hata oluştu', isLoading: false });
        }
    },

    updateExpert: async (expertId, data) => {
        set({ isLoading: true, error: null });

        try {
            const response = await expertsApi.update(expertId, data);

            if (response.success && response.data) {
                set((state) => ({
                    selectedExpert:
                        state.selectedExpert?.id === Number(expertId)
                            ? response.data
                            : state.selectedExpert,
                    experts: state.experts.map((expert) =>
                        expert.id === Number(expertId) ? response.data! : expert
                    ),
                    isLoading: false,
                }));
                return true;
            } else {
                set({ error: response.error || 'Güncelleme başarısız', isLoading: false });
                return false;
            }
        } catch {
            set({ error: 'Bir hata oluştu', isLoading: false });
            return false;
        }
    },
}));
