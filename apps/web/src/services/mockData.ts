// @ts-nocheck
import type {
    Expert,
    User,
    Appointment,
    Review,
    ExpertAvailability,
} from '../types';

// Mock Users
export const mockUsers: User[] = [
    {
        id: 'user-1' as any,
        email: 'ali@example.com',
        firstName: 'Ali',
        lastName: 'Yılmaz',
        phone: '+90 555 123 4567',
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 'user-2' as any,
        email: 'ayse@example.com',
        firstName: 'Ayşe',
        lastName: 'Kaya',
        phone: '+90 555 234 5678',
        createdAt: '2024-02-20T14:30:00Z',
    },
];

// Mock Expert Availability
const weekdayAvailability: ExpertAvailability = {
    monday: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
    ],
    tuesday: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
    ],
    wednesday: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
    ],
    thursday: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
    ],
    friday: [{ start: '09:00', end: '15:00' }],
};

// Mock Experts - Expanded Dataset
export const mockExperts: Expert[] = [
    {
        id: 1,
        userId: 1,
        user: { firstName: 'Dr. Ayşe', lastName: 'Demir', email: 'ayse@example.com' },
        degree: { id: 1, name: 'Klinik Psikolog' },
        specialties: [{ id: 1, name: 'Travma Terapisi' }],
        bio: 'Travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmıştır.',
        profilePhotoUrl: '/src/assets/img/davut ciftci.jpg',
        yearsOfExperience: 10,
        university: 'İstanbul Üniversitesi',
        price: 800,
        rating: 4.8,
        reviewCount: 127,
        workingHours: weekdayAvailability,
        insurance: ['Axa Sigorta', 'Allianz', 'Anadolu Sigorta'],
    },
    {
        id: 2,
        userId: 2,
        user: { firstName: 'Uzm. Psk. Mehmet', lastName: 'Yılmaz', email: 'mehmet@example.com' },
        degree: { id: 2, name: 'Aile ve Çift Terapisti' },
        specialties: [{ id: 2, name: 'Çift Terapisi' }],
        bio: 'İlişki sorunları, iletişim problemleri ve aile içi çatışmalar üzerine çalışmaktadır.',
        profilePhotoUrl: '/src/assets/img/freud.png',
        yearsOfExperience: 8,
        university: 'Ankara Üniversitesi',
        price: 700,
        rating: 4.6,
        reviewCount: 89,
        workingHours: weekdayAvailability,
        insurance: ['Axa Sigorta', 'Mapfre Sigorta'],
    },
    {
        id: 3,
        userId: 3,
        user: { firstName: 'Psk. Dan. Elif', lastName: 'Kaya', email: 'elif@example.com' },
        degree: { id: 3, name: 'Bireysel Terapist' },
        specialties: [{ id: 3, name: 'Bireysel Terapi' }],
        bio: 'Özgüven sorunları, stres yönetimi ve kişisel gelişim konularında danışmanlık.',
        profilePhotoUrl: '/src/assets/img/Alfred Binet.png',
        yearsOfExperience: 6,
        university: 'Boğaziçi Üniversitesi',
        price: 600,
        rating: 4.9,
        reviewCount: 156,
        workingHours: weekdayAvailability,
        insurance: ['Axa Sigorta', 'Allianz', 'Türk Nippon'],
    },
    {
        id: 4,
        userId: 4,
        user: { firstName: 'Psk. Dan. Can', lastName: 'Arslan', email: 'can@example.com' },
        degree: { id: 4, name: 'Grup Terapisti' },
        specialties: [{ id: 4, name: 'Grup Terapisi' }],
        bio: 'Sosyal anksiyete ve bağımlılık konularında grup terapileri düzenlemektedir.',
        profilePhotoUrl: '/src/assets/img/Carl Gustavt Jung.png',
        yearsOfExperience: 7,
        university: 'Hacettepe Üniversitesi',
        price: 500,
        rating: 4.5,
        reviewCount: 73,
        workingHours: weekdayAvailability,
        insurance: ['Mapfre Sigorta', 'Groupama Sigorta'],
    },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
    {
        id: 1 as any,
        userId: 1,
        expertId: 1,
        date: '2024-12-10T10:00:00Z',
        timeSlot: { start: '10:00', end: '11:00' } as any,
        status: 'confirmed',
        notes: 'İlk seans',
        sessionType: 'online',
        meetingLink: 'https://meet.benimlepaylas.com/apt-1',
        createdAt: '2024-12-01T09:00:00Z',
    },
];

// Mock Reviews
export const mockReviews: Review[] = [
    {
        id: 1 as any,
        expertId: 1,
        userId: 1,
        rating: 5,
        comment: 'Çok faydalı bir seans oldu. Dr. Ayşe\'nin empatik yaklaşımı harika.',
        createdAt: '2024-11-20T14:00:00Z',
    },
    {
        id: 2 as any,
        expertId: 1,
        userId: 2,
        rating: 5,
        comment: 'Profesyonel ve rahatlatıcı bir ortam. Kesinlikle tavsiye ederim.',
        createdAt: '2024-11-25T16:30:00Z',
    },
];

// Helper: Get expert by ID
export const getExpertById = (id: number): Expert | undefined => {
    return mockExperts.find((expert) => expert.id === id);
};

// Helper: Get appointments for user
export const getUserAppointments = (userId: number | string): Appointment[] => {
    return mockAppointments.filter((apt) => Number(apt.userId) === Number(userId));
};

// Helper: Get appointments for expert
export const getExpertAppointments = (expertId: number | string): Appointment[] => {
    return mockAppointments.filter((apt) => Number(apt.expertId) === Number(expertId));
};

// Helper: Get reviews for expert
export const getExpertReviews = (expertId: number | string): Review[] => {
    return mockReviews.filter((review) => Number(review.expertId) === Number(expertId));
};
