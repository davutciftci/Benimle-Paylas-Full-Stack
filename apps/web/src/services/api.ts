/// <reference types="vite/client" />
import axios from 'axios';
import type {
    Expert,
    Appointment,
    Review,
    ExpertFilters,
    PaginatedResponse,
    ApiResponse,
    LoginCredentials,
    AuthUser,
    RegisterData,
} from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api';

// Axios instance
export const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// JWT token interceptor
http.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response error interceptor
http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('auth-storage');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Helper: wrap axios response into ApiResponse
const wrap = async <T>(fn: () => Promise<{ data: T }>): Promise<ApiResponse<T>> => {
    try {
        const res = await fn();
        return { success: true, data: res.data };
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return {
                success: false,
                error: err.response?.data?.message || err.message,
            };
        }
        return { success: false, error: 'Beklenmeyen bir hata oluştu' };
    }
};

// ==================== AUTH API ====================
export const authApi = {
    async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: AuthUser; access_token: string }>> {
        const result = await wrap<{ user: AuthUser; access_token: string }>(() => http.post('/auth/login', credentials));
        if (result.success && result.data) {
            localStorage.setItem('access_token', result.data.access_token);
        }
        return result;
    },

    async register(data: RegisterData): Promise<ApiResponse<{ user: AuthUser; access_token: string }>> {
        const result = await wrap<{ user: AuthUser; access_token: string }>(() => http.post('/auth/register', data));
        if (result.success && result.data) {
            localStorage.setItem('access_token', result.data.access_token);
        }
        return result;
    },

    async logout(): Promise<ApiResponse<void>> {
        localStorage.removeItem('access_token');
        return { success: true };
    },

    async forgotPassword(email: string): Promise<ApiResponse<void>> {
        return wrap(() => http.post('/auth/forgot-password', { email }));
    },

    async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
        return wrap(() => http.post('/auth/reset-password', { token, password }));
    },

    async getMe(): Promise<ApiResponse<AuthUser>> {
        return wrap(() => http.get('/users/me'));
    },
};

// ==================== EXPERTS API ====================
export const expertsApi = {
    async getAll(
        filters?: ExpertFilters,
        page = 1,
        pageSize = 10
    ): Promise<ApiResponse<PaginatedResponse<Expert>>> {
        const params = {
            page,
            pageSize,
            ...(filters?.search && { search: filters.search }),
            ...(filters?.specialty && { specialty: filters.specialty.join(',') }),
            ...(filters?.insurance && { insurance: filters.insurance.join(',') }),
            ...(filters?.price !== undefined && { price: filters.price }),
            ...(filters?.rating !== undefined && { rating: filters.rating }),
        };
        return wrap(() => http.get('/experts', { params }));
    },

    async getById(id: string | number): Promise<ApiResponse<Expert>> {
        return wrap(() => http.get(`/experts/${id}`));
    },

    async update(id: string | number, data: Partial<Expert>): Promise<ApiResponse<Expert>> {
        return wrap(() => http.patch(`/experts/${id}`, data));
    },
};

// ==================== APPOINTMENTS API ====================
export const appointmentsApi = {
    async create(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<ApiResponse<Appointment>> {
        return wrap(() => http.post('/appointments', appointment));
    },

    async getForUser(userId: string | number): Promise<ApiResponse<Appointment[]>> {
        return wrap(() => http.get(`/appointments/user/${userId}`));
    },

    async getForExpert(expertId: string | number): Promise<ApiResponse<Appointment[]>> {
        return wrap(() => http.get(`/appointments/expert/${expertId}`));
    },

    async updateStatus(id: string | number, status: Appointment['status']): Promise<ApiResponse<Appointment>> {
        return wrap(() => http.patch(`/appointments/${id}/status`, { status }));
    },
};

// ==================== REVIEWS API ====================
export const reviewsApi = {
    async getForExpert(expertId: string | number): Promise<ApiResponse<Review[]>> {
        return wrap(() => http.get(`/reviews/expert/${expertId}`));
    },

    async create(review: Omit<Review, 'id' | 'createdAt'>): Promise<ApiResponse<Review>> {
        return wrap(() => http.post('/reviews', review));
    },
};

// Export all APIs
export const api = {
    auth: authApi,
    experts: expertsApi,
    appointments: appointmentsApi,
    reviews: reviewsApi,
};

export default api;
