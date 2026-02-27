import { create } from 'zustand';
import type { Appointment } from '../types';
import { appointmentsApi } from '../services/api';

interface AppointmentState {
    appointments: Appointment[];
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;

    // Actions
    fetchUserAppointments: (userId: string) => Promise<void>;
    fetchExpertAppointments: (expertId: string) => Promise<void>;
    createAppointment: (
        appointment: Omit<Appointment, 'id' | 'createdAt'>
    ) => Promise<boolean>;
    updateAppointmentStatus: (
        appointmentId: string,
        status: Appointment['status']
    ) => Promise<boolean>;
    clearMessages: () => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
    appointments: [],
    isLoading: false,
    error: null,
    successMessage: null,

    fetchUserAppointments: async (userId) => {
        set({ isLoading: true, error: null });

        try {
            const response = await appointmentsApi.getForUser(userId);

            if (response.success && response.data) {
                set({ appointments: response.data, isLoading: false });
            } else {
                set({ error: response.error || 'Randevular yüklenemedi', isLoading: false });
            }
        } catch (error) {
            set({ error: 'Bir hata oluştu', isLoading: false });
        }
    },

    fetchExpertAppointments: async (expertId) => {
        set({ isLoading: true, error: null });

        try {
            const response = await appointmentsApi.getForExpert(expertId);

            if (response.success && response.data) {
                set({ appointments: response.data, isLoading: false });
            } else {
                set({ error: response.error || 'Randevular yüklenemedi', isLoading: false });
            }
        } catch (error) {
            set({ error: 'Bir hata oluştu', isLoading: false });
        }
    },

    createAppointment: async (appointment) => {
        set({ isLoading: true, error: null, successMessage: null });

        try {
            const response = await appointmentsApi.create(appointment);

            if (response.success && response.data) {
                set((state) => ({
                    appointments: [...state.appointments, response.data!],
                    isLoading: false,
                    successMessage: response.message || 'Randevu oluşturuldu',
                }));
                return true;
            } else {
                set({ error: response.error || 'Randevu oluşturulamadı', isLoading: false });
                return false;
            }
        } catch (error) {
            set({ error: 'Bir hata oluştu', isLoading: false });
            return false;
        }
    },

    updateAppointmentStatus: async (appointmentId, status) => {
        set({ isLoading: true, error: null });

        try {
            const response = await appointmentsApi.updateStatus(appointmentId, status);

            if (response.success && response.data) {
                set((state) => ({
                    appointments: state.appointments.map((apt) =>
                        apt.id === appointmentId ? response.data! : apt
                    ),
                    isLoading: false,
                    successMessage: 'Randevu durumu güncellendi',
                }));
                return true;
            } else {
                set({ error: response.error || 'Güncelleme başarısız', isLoading: false });
                return false;
            }
        } catch (error) {
            set({ error: 'Bir hata oluştu', isLoading: false });
            return false;
        }
    },

    clearMessages: () => set({ error: null, successMessage: null }),
}));
