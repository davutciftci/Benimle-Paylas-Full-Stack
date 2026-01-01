import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAppointmentStore } from '../store/appointmentStore';
import { useExpertStore } from '../store/expertStore';
import { Calendar, Heart, User, Clock, Search, Star } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const UserDashboardPage: React.FC = () => {
    const { user } = useAuthStore();
    const { appointments, fetchUserAppointments, isLoading } = useAppointmentStore();
    const { experts, fetchExperts } = useExpertStore();
    const [favorites, setFavorites] = useState<string[]>([]);

    // Favori uzmanları localStorage'dan yükle
    useEffect(() => {
        try {
            const savedFavorites = localStorage.getItem('favoriteExperts');
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error('Favoriler yüklenirken hata:', error);
        }
    }, []);

    // Kullanıcı randevularını yükle
    useEffect(() => {
        if (user?.id) {
            fetchUserAppointments(user.id);
        }
    }, [user, fetchUserAppointments]);

    // Uzmanları yükle (favori uzmanlar için)
    useEffect(() => {
        if (favorites.length > 0) {
            fetchExperts();
        }
    }, [favorites, fetchExperts]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    // Yaklaşan randevuları filtrele
    const upcomingAppointments = appointments.filter(
        (apt) => apt.status === 'confirmed' && new Date(apt.date) > new Date()
    );

    // Favori uzmanları al
    const favoriteExperts = experts.filter((expert) => favorites.includes(expert.id));

    // İstatistik kartları
    const stats = [
        {
            title: 'Toplam Randevu',
            value: appointments.length,
            icon: Calendar,
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            textColor: 'text-blue-600',
        },
        {
            title: 'Yaklaşan Randevu',
            value: upcomingAppointments.length,
            icon: Clock,
            color: 'bg-gradient-to-br from-green-500 to-green-600',
            textColor: 'text-green-600',
        },
        {
            title: 'Favori Uzmanlar',
            value: favorites.length,
            icon: Heart,
            color: 'bg-gradient-to-br from-rose-500 to-rose-600',
            textColor: 'text-rose-600',
        },
        {
            title: 'Tamamlanan',
            value: appointments.filter((a) => a.status === 'completed').length,
            icon: Star,
            color: 'bg-gradient-to-br from-purple-500 to-purple-600',
            textColor: 'text-purple-600',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Başlık */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Hoş Geldiniz, {user?.name}!
                    </h1>
                </div>

                {/* İstatistik Kartları */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                                    <p className={`text-3xl font-bold ${stat.textColor} mt-2`}>
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`${stat.color} p-4 rounded-xl shadow-lg`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hızlı Aksiyonlar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Link
                        to="/find-therapist"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <Search className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Uzman Bul</h3>
                                <p className="text-gray-600 text-sm mt-1">Size uygun uzmanı keşfedin</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/experts"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <Heart className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Favorilerim</h3>
                                <p className="text-gray-600 text-sm mt-1">Favori uzmanlarınızı görün</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/experts"
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <User className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Tüm Uzmanlar</h3>
                                <p className="text-gray-600 text-sm mt-1">Uzman listesine göz atın</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Yaklaşan Randevular */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 mb-8">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                            Yaklaşan Randevularım
                        </h2>
                    </div>
                    <div className="p-6">
                        {upcomingAppointments.length === 0 ? (
                            <div className="text-center py-12">
                                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Yaklaşan randevu bulunmuyor</p>
                                <Link
                                    to="/find-therapist"
                                    className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                                >
                                    Randevu Oluştur
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingAppointments.slice(0, 5).map((appointment) => {
                                    const expert = experts.find((e) => e.id === appointment.expertId);
                                    return (
                                        <div
                                            key={appointment.id}
                                            className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all"
                                        >
                                            <div className="flex items-center space-x-4">
                                                {expert && (
                                                    <img
                                                        src={expert.image}
                                                        alt={expert.name}
                                                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                                                    />
                                                )}
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-lg">
                                                        {expert?.name || 'Uzman'}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {expert?.title || ''}
                                                    </p>
                                                    <p className="text-sm text-gray-700 font-medium mt-1">
                                                        {new Date(appointment.date).toLocaleDateString('tr-TR', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                        {' • '}
                                                        {appointment.timeSlot.start} - {appointment.timeSlot.end}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${appointment.sessionType === 'online'
                                                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                                                        : 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                                                        }`}
                                                >
                                                    {appointment.sessionType === 'online' ? '🌐 Online' : '👥 Yüz Yüze'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Favori Uzmanlar */}
                {favoriteExperts.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <Heart className="w-6 h-6 mr-2 text-rose-600" />
                                Favori Uzmanlarım
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {favoriteExperts.slice(0, 6).map((expert) => (
                                    <Link
                                        key={expert.id}
                                        to={`/expert/${expert.id}`}
                                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100 hover:shadow-md transition-all group"
                                    >
                                        <img
                                            src={expert.image}
                                            alt={expert.name}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate">{expert.name}</p>
                                            <p className="text-sm text-gray-600 truncate">{expert.title}</p>
                                            <div className="flex items-center mt-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm text-gray-700 ml-1">
                                                    {expert.rating.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboardPage;
