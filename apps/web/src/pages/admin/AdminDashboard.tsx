import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Users, Calendar, Activity, ShieldAlert, Settings, FileText, Lock } from 'lucide-react';
import DashboardSidebar, { DashboardTab } from '../../components/dashboard/DashboardSidebar';
import UserManagement from '../../components/admin/UserManagement';
import ReferenceDataManagement from '../../components/admin/ReferenceDataManagement';
import { api } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboard: React.FC = () => {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<DashboardTab>('appointments');
    const [statsData, setStatsData] = useState<{
        totalUsers: number;
        activeUsers: number;
        totalAppointments: number;
        pendingApprovals: number;
    } | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await api.admin.getStats();
            if (res.success && res.data) {
                setStatsData(res.data);
            }
            setStatsLoading(false);
        };
        load();
    }, []);

    const statsConfig = [
        { title: 'Toplam Kullanıcı', key: 'totalUsers' as const, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { title: 'Aktif Kullanıcı', key: 'activeUsers' as const, icon: Activity, color: 'text-green-500', bg: 'bg-green-50' },
        { title: 'Toplam Randevu', key: 'totalAppointments' as const, icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
        { title: 'Bekleyen Onaylar', key: 'pendingApprovals' as const, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
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
                        
                        {activeTab === 'appointments' && ( // Genel Bakış olarak kullanıyoruz
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {/* Header */}
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">Sistem Yönetimi</h1>
                                        <p className="text-gray-500 mt-1 font-medium">Tüm platform verilerini buradan kontrol edin</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">Yönetici</span>
                                    </div>
                                </div>

                                {/* Global Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {statsLoading ? (
                                        <div className="col-span-full flex justify-center py-8">
                                            <LoadingSpinner size="lg" />
                                        </div>
                                    ) : (
                                        statsConfig.map((stat, index) => (
                                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                                    <p className="text-2xl font-black text-gray-900 mt-1">
                                                        {statsData ? statsData[stat.key].toLocaleString('tr-TR') : '0'}
                                                    </p>
                                                </div>
                                                <div className={`${stat.bg} p-3 rounded-xl`}>
                                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Admin Tools */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    {[
                                        { id: 'users', title: 'Kullanıcı Yönetimi', icon: Users, desc: 'Tüm kullanıcıları listele ve düzenle' },
                                        { title: 'Uzman Başvuruları', icon: FileText, desc: 'Bekleyen başvuruları değerlendir' },
                                        { title: 'Sistem Ayarları', icon: Settings, desc: 'Platform parametrelerini güncelle' },
                                    ].map((tool, idx) => (
                                        <div key={idx} onClick={() => tool.id && setActiveTab(tool.id as DashboardTab)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-300 transition-all cursor-pointer">
                                            <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-gray-600">
                                                <tool.icon size={24} />
                                            </div>
                                            <h3 className="font-bold text-gray-900">{tool.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{tool.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <UserManagement />
                        )}

                        {activeTab === 'reference' && (
                            <ReferenceDataManagement />
                        )}

                        {activeTab === 'account' && (
                             <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h1 className="text-2xl font-bold text-gray-900">Yönetici Bilgileri</h1>
                                    <p className="text-gray-500 mt-1 font-medium">Sistem yöneticisi profil detayları</p>
                                </div>
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1"> AD</label>
                                            <input type="text" defaultValue={user?.firstName} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1"> SOYAD</label>
                                            <input type="text" defaultValue={user?.lastName} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">E-POSTA</label>
                                            <input type="email" defaultValue={user?.email} disabled className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-400 cursor-not-allowed" />
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-50">
                                        <button className="bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:bg-black transition-all">Kaydet</button>
                                    </div>
                                </div>
                             </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h1 className="text-2xl font-bold text-gray-900">Güvenlik Paneli</h1>
                                    <p className="text-gray-500 mt-1 font-medium">Yönetici şifre yönetimi</p>
                                </div>
                                <div className="max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">MEVCUT ŞİFRE</label>
                                            <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">YENİ ADMİN ŞİFRESİ</label>
                                            <input type="password" placeholder="Güçlü bir şifre seçin" className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900" />
                                        </div>
                                    </div>
                                    <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-red-100">
                                        <Lock size={20} />
                                        <span>Yönetici Şifresini Güncelle</span>
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

export default AdminDashboard;
