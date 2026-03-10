// User types
export interface User {
    id: number | string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    createdAt: string;
}

// Expert types - Matches ExpertProfile Prisma Model
export interface Expert {
    id: number;
    userId: number;
    bio: string | null;
    university: string | null;
    fieldOfStudy: string | null;
    degreeId: number | null;
    titleId?: number | null;
    graduationYear: number | null;
    licenseNumber: string | null;
    yearsOfExperience: number | null;
    profilePhotoUrl: string | null;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    rating?: number; // optionally attached to responses
    reviewCount?: number;
    workingHours?: any; // parsed JSON
    specialties?: { id: number; name: string }[];
    specialtyIds?: number[];
    therapeuticApproaches?: { id: number; name: string }[];
    therapeuticApproachIds?: number[];
    seminars?: { id?: number; title: string; description?: string; date?: string }[];
    degree?: { id: number; name: string };
    title?: { id: number; name: string };
    price?: number | null;
    insurance?: string[]; // optionally attached
    user?: {
        firstName: string;
        lastName: string;
        email?: string;
    };
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
    id: number | string;
    userId: number | string;
    expertId: number | string;
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
    id: number | string;
    expertId: number | string;
    userId: number | string;
    userName?: string;
    rating: number;
    comment?: string;
    createdAt: string;
}

// Authentication types
export interface AuthUser {
    id: number | string;
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

export interface SignLanguageWord {
    id: number;
    word: string;
    videoUrl: string | null;
    category: string | null;
    hasVideo: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    fingerspell?: boolean; // DB'de yoksa backend true döndürür
}