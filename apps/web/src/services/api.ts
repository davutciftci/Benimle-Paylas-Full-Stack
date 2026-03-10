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
    SignLanguageWord,
} from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api';

export const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth-storage');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

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

export const authApi = {
    async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: AuthUser }>> {
        return wrap<{ user: AuthUser }>(() => http.post('/auth/login', credentials));
    },

    async register(data: RegisterData): Promise<ApiResponse<{ user: AuthUser }>> {
        return wrap<{ user: AuthUser }>(() => http.post('/auth/register', data));
    },

    async logout(): Promise<ApiResponse<void>> {
        return wrap(() => http.post('/auth/logout'));
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

export const reviewsApi = {
    async getForExpert(expertId: string | number): Promise<ApiResponse<Review[]>> {
        return wrap(() => http.get(`/reviews/expert/${expertId}`));
    },

    async create(review: Omit<Review, 'id' | 'createdAt'>): Promise<ApiResponse<Review>> {
        return wrap(() => http.post('/reviews', review));
    },
};

export const signLanguageApi = {
    async getByWord(word: string): Promise<ApiResponse<SignLanguageWord>> {
        return wrap(() => http.get(`/sign-language/${encodeURIComponent(word.toLowerCase())}`));
    },

    async getAll(): Promise<ApiResponse<SignLanguageWord[]>> {
        return wrap(() => http.get('/sign-language'));
    },
};

export const api = {
    auth: authApi,
    experts: expertsApi,
    appointments: appointmentsApi,
    reviews: reviewsApi,
    signLanguage: signLanguageApi,
};


export default api;
