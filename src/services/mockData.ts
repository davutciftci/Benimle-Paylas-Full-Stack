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
        id: 'user-1',
        email: 'ali@example.com',
        name: 'Ali Yılmaz',
        phone: '+90 555 123 4567',
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 'user-2',
        email: 'ayse@example.com',
        name: 'Ayşe Kaya',
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
        id: 'ayse-demir',
        userId: 'expert-1',
        name: 'Dr. Ayşe Demir',
        title: 'Klinik Psikolog',
        specialty: ['Travma Terapisi', 'Anksiyete Bozuklukları', 'Depresyon', 'BDT'],
        description: 'Travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmıştır.',
        fullDescription:
            'Dr. Ayşe Demir, 10 yılı aşkın deneyime sahip bir klinik psikologdur. Travma, anksiyete bozuklukları ve depresyon konularında uzmanlaşmıştır. Bilişsel Davranışçı Terapi (BDT) ve EMDR tekniklerini kullanarak danışanlarına destek sağlamaktadır.',
        image: '/src/assets/img/davut ciftci.jpg',
        experience: '10+ Yıl',
        education: 'İstanbul Üniversitesi - Psikoloji Lisans, Klinik Psikoloji Yüksek Lisans',
        languages: ['Türkçe', 'İngilizce'],
        sessionTypes: ['online'],
        priceRange: { min: 800, max: 1200 },
        rating: 4.8,
        reviewCount: 127,
        availability: weekdayAvailability,
        insurance: ['Axa Sigorta', 'Allianz', 'Anadolu Sigorta'],
    },
    {
        id: 'mehmet-yilmaz',
        userId: 'expert-2',
        name: 'Uzm. Psk. Mehmet Yılmaz',
        title: 'Aile ve Çift Terapisti',
        specialty: ['Çift Terapisi', 'Aile Terapisi', 'İletişim Problemleri'],
        description: 'İlişki sorunları, iletişim problemleri ve aile içi çatışmalar üzerine çalışmaktadır.',
        fullDescription:
            'Uzm. Psk. Mehmet Yılmaz, aile ve çift terapisi alanında 8 yıllık deneyime sahiptir. Duygu Odaklı Çift Terapisi (EFT) yöntemini benimsemektedir.',
        image: '/src/assets/img/freud.png',
        experience: '8 Yıl',
        education: 'Ankara Üniversitesi - Psikoloji Lisans, Aile ve Çift Terapisi Yüksek Lisans',
        languages: ['Türkçe'],
        sessionTypes: ['online'],
        priceRange: { min: 700, max: 1000 },
        rating: 4.6,
        reviewCount: 89,
        availability: weekdayAvailability,
        insurance: ['Axa Sigorta', 'Mapfre Sigorta'],
    },
    {
        id: 'elif-kaya',
        userId: 'expert-3',
        name: 'Psk. Dan. Elif Kaya',
        title: 'Bireysel Terapist',
        specialty: ['Bireysel Terapi', 'Özgüven Sorunları', 'Stres Yönetimi'],
        description: 'Özgüven sorunları, stres yönetimi ve kişisel gelişim konularında danışmanlık.',
        fullDescription:
            'Psk. Dan. Elif Kaya, bireysel terapi alanında 6 yıllık deneyime sahiptir. Varoluşçu terapi ekolünden yararlanır.',
        image: '/src/assets/img/Alfred Binet.png',
        experience: '6 Yıl',
        education: 'Boğaziçi Üniversitesi - Psikoloji Lisans, Psikolojik Danışmanlık Yüksek Lisans',
        languages: ['Türkçe', 'İngilizce'],
        sessionTypes: ['online'],
        priceRange: { min: 600, max: 900 },
        rating: 4.9,
        reviewCount: 156,
        availability: weekdayAvailability,
        insurance: ['Axa Sigorta', 'Allianz', 'Türk Nippon'],
    },
    {
        id: 'can-arslan',
        userId: 'expert-4',
        name: 'Psk. Dan. Can Arslan',
        title: 'Grup Terapisti',
        specialty: ['Grup Terapisi', 'Sosyal Anksiyete', 'Bağımlılık'],
        description: 'Sosyal anksiyete ve bağımlılık konularında grup terapileri düzenlemektedir.',
        fullDescription:
            'Psk. Dan. Can Arslan, grup terapisi alanında 7 yıllık deneyime sahiptir. Psikodrama ve grup dinamikleri üzerine odaklanmaktadır.',
        image: '/src/assets/img/Carl Gustavt Jung.png',
        experience: '7 Yıl',
        education: 'Hacettepe Üniversitesi - Psikoloji Lisans, Klinik Psikoloji Yüksek Lisans',
        languages: ['Türkçe'],
        sessionTypes: ['online'],
        priceRange: { min: 500, max: 800 },
        rating: 4.5,
        reviewCount: 73,
        availability: weekdayAvailability,
        insurance: ['Mapfre Sigorta', 'Groupama Sigorta'],
    },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
    {
        id: 'apt-1',
        userId: 'user-1',
        expertId: 'ayse-demir',
        date: '2024-12-10T10:00:00Z',
        timeSlot: { start: '10:00', end: '11:00' },
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
        id: 'rev-1',
        expertId: 'ayse-demir',
        userId: 'user-1',
        userName: 'Ali Y.',
        rating: 5,
        comment: 'Çok faydalı bir seans oldu. Dr. Ayşe\'nin empatik yaklaşımı harika.',
        createdAt: '2024-11-20T14:00:00Z',
    },
    {
        id: 'rev-2',
        expertId: 'ayse-demir',
        userId: 'user-2',
        userName: 'Ayşe K.',
        rating: 5,
        comment: 'Profesyonel ve rahatlatıcı bir ortam. Kesinlikle tavsiye ederim.',
        createdAt: '2024-11-25T16:30:00Z',
    },
];

// Helper: Get expert by ID
export const getExpertById = (id: string): Expert | undefined => {
    return mockExperts.find((expert) => expert.id === id);
};

// Helper: Get appointments for user
export const getUserAppointments = (userId: string): Appointment[] => {
    return mockAppointments.filter((apt) => apt.userId === userId);
};

// Helper: Get appointments for expert
export const getExpertAppointments = (expertId: string): Appointment[] => {
    return mockAppointments.filter((apt) => apt.expertId === expertId);
};

// Helper: Get reviews for expert
export const getExpertReviews = (expertId: string): Review[] => {
    return mockReviews.filter((review) => review.expertId === expertId);
};
