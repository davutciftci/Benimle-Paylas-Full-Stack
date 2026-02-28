import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAppointmentStore } from '../store/appointmentStore';
import { useExpertStore } from '../store/expertStore';
import { Calendar, Heart, User, Clock, Search, Star, Lock, Settings, Mail, Phone, ShieldCheck } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DashboardSidebar, { DashboardTab } from '../components/dashboard/DashboardSidebar';

const UserDashboardPage: React.FC = () => {
    const { user, fetchMe } = useAuthStore();
    const { appointments, fetchUserAppointments, isLoading } = useAppointmentStore();
    const { experts, fetchExperts } = useExpertStore();
    const [favorites, setFavorites] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<DashboardTab>('appointments');

    const [accountData, setAccountData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

    const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccountData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveAccount = async () => {
        if (!user) return;
        setIsSaving(true);
        setSaveMessage({ type: '', text: '' });
        try {
            const { http } = await import('../services/api');
            await http.patch('/users/me', accountData);
            await fetchMe();
            setSaveMessage({ type: 'success', text: 'Hesap bilgileriniz güncellendi.' });
        } catch (error) {
            setSaveMessage({ type: 'error', text: 'Hesap bilgileri güncellenemedi.' });
        } finally {
            setIsSaving(false);
        }
    };

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
            fetchUserAppointments(String(user.id));
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    // Randevuları filtrele
    const upcomingAppointments = appointments.filter(
        (apt) => (apt.status === 'confirmed' || apt.status === 'pending') && new Date(apt.date) > new Date()
    );
    
    const pastAppointments = appointments.filter(
        (apt) => apt.status === 'completed' || new Date(apt.date) < new Date()
    );

    // Favori uzmanları al
    const favoriteExperts = experts.filter((expert) => favorites.includes(expert.id));

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
                        
                        {/* Tab Content: Appointments */}
                        {activeTab === 'appointments' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {/* Header */}
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">Randevularım</h1>
                                        <p className="text-gray-500 mt-1 font-medium">Tüm randevu geçmişinizi ve yaklaşan seanslarınızı yönetin</p>
                                    </div>
                                    <Link
                                        to="/find-therapist"
                                        className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all flex items-center space-x-2"
                                    >
                                        <Search size={18} />
                                        <span>Yeni Randevu</span>
                                    </Link>
                                </div>

                                {/* Quick Stats Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { title: 'Toplam Randevu', val: appointments.length, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
                                        { title: 'Yaklaşan Seans', val: upcomingAppointments.length, icon: Clock, color: 'text-green-500', bg: 'bg-green-50' },
                                        { title: 'Geçmiş Seans', val: pastAppointments.length, icon: Star, color: 'text-orange-500', bg: 'bg-orange-50' },
                                        { title: 'Favori Uzmanlar', val: favorites.length, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                                <p className="text-2xl font-black text-gray-900 mt-1">{stat.val}</p>
                                            </div>
                                            <div className={`${stat.bg} p-3 rounded-xl`}>
                                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Upcoming Appointments List */}
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                            <div className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></div>
                                            Yaklaşan Randevular
                                        </h2>
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">
                                            {upcomingAppointments.length} Bekleyen
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        {upcomingAppointments.length === 0 ? (
                                            <div className="text-center py-10">
                                                <div className="w-16 h-16 bg-blue-50 text-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Calendar size={32} />
                                                </div>
                                                <p className="text-gray-500 font-bold">Henüz yaklaşan bir randevunuz yok</p>
                                                <Link to="/find-therapist" className="text-blue-500 text-sm font-bold mt-2 inline-block hover:underline">Şimdi uzman keşfet</Link>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {upcomingAppointments.map((apt) => {
                                                    const expert = experts.find(e => e.id === Number(apt.expertId));
                                                    return (
                                                        <div key={apt.id} className="group flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all duration-300">
                                                            <div className="flex items-center space-x-5">
                                                                <div className="relative">
                                                                    <img src={expert?.profilePhotoUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} alt={expert?.user?.firstName} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm" />
                                                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{expert?.user?.firstName} {expert?.user?.lastName}</h4>
                                                                    <p className="text-xs text-gray-500 font-medium">{expert?.degree?.name || 'Uzman'}</p>
                                                                    <div className="flex items-center mt-2 space-x-3">
                                                                        <div className="flex items-center text-xs text-gray-600 font-bold bg-gray-100 px-2 py-1 rounded-md">
                                                                            <Calendar size={12} className="mr-1.5 text-blue-500" />
                                                                            {new Date(apt.date).toLocaleDateString('tr-TR')}
                                                                        </div>
                                                                        <div className="flex items-center text-xs text-gray-600 font-bold bg-gray-100 px-2 py-1 rounded-md">
                                                                            <Clock size={12} className="mr-1.5 text-purple-500" />
                                                                            {apt.timeSlot.start}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-end space-y-2">
                                                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                                                    apt.sessionType === 'online' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'
                                                                }`}>
                                                                    {apt.sessionType === 'online' ? '🌐 ONLINE' : '👥 YÜZ YÜZE'}
                                                                </span>
                                                                <button className="text-xs font-bold text-blue-500 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Detaylar</button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Past Appointments */}
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                     <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                                        <h2 className="text-lg font-bold text-gray-900">Geçmiş Randevular</h2>
                                    </div>
                                    <div className="p-6">
                                        {pastAppointments.length === 0 ? (
                                            <p className="text-center text-gray-500 py-6 text-sm">Geçmiş randevu kaydı bulunamadı</p>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {pastAppointments.slice(0, 4).map((apt) => (
                                                    <div key={apt.id} className="p-4 bg-gray-50 rounded-2xl flex items-center space-x-4 opacity-70 grayscale hover:grayscale-0 transition-all cursor-default">
                                                        <img src={experts.find(e => e.id === Number(apt.expertId))?.profilePhotoUrl || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} className="w-12 h-12 rounded-xl object-cover" />
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-900">{experts.find(e => e.id === Number(apt.expertId))?.user?.firstName}</p>
                                                            <p className="text-[10px] font-bold text-gray-500 uppercase">{new Date(apt.date).toLocaleDateString('tr-TR')}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab Content: Account Information */}
                        {activeTab === 'account' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h1 className="text-2xl font-bold text-gray-900">Hesap Bilgileri</h1>
                                    <p className="text-gray-500 mt-1 font-medium">Kişisel bilgilerinizi buradan görüntüleyebilir ve güncelleyebilirsiniz</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">AD</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input type="text" name="firstName" value={accountData.firstName} onChange={handleAccountChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">SOYAD</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input type="text" name="lastName" value={accountData.lastName} onChange={handleAccountChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">E-POSTA</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input type="email" value={user?.email || ''} disabled className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 font-semibold text-gray-400 cursor-not-allowed" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">TELEFON</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input type="tel" name="phone" value={accountData.phone} onChange={handleAccountChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                                    </div>
                                                </div>
                                            </div>
                                            {saveMessage.text && activeTab === 'account' && (
                                                <div className={`p-4 rounded-xl text-sm font-bold ${saveMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                                    {saveMessage.text}
                                                </div>
                                            )}
                                            <div className="pt-4 border-t border-gray-50">
                                                <button onClick={handleSaveAccount} disabled={isSaving} className="bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:bg-black transition-all disabled:opacity-70">
                                                    {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                                            <ShieldCheck className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
                                            <h3 className="text-xl font-black mb-4">Profil Durumu</h3>
                                            <p className="text-blue-100 text-sm font-medium mb-6 leading-relaxed">Profiliniz şu anda aktif ve randevu alabilir durumdasınız.</p>
                                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center space-x-3">
                                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                                <span className="text-sm font-bold uppercase tracking-wider">DOĞRULANMIŞ HESAP</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab Content: Security */}
                        {activeTab === 'security' && (
                             <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h1 className="text-2xl font-bold text-gray-900">Şifre Değiştirme</h1>
                                    <p className="text-gray-500 mt-1 font-medium">Hesap güvenliğiniz için şifrenizi düzenli olarak güncelleyin</p>
                                </div>

                                <div className="max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                                    <div className="space-y-5">
                                        {[
                                            { label: 'MEVCUT ŞİFRE', placeholder: '••••••••' },
                                            { label: 'YENİ ŞİFRE', placeholder: 'En az 8 karakter' },
                                            { label: 'YENİ ŞİFRE TEKRAR', placeholder: 'Tekrar girin' }
                                        ].map((field, i) => (
                                            <div key={i} className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">{field.label}</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input type="password" placeholder={field.placeholder} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2">
                                            <ShieldCheck size={20} />
                                            <span>Şifreyi Güncelle</span>
                                        </button>
                                    </div>
                                </div>
                             </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;
