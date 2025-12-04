import type {
    Expert,
    User,
    Appointment,
    Review,
    ExpertFilters,
    PaginatedResponse,
    ApiResponse,
    LoginCredentials,
    AuthUser,
} from '../types';
import {
    mockExperts,
    mockUsers,
    mockAppointments,
    mockReviews,
    getExpertById,
    getUserAppointments,
    getExpertAppointments,
    getExpertReviews,
} from './mockData';

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// LocalStorage keys
const STORAGE_KEYS = {
    AUTH_USER: 'benimle_paylas_auth_user',
    EXPERTS: 'benimle_paylas_experts',
    APPOINTMENTS: 'benimle_paylas_appointments',
    REVIEWS: 'benimle_paylas_reviews',
};

// Initialize localStorage with mock data if not exists
const initializeStorage = () => {
    if (!localStorage.getItem(STORAGE_KEYS.EXPERTS)) {
        localStorage.setItem(STORAGE_KEYS.EXPERTS, JSON.stringify(mockExperts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(mockAppointments));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(mockReviews));
    }
};

initializeStorage();

// ==================== AUTH API ====================
export const authApi = {
    async login(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
        await delay(800);

        // Mock authentication - in production, this would call real API
        const mockAuthUsers = [
            {
                id: 'user-1',
                email: 'user@example.com',
                name: 'Demo User',
                role: 'user' as const,
            },
            {
                id: 'expert-1',
                email: 'expert@example.com',
                name: 'Dr. Ayşe Demir',
                role: 'expert' as const,
                expertProfile: mockExperts[0],
            },
        ];

        const user = mockAuthUsers.find((u) => u.email === credentials.email);

        if (!user || credentials.password !== 'demo123') {
            return {
                success: false,
                error: 'Geçersiz email veya şifre',
            };
        }

        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));

        return {
            success: true,
            data: user,
        };
    },

    async logout(): Promise<ApiResponse<void>> {
        await delay(300);
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        return { success: true };
    },

    getCurrentUser(): AuthUser | null {
        const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
        return userStr ? JSON.parse(userStr) : null;
    },
};

// ==================== EXPERTS API ====================
export const expertsApi = {
    async getAll(
        filters?: ExpertFilters,
        page = 1,
        pageSize = 10
    ): Promise<ApiResponse<PaginatedResponse<Expert>>> {
        await delay(500);

        const expertsStr = localStorage.getItem(STORAGE_KEYS.EXPERTS);
        let experts: Expert[] = expertsStr ? JSON.parse(expertsStr) : mockExperts;

        // Apply filters
        if (filters) {
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                experts = experts.filter(
                    (e) =>
                        e.name.toLowerCase().includes(searchLower) ||
                        e.specialty.some((s) => s.toLowerCase().includes(searchLower))
                );
            }

            if (filters.specialty && filters.specialty.length > 0) {
                experts = experts.filter((e) =>
                    filters.specialty!.some((s) => e.specialty.includes(s))
                );
            }

            if (filters.insurance && filters.insurance.length > 0) {
                experts = experts.filter((e) =>
                    filters.insurance!.some((ins) => e.insurance.includes(ins))
                );
            }

            if (filters.minPrice !== undefined) {
                experts = experts.filter((e) => e.priceRange.min >= filters.minPrice!);
            }

            if (filters.maxPrice !== undefined) {
                experts = experts.filter((e) => e.priceRange.max <= filters.maxPrice!);
            }

            if (filters.sessionType) {
                experts = experts.filter((e) => e.sessionTypes.includes(filters.sessionType!));
            }

            if (filters.rating !== undefined) {
                experts = experts.filter((e) => e.rating >= filters.rating!);
            }
        }

        // Pagination
        const total = experts.length;
        const totalPages = Math.ceil(total / pageSize);
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedExperts = experts.slice(start, end);

        return {
            success: true,
            data: {
                data: paginatedExperts,
                total,
                page,
                pageSize,
                totalPages,
            },
        };
    },

    async getById(id: string): Promise<ApiResponse<Expert>> {
        await delay(300);
        const expert = getExpertById(id);

        if (!expert) {
            return {
                success: false,
                error: 'Uzman bulunamadı',
            };
        }

        return {
            success: true,
            data: expert,
        };
    },

    async update(id: string, data: Partial<Expert>): Promise<ApiResponse<Expert>> {
        await delay(500);

        const expertsStr = localStorage.getItem(STORAGE_KEYS.EXPERTS);
        const experts: Expert[] = expertsStr ? JSON.parse(expertsStr) : mockExperts;

        const index = experts.findIndex((e) => e.id === id);
        if (index === -1) {
            return {
                success: false,
                error: 'Uzman bulunamadı',
            };
        }

        experts[index] = { ...experts[index], ...data };
        localStorage.setItem(STORAGE_KEYS.EXPERTS, JSON.stringify(experts));

        return {
            success: true,
            data: experts[index],
        };
    },
};

// ==================== APPOINTMENTS API ====================
export const appointmentsApi = {
    async create(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<ApiResponse<Appointment>> {
        await delay(800);

        const appointmentsStr = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
        const appointments: Appointment[] = appointmentsStr
            ? JSON.parse(appointmentsStr)
            : mockAppointments;

        const newAppointment: Appointment = {
            ...appointment,
            id: `apt-${Date.now()}`,
            createdAt: new Date().toISOString(),
        };

        appointments.push(newAppointment);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));

        return {
            success: true,
            data: newAppointment,
            message: 'Randevu başarıyla oluşturuldu',
        };
    },

    async getForUser(userId: string): Promise<ApiResponse<Appointment[]>> {
        await delay(400);
        const appointments = getUserAppointments(userId);
        return {
            success: true,
            data: appointments,
        };
    },

    async getForExpert(expertId: string): Promise<ApiResponse<Appointment[]>> {
        await delay(400);
        const appointments = getExpertAppointments(expertId);
        return {
            success: true,
            data: appointments,
        };
    },

    async updateStatus(
        id: string,
        status: Appointment['status']
    ): Promise<ApiResponse<Appointment>> {
        await delay(500);

        const appointmentsStr = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
        const appointments: Appointment[] = appointmentsStr
            ? JSON.parse(appointmentsStr)
            : mockAppointments;

        const index = appointments.findIndex((a) => a.id === id);
        if (index === -1) {
            return {
                success: false,
                error: 'Randevu bulunamadı',
            };
        }

        appointments[index].status = status;
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));

        return {
            success: true,
            data: appointments[index],
        };
    },
};

// ==================== REVIEWS API ====================
export const reviewsApi = {
    async getForExpert(expertId: string): Promise<ApiResponse<Review[]>> {
        await delay(300);
        const reviews = getExpertReviews(expertId);
        return {
            success: true,
            data: reviews,
        };
    },

    async create(review: Omit<Review, 'id' | 'createdAt'>): Promise<ApiResponse<Review>> {
        await delay(600);

        const reviewsStr = localStorage.getItem(STORAGE_KEYS.REVIEWS);
        const reviews: Review[] = reviewsStr ? JSON.parse(reviewsStr) : mockReviews;

        const newReview: Review = {
            ...review,
            id: `rev-${Date.now()}`,
            createdAt: new Date().toISOString(),
        };

        reviews.push(newReview);
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));

        return {
            success: true,
            data: newReview,
            message: 'Değerlendirmeniz kaydedildi',
        };
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
