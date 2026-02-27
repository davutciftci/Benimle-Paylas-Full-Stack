import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppointmentStore } from '../../store/appointmentStore';
import { Calendar, User, Clock, Star, Lock } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardSidebar, { DashboardTab } from '../../components/dashboard/DashboardSidebar';

const ExpertDashboard: React.FC = () => {
    const { user } = useAuthStore();
    const { appointments, fetchExpertAppointments, isLoading } = useAppointmentStore();
    const [activeTab, setActiveTab] = useState<DashboardTab>('appointments');

    useEffect(() => {
        if (user?.expertProfile?.id) {
            fetchExpertAppointments(user.expertProfile.id);
        }
    }, [user, fetchExpertAppointments]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
            color: 'text-blue-500',
            bg: 'bg-blue-50',
        },
        {
            title: 'Yaklaşan',
            value: upcomingAppointments.length,
            icon: Clock,
            color: 'text-green-500',
            bg: 'bg-green-50',
        },
        {
            title: 'Toplam Danışan',
            value: new Set(appointments.map((a) => a.userId)).size,
            icon: User,
            color: 'text-purple-500',
            bg: 'bg-purple-50',
        },
        {
            title: 'Ortalama Puan',
            value: user?.expertProfile?.rating.toFixed(1) || '0.0',
            icon: Star,
            color: 'text-orange-500',
            bg: 'bg-orange-50',
        },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12 font-nunito">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Sidebar */}
                    <div className="md:sticky md:top-24 h-fit">
                        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-8">
                        
                        {/* Tab Content: Appointments & Stats */}
                        {activeTab === 'appointments' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {/* Header */}
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">Uzman Paneli</h1>
                                        <p className="text-gray-500 mt-1 font-medium">Randevularınızı ve danışan bilgilerinizi yönetin</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">Uzman</span>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                                <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                                            </div>
                                            <div className={`${stat.bg} p-3 rounded-xl`}>
                                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <Link
                                        to="/expert/appointments"
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-blue-200 transition-all flex items-center space-x-4"
                                    >
                                        <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
                                            <Calendar className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Randevularım</h3>
                                            <p className="text-gray-500 text-sm font-medium">Tüm seans detaylarına ulaşın</p>
                                        </div>
                                    </Link>

                                    <Link
                                        to="/expert/profile"
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-indigo-200 transition-all flex items-center space-x-4"
                                    >
                                        <div className="bg-indigo-50 p-4 rounded-xl text-indigo-600">
                                            <User className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Profilim</h3>
                                            <p className="text-gray-500 text-sm font-medium">Uzmanlık ve biyografinizi düzenleyin</p>
                                        </div>
                                    </Link>
                                </div>

                                {/* Recent Appointments */}
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                            <div className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></div>
                                            Yaklaşan Randevular
                                        </h2>
                                    </div>
                                    <div className="p-6">
                                        {upcomingAppointments.length === 0 ? (
                                            <p className="text-gray-500 text-center py-12 font-bold bg-gray-50 rounded-2xl">Yaklaşan randevu bulunmuyor</p>
                                        ) : (
                                            <div className="space-y-4">
                                                {upcomingAppointments.slice(0, 5).map((appointment) => (
                                                    <div key={appointment.id} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="bg-blue-50 p-3 rounded-xl">
                                                                <Calendar className="w-6 h-6 text-blue-500" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900">
                                                                    {new Date(appointment.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                                </p>
                                                                <p className="text-sm text-gray-500 font-bold">
                                                                    {appointment.timeSlot.start} - {appointment.timeSlot.end}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${appointment.sessionType === 'online' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'}`}>
                                                            {appointment.sessionType === 'online' ? '🌐 ONLINE' : '👥 YÜZ YÜZE'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ... Diğer sekmeler UserDashboardPage ile benzer ... */}
                        {activeTab === 'account' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h1 className="text-2xl font-bold text-gray-900">Hesap Bilgileri</h1>
                                    <p className="text-gray-500 mt-1 font-medium">Uzman profili temel bilgileri</p>
                                </div>
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">AD</label>
                                            <input type="text" defaultValue={user?.firstName} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">SOYAD</label>
                                            <input type="text" defaultValue={user?.lastName} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">E-POSTA</label>
                                            <input type="email" defaultValue={user?.email} disabled className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-400 cursor-not-allowed" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">UNVAN</label>
                                            <input type="text" defaultValue={user?.expertProfile?.title} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-50">
                                        <button className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">Değişiklikleri Kaydet</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h1 className="text-2xl font-bold text-gray-900">Şifre Güvenliği</h1>
                                    <p className="text-gray-500 mt-1 font-medium">Şifrenizi düzenli aralıklarla güncelleyin</p>
                                </div>
                                <div className="max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">GÜNCEL ŞİFRE</label>
                                            <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">YENİ ŞİFRE</label>
                                            <input type="password" placeholder="Yeni şifre" className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900" />
                                        </div>
                                    </div>
                                    <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2">
                                        <Lock size={20} />
                                        <span>Şifreyi Güncelle</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpertDashboard;
