import React, { useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle2, XCircle, CircleDashed } from 'lucide-react';
import { useAppointmentStore } from '../../store/appointmentStore';
import { useAuthStore } from '../../store/authStore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import type { Appointment } from '../../types';

const statusClassMap: Record<Appointment['status'], string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
};

const statusLabelMap: Record<Appointment['status'], string> = {
    pending: 'Beklemede',
    confirmed: 'Onaylandı',
    cancelled: 'İptal',
    completed: 'Tamamlandı',
};

const AppointmentsPage: React.FC = () => {
    const { user, fetchMe } = useAuthStore();
    const { appointments, isLoading, error, successMessage, fetchExpertAppointments, updateAppointmentStatus, clearMessages } =
        useAppointmentStore();

    useEffect(() => {
        if (user?.role === 'expert' && !user.expertProfile?.id) {
            fetchMe();
            return;
        }

        if (user?.expertProfile?.id) {
            fetchExpertAppointments(user.expertProfile.id.toString());
        }
    }, [user, fetchMe, fetchExpertAppointments]);

    const handleStatusUpdate = async (appointmentId: string, status: Appointment['status']) => {
        await updateAppointmentStatus(appointmentId, status);
    };

    const now = new Date();
    const upcomingAppointments = appointments.filter(
        (appointment) =>
            (appointment.status === 'pending' || appointment.status === 'confirmed') &&
            new Date(appointment.date) >= now
    );
    const archivedAppointments = appointments.filter(
        (appointment) =>
            appointment.status === 'cancelled' ||
            appointment.status === 'completed' ||
            new Date(appointment.date) < now
    );

    if (isLoading && appointments.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Uzman Randevularım</h1>
                    <div className="text-sm text-gray-500">
                        Toplam <span className="font-bold text-gray-800">{appointments.length}</span> randevu
                    </div>
                </div>

                {error && (
                    <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
                        <span>{error}</span>
                        <button type="button" className="font-semibold hover:underline" onClick={clearMessages}>
                            Kapat
                        </button>
                    </div>
                )}

                {successMessage && (
                    <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 flex items-center justify-between">
                        <span>{successMessage}</span>
                        <button type="button" className="font-semibold hover:underline" onClick={clearMessages}>
                            Kapat
                        </button>
                    </div>
                )}

                <section className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Yaklaşan Randevular</h2>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-lg">
                            {upcomingAppointments.length} adet
                        </span>
                    </div>
                    <div className="p-5">
                        {upcomingAppointments.length === 0 ? (
                            <p className="text-sm text-gray-500">Yaklaşan randevu bulunmuyor.</p>
                        ) : (
                            <div className="space-y-4">
                                {upcomingAppointments.map((appointment) => (
                                    <article
                                        key={appointment.id}
                                        className="border border-gray-200 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-gray-900 font-bold">
                                                <User size={16} />
                                                <span>
                                                    {appointment.client?.firstName} {appointment.client?.lastName}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(appointment.date).toLocaleDateString('tr-TR')}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {appointment.timeSlot.start} - {appointment.timeSlot.end}
                                                </span>
                                            </div>
                                            {appointment.notes && (
                                                <p className="text-sm text-gray-500">Not: {appointment.notes}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                                            <span
                                                className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-lg ${statusClassMap[appointment.status]}`}
                                            >
                                                {statusLabelMap[appointment.status]}
                                            </span>
                                            <div className="flex gap-2">
                                                {appointment.status === 'pending' && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleStatusUpdate(String(appointment.id), 'confirmed')
                                                            }
                                                            className="px-3 py-2 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                        >
                                                            Onayla
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleStatusUpdate(String(appointment.id), 'cancelled')
                                                            }
                                                            className="px-3 py-2 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                        >
                                                            İptal Et
                                                        </button>
                                                    </>
                                                )}
                                                {appointment.status === 'confirmed' && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleStatusUpdate(String(appointment.id), 'completed')
                                                        }
                                                        className="px-3 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                    >
                                                        Tamamlandı
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Geçmiş / Kapanan Randevular</h2>
                    </div>
                    <div className="p-5">
                        {archivedAppointments.length === 0 ? (
                            <p className="text-sm text-gray-500">Geçmiş randevu bulunmuyor.</p>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {archivedAppointments.map((appointment) => (
                                    <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 space-y-2">
                                        <div className="font-semibold text-gray-800">
                                            {appointment.client?.firstName} {appointment.client?.lastName}
                                        </div>
                                        <div className="text-sm text-gray-600 flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(appointment.date).toLocaleDateString('tr-TR')}
                                        </div>
                                        <span
                                            className={`inline-flex text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-lg ${statusClassMap[appointment.status]}`}
                                        >
                                            {statusLabelMap[appointment.status]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
                        <CircleDashed className="text-amber-500" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Bekleyen</p>
                            <p className="font-bold">{appointments.filter((a) => a.status === 'pending').length}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
                        <CheckCircle2 className="text-green-500" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Onaylanan</p>
                            <p className="font-bold">{appointments.filter((a) => a.status === 'confirmed').length}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
                        <XCircle className="text-red-500" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">İptal Edilen</p>
                            <p className="font-bold">{appointments.filter((a) => a.status === 'cancelled').length}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AppointmentsPage;
