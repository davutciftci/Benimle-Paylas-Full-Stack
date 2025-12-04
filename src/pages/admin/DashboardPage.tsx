import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppointmentStore } from '../../store/appointmentStore';
import { Calendar, User, Clock, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DashboardPage: React.FC = () => {
    const { user } = useAuthStore();
    const { appointments, fetchExpertAppointments, isLoading } = useAppointmentStore();

    useEffect(() => {
        if (user?.expertProfile?.id) {
            fetchExpertAppointments(user.expertProfile.id);
        }
    }, [user, fetchExpertAppointments]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    const upcomingAppointments = appointments.filter(
        (apt) => apt.status === 'confirmed' && new Date(apt.date) > new Date()
    );

    const stats = [
        {
            title: 'Toplam Randevu',
            value: appointments.length,
            icon: Calendar,
            color: 'bg-blue-500',
        },
        {
            title: 'Yaklaşan',
            value: upcomingAppointments.length,
            icon: Clock,
            color: 'bg-green-500',
        },
        {
            title: 'Toplam Danışan',
            value: new Set(appointments.map((a) => a.userId)).size,
            icon: User,
            color: 'bg-purple-500',
        },
        {
            title: 'Ortalama Puan',
            value: user?.expertProfile?.rating.toFixed(1) || '0.0',
            icon: TrendingUp,
            color: 'bg-orange-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Hoş Geldiniz, {user?.name}
                    </h1>
                    <p className="text-gray-600 mt-2">İşte bugünün özet bilgileri</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Link
                        to="/admin/appointments"
                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                    >
                        <Calendar className="w-8 h-8 text-indigo-600 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900">Randevularım</h3>
                        <p className="text-gray-600 text-sm mt-1">Tüm randevularınızı görüntüleyin</p>
                    </Link>

                    <Link
                        to="/admin/profile"
                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                    >
                        <User className="w-8 h-8 text-indigo-600 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900">Profil Yönetimi</h3>
                        <p className="text-gray-600 text-sm mt-1">Profilinizi düzenleyin</p>
                    </Link>

                    <div className="bg-white rounded-lg shadow p-6">
                        <TrendingUp className="w-8 h-8 text-indigo-600 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-900">İstatistikler</h3>
                        <p className="text-gray-600 text-sm mt-1">Performans raporları (Yakında)</p>
                    </div>
                </div>

                {/* Recent Appointments */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-900">Yaklaşan Randevular</h2>
                    </div>
                    <div className="p-6">
                        {upcomingAppointments.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Yaklaşan randevu bulunmuyor</p>
                        ) : (
                            <div className="space-y-4">
                                {upcomingAppointments.slice(0, 5).map((appointment) => (
                                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {new Date(appointment.date).toLocaleDateString('tr-TR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {appointment.timeSlot.start} - {appointment.timeSlot.end}
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                            {appointment.sessionType === 'online' ? 'Online' : 'Yüz Yüze'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
