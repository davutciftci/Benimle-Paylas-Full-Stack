// User types
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    createdAt: string;
}

// Expert types
export interface Expert {
    id: string;
    userId: string;
    name: string;
    title: string;
    specialty: string[];
    description: string;
    fullDescription: string;
    image: string;
    experience: string;
    education: string;
    languages: string[];
    sessionDuration: string;
    isOnline: boolean;
    price: number;
    rating: number;
    reviewCount: number;
    availability: ExpertAvailability;
    insurance: string[];
}

export interface ExpertAvailability {
    monday?: TimeSlot[];
    tuesday?: TimeSlot[];
    wednesday?: TimeSlot[];
    thursday?: TimeSlot[];
    friday?: TimeSlot[];
    saturday?: TimeSlot[];
    sunday?: TimeSlot[];
}

export interface TimeSlot {
    start: string; // HH:mm format
    end: string;
}

// Appointment types
export interface Appointment {
    id: string;
    userId: string;
    expertId: string;
    date: string; // ISO 8601
    timeSlot: TimeSlot;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
    sessionType: 'online' | 'in-person';
    meetingLink?: string;
    createdAt: string;
}

// Review types
export interface Review {
    id: string;
    expertId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

// Authentication types
export interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: 'user' | 'expert' | 'admin';
    expertProfile?: Expert;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    firstName: string;
    lastName: string;
    phone?: string;
}

// Filter types
export interface ExpertFilters {
    search?: string;
    specialty?: string[];
    insurance?: string[];
    price?: number;
    availability?: string; // day of week
    rating?: number;
}

// Pagination
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
