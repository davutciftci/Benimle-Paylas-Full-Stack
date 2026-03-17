import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppointmentStore } from '../../store/appointmentStore';
import { Calendar, User, Clock, Star, Lock } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardSidebar, { DashboardTab } from '../../components/dashboard/DashboardSidebar';

const ExpertDashboard: React.FC = () => {
    const { user, fetchMe } = useAuthStore();
    const { appointments, fetchExpertAppointments, isLoading } = useAppointmentStore();
    const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');

    // Hesap Güncelleme State
    const [accountData, setAccountData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
    });

    // Profil Güncelleme State
    const [profileData, setProfileData] = useState({
        bio: user?.expertProfile?.bio || '',
        university: user?.expertProfile?.university || '',
        fieldOfStudy: user?.expertProfile?.fieldOfStudy || '',
        graduationYear: user?.expertProfile?.graduationYear || new Date().getFullYear(),
        licenseNumber: user?.expertProfile?.licenseNumber || '',
        profilePhotoUrl: user?.expertProfile?.profilePhotoUrl || '',
        price: (user?.expertProfile as any)?.price || '',
        yearsOfExperience: user?.expertProfile?.yearsOfExperience || 0,
        specialtyIds: (user?.expertProfile as any)?.specialties?.map((s: any) => s.id) || [] as number[],
        therapeuticApproachIds: (user?.expertProfile as any)?.therapeuticApproaches?.map((t: any) => t.id) || [] as number[],
        seminars: (user?.expertProfile as any)?.seminars || [] as any[],
        degreeId: user?.expertProfile?.degreeId || '',
        titleId: (user?.expertProfile as any)?.titleId || '',
        workingHours: (user?.expertProfile as any)?.workingHours || {
            monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: []
        }
    });

    const [specialtiesList, setSpecialtiesList] = useState<{id: number, name: string}[]>([]);
    const [degreesList, setDegreesList] = useState<{id: number, name: string}[]>([]);
    const [titlesList, setTitlesList] = useState<{id: number, name: string}[]>([]);
    const [approachesList, setApproachesList] = useState<{id: number, name: string}[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
    const [photoPreview, setPhotoPreview] = useState<string>(user?.expertProfile?.profilePhotoUrl || '');
    const photoInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user?.expertProfile?.id) {
            fetchExpertAppointments(user.expertProfile.id.toString());
        }
        // Uzmanlık, Ekol ve Derece bilgilerini çek
        const fetchFilters = async () => {
            try {
                const { http } = await import('../../services/api');
                const [specRes, degRes, titleRes, appRes] = await Promise.all([
                    http.get('/experts/specialties'),
                    http.get('/experts/degrees'),
                    http.get('/experts/titles'),
                    http.get('/experts/therapeutic-approaches')
                ]);
                setSpecialtiesList(specRes.data);
                setDegreesList(degRes.data);
                setTitlesList(titleRes.data);
                setApproachesList(appRes.data);
            } catch (err) {
                console.error("Filtreler yüklenemedi", err);
            }
        };
        fetchFilters();
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

    const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccountData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                    name === 'price' ? Number(value) : value
        }));
    };

    const toggleSpecialty = (id: number) => {
        setProfileData(prev => ({
            ...prev,
            specialtyIds: prev.specialtyIds.includes(id) 
                ? prev.specialtyIds.filter((sId: number) => sId !== id)
                : [...prev.specialtyIds, id]
        }));
    };

    const toggleApproach = (id: number) => {
        setProfileData(prev => ({
            ...prev,
            therapeuticApproachIds: prev.therapeuticApproachIds.includes(id) 
                ? prev.therapeuticApproachIds.filter((tId: number) => tId !== id)
                : [...prev.therapeuticApproachIds, id]
        }));
    };

    const addSeminar = () => {
        setProfileData(prev => ({
            ...prev,
            seminars: [...prev.seminars, { title: '', description: '', date: '' }]
        }));
    };

    const updateSeminar = (index: number, field: string, value: string) => {
        setProfileData(prev => {
            const newSeminars = [...prev.seminars];
            newSeminars[index] = { ...newSeminars[index], [field]: value };
            return { ...prev, seminars: newSeminars };
        });
    };

    const removeSeminar = (index: number) => {
        setProfileData(prev => {
            const newSeminars = [...prev.seminars];
            newSeminars.splice(index, 1);
            return { ...prev, seminars: newSeminars };
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
                const maxWidth = 800;
                const ratio = Math.min(1, maxWidth / img.width);
                const canvas = document.createElement('canvas');
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                const compressed = canvas.toDataURL('image/jpeg', 0.75);
                setPhotoPreview(compressed);
                setProfileData(prev => ({ ...prev, profilePhotoUrl: compressed }));
            };
            img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleRemovePhoto = () => {
        setPhotoPreview('');
        setProfileData(prev => ({ ...prev, profilePhotoUrl: '' }));
        if (photoInputRef.current) photoInputRef.current.value = '';
    };

    const handleSaveAccount = async () => {
        if (!user) return;
        setIsSaving(true);
        setSaveMessage({ type: '', text: '' });
        try {
            const { http } = await import('../../services/api');
            await http.patch('/users/me', accountData);
            await fetchMe();
            setSaveMessage({ type: 'success', text: 'Hesap bilgileriniz başarıyla güncellendi.' });
        } catch (error) {
            setSaveMessage({ type: 'error', text: 'Hesap bilgileri güncellenemedi.' });
        } finally {
            setIsSaving(false);
        }
    };

    /** Sadece uzmanlık & profil alanlarını kaydeder (çalışma saatleri hariç) */
    const handleSaveProfile = async () => {
        if (!user?.expertProfile?.id) {
            setSaveMessage({ type: 'error', text: 'Uzman profil bilginiz bulunamadı. Lütfen oturumu kapatıp tekrar açın.' });
            return;
        }
        setIsSaving(true);
        setSaveMessage({ type: '', text: '' });
        try {
            const { api } = await import('../../services/api');
            const res = await api.experts.update(user.expertProfile.id.toString(), {
                bio: profileData.bio,
                university: profileData.university,
                fieldOfStudy: profileData.fieldOfStudy,
                degreeId: profileData.degreeId ? Number(profileData.degreeId) : undefined,
                titleId: profileData.titleId ? Number(profileData.titleId) : undefined,
                graduationYear: Number(profileData.graduationYear),
                licenseNumber: profileData.licenseNumber,
                yearsOfExperience: Number(profileData.yearsOfExperience),
                price: Number(profileData.price) || undefined,
                profilePhotoUrl: profileData.profilePhotoUrl,
                specialtyIds: profileData.specialtyIds,
                therapeuticApproachIds: profileData.therapeuticApproachIds,
                seminars: profileData.seminars,
            });
            if (res.success) {
                await fetchMe();
                setSaveMessage({ type: 'success', text: 'Profil bilgileriniz kaydedildi.' });
            } else {
                setSaveMessage({ type: 'error', text: res.error || 'Güncelleme hatası' });
            }
        } catch {
            setSaveMessage({ type: 'error', text: 'Sistem hatası oluştu' });
        } finally {
            setIsSaving(false);
        }
    };

    /** Sadece çalışma saatlerini kaydeder */
    const handleSaveWorkingHours = async () => {
        if (!user?.expertProfile?.id) {
            setSaveMessage({ type: 'error', text: 'Uzman profil bilginiz bulunamadı.' });
            return;
        }
        setIsSaving(true);
        setSaveMessage({ type: '', text: '' });
        try {
            const { api } = await import('../../services/api');
            const res = await api.experts.update(user.expertProfile.id.toString(), {
                workingHours: profileData.workingHours,
            });
            if (res.success) {
                await fetchMe();
                setSaveMessage({ type: 'success', text: 'Çalışma saatleri kaydedildi.' });
            } else {
                setSaveMessage({ type: 'error', text: res.error || 'Güncelleme hatası' });
            }
        } catch {
            setSaveMessage({ type: 'error', text: 'Sistem hatası oluştu' });
        } finally {
            setIsSaving(false);
        }
    };

    const daysOfWeek = [
        { key: 'monday', label: 'Pazartesi' },
        { key: 'tuesday', label: 'Salı' },
        { key: 'wednesday', label: 'Çarşamba' },
        { key: 'thursday', label: 'Perşembe' },
        { key: 'friday', label: 'Cuma' },
        { key: 'saturday', label: 'Cumartesi' },
        { key: 'sunday', label: 'Pazar' },
    ];

    const addTimeSlot = (day: string) => {
        setProfileData(prev => ({
            ...prev,
            workingHours: {
                ...prev.workingHours,
                [day]: [...(prev.workingHours[day as keyof typeof prev.workingHours] || []), { time: '09:00' }]
            }
        }));
    };

    const updateTimeSlot = (day: string, index: number, value: string) => {
        setProfileData(prev => {
            const newDaySlots = [...(prev.workingHours[day as keyof typeof prev.workingHours] || [])];
            newDaySlots[index] = { time: value };
            return {
                ...prev,
                workingHours: { ...prev.workingHours, [day]: newDaySlots }
            };
        });
    };

    const removeTimeSlot = (day: string, index: number) => {
        setProfileData(prev => {
            const newDaySlots = [...(prev.workingHours[day as keyof typeof prev.workingHours] || [])];
            newDaySlots.splice(index, 1);
            return {
                ...prev,
                workingHours: { ...prev.workingHours, [day]: newDaySlots }
            };
        });
    };

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
            value: user?.expertProfile?.rating?.toFixed(1) || '0.0',
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

                                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
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
                                    <p className="text-gray-500 mt-1 font-medium">Uzman temel hesap bilgileri</p>
                                </div>
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">AD</label>
                                            <input type="text" name="firstName" value={accountData.firstName} onChange={handleAccountChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">SOYAD</label>
                                            <input type="text" name="lastName" value={accountData.lastName} onChange={handleAccountChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">E-POSTA</label>
                                            <input type="email" value={user?.email || ''} disabled className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-400 cursor-not-allowed" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">TELEFON</label>
                                            <input type="tel" name="phone" value={accountData.phone} onChange={handleAccountChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                    </div>
                                    {saveMessage.text && activeTab === 'account' && (
                                        <div className={`p-4 rounded-xl text-sm font-bold ${saveMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {saveMessage.text}
                                        </div>
                                    )}
                                    <div className="pt-4 border-t border-gray-50">
                                        <button onClick={handleSaveAccount} disabled={isSaving} className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                                            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h1 className="text-2xl font-bold text-gray-900">Uzmanlık & Profil Bilgileri</h1>
                                    <p className="text-gray-500 mt-1 font-medium">Biyografi, eğitim, uzmanlık alanları ve çalışma saatleri.</p>
                                </div>
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">KISA BİYOGRAFİ (BİO)</label>
                                            <textarea name="bio" value={profileData.bio} onChange={handleProfileChange} rows={3} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">UZMANLIK ALANLARI</label>
                                            <div className="flex flex-wrap gap-3 mt-2">
                                                {specialtiesList.map(spec => {
                                                    const isSelected = profileData.specialtyIds.includes(spec.id);
                                                    return (
                                                        <button 
                                                            key={`spec-${spec.id}`} 
                                                            onClick={() => toggleSpecialty(spec.id)}
                                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                                        >
                                                            {spec.name}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">ÇALIŞMA EKOLLERİ</label>
                                            <div className="flex flex-wrap gap-3 mt-2">
                                                {approachesList.map(tApp => {
                                                    const isSelected = profileData.therapeuticApproachIds.includes(tApp.id);
                                                    return (
                                                        <button 
                                                            key={`tApp-${tApp.id}`} 
                                                            onClick={() => toggleApproach(tApp.id)}
                                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                                        >
                                                            {tApp.name}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">ÜNİVERSİTE</label>
                                            <input type="text" name="university" value={profileData.university} onChange={handleProfileChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">BÖLÜM</label>
                                            <input type="text" name="fieldOfStudy" value={profileData.fieldOfStudy} onChange={handleProfileChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">UZMAN ÜNVANI</label>
                                            <select name="titleId" value={(profileData as any).titleId || ''} onChange={handleProfileChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500">
                                                <option value="">Seçiniz</option>
                                                {titlesList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">MEZUNİYET DERECESİ (TİPİ)</label>
                                            <select name="degreeId" value={(profileData as any).degreeId || ''} onChange={handleProfileChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500">
                                                <option value="">Seçiniz</option>
                                                {degreesList.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">MEZUNİYET YILI</label>
                                            <input type="number" name="graduationYear" value={profileData.graduationYear} onChange={handleProfileChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">MESLEK LİSANS NUMARASI</label>
                                            <input type="text" name="licenseNumber" value={profileData.licenseNumber} onChange={handleProfileChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">DENEYİM (YIL)</label>
                                            <input type="number" name="yearsOfExperience" value={profileData.yearsOfExperience} onChange={handleProfileChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">SEANS ÜCRETİ (₺)</label>
                                            <input type="number" name="price" value={profileData.price} onChange={handleProfileChange} className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">PROFİL FOTOĞRAFI</label>
                                            <div className="flex items-center gap-6 mt-2">
                                                {/* Avatar Preview */}
                                                <div className="relative flex-shrink-0">
                                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md bg-gray-100 flex items-center justify-center">
                                                        {photoPreview ? (
                                                            <img src={photoPreview} alt="Profil" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-3xl font-bold text-gray-300">
                                                                {user?.firstName?.charAt(0) || 'U'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => photoInputRef.current?.click()}
                                                        className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-2 shadow-lg hover:bg-indigo-700 transition-all"
                                                        title="Fotoğraf Değiştir"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </button>
                                                    <input
                                                        ref={photoInputRef}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handlePhotoChange}
                                                        className="hidden"
                                                    />
                                                </div>
                                                {/* Text info */}
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700">Profil fotoğrafınızı yükleyin</p>
                                                    <p className="text-xs text-gray-400 mt-1">JPG, PNG desteklenir. Maksimum 2MB önerilir.</p>
                                                    <div className="mt-3 flex flex-wrap items-center gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => photoInputRef.current?.click()}
                                                            className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                                                        >
                                                            Fotoğraf Seç veya Değiştir
                                                        </button>
                                                        {photoPreview && (
                                                            <button
                                                                type="button"
                                                                onClick={handleRemovePhoto}
                                                                className="text-sm font-bold text-red-600 hover:text-red-800 transition-colors"
                                                            >
                                                                Profil Fotoğrafını Sil
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1 flex justify-between items-center">
                                                SEMİNER VE KONFERANSLAR
                                                <button onClick={addSeminar} className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1 font-bold">
                                                    <span className="text-lg">+</span> Ekle
                                                </button>
                                            </label>
                                            <div className="space-y-4">
                                                {profileData.seminars.map((seminar: any, index: number) => (
                                                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative space-y-3">
                                                        <button onClick={() => removeSeminar(index)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                        </button>
                                                        <div>
                                                            <input type="text" placeholder="Seminer/Konferans Adı" value={seminar.title} onChange={(e) => updateSeminar(index, 'title', e.target.value)} className="w-full bg-gray-50 border-none rounded-lg py-2 px-3 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 pr-10" />
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <input type="text" placeholder="Açıklama (İsteğe Bağlı)" value={seminar.description || ''} onChange={(e) => updateSeminar(index, 'description', e.target.value)} className="w-2/3 bg-gray-50 border-none rounded-lg py-2 px-3 font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500" />
                                                            <input type="date" value={seminar.date ? seminar.date.split('T')[0] : ''} onChange={(e) => updateSeminar(index, 'date', e.target.value)} className="w-1/3 bg-gray-50 border-none rounded-lg py-2 px-3 font-semibold text-gray-500 focus:ring-2 focus:ring-blue-500" />
                                                        </div>
                                                    </div>
                                                ))}
                                                {profileData.seminars.length === 0 && (
                                                    <p className="text-sm text-gray-400 italic font-medium px-2 py-1">Henüz seminer veya konferans eklemediniz.</p>
                                                )}
                                            </div>
                                        </div>
                                        {/* Çalışma Saatleri sekmesi için ayrıştırıldı */}

                                    </div>
                                    {saveMessage.text && activeTab === 'profile' && (
                                        <div className={`p-4 rounded-xl text-sm font-bold ${saveMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {saveMessage.text}
                                        </div>
                                    )}
                                    <div className="pt-4 border-t border-gray-50">
                                        <button onClick={handleSaveProfile} disabled={isSaving} className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                                            {isSaving ? 'Kaydediliyor...' : 'Profil Bilgilerini Kaydet'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'workingHours' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h1 className="text-2xl font-bold text-gray-900">Çalışma Saatleri & Müsaitlik</h1>
                                    <p className="text-gray-500 mt-1 font-medium">Danışanların randevu oluşturabileceği online ve yüz yüze çalışma saatlerinizi belirleyin.</p>
                                </div>
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                                    <div className="grid gap-4">
                                        {daysOfWeek.map(day => {
                                            const slots = profileData.workingHours[day.key as keyof typeof profileData.workingHours] || [];
                                            return (
                                                <div key={day.key} className="flex flex-col sm:flex-row sm:items-start p-5 bg-gray-50 rounded-2xl border border-gray-100 gap-4 hover:shadow-sm transition-all duration-300">
                                                    <div className="w-32 pt-2">
                                                        <span className="font-extrabold text-sm text-gray-800 tracking-wide">{day.label}</span>
                                                    </div>
                                                    <div className="flex-1 space-y-3">
                                                        {slots.length === 0 ? (
                                                            <span className="text-sm text-gray-400 font-bold italic bg-gray-100 px-3 py-1.5 rounded-lg border border-dashed border-gray-300 inline-block">Kapalı / Çalışmıyor</span>
                                                        ) : (
                                                            slots.map((slot: any, index: number) => (
                                                                <div key={index} className="flex flex-wrap items-center gap-3">
                                                                    <input 
                                                                        type="time" 
                                                                        value={slot.time || slot.start || ''} 
                                                                        onChange={(e) => updateTimeSlot(day.key, index, e.target.value)}
                                                                        className="border border-gray-300 rounded-xl py-2 px-3 text-sm font-bold bg-gray-200 text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-inner"
                                                                    />
                                                                    <button 
                                                                        onClick={() => removeTimeSlot(day.key, index)}
                                                                        title="Saatı sil"
                                                                        className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-xl transition-all shadow-sm border border-red-100 bg-white"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            ))
                                                        )}
                                                        <div>
                                                            <button 
                                                                onClick={() => addTimeSlot(day.key)}
                                                                className="text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-extrabold hover:bg-amber-100 hover:text-amber-700 uppercase tracking-wider flex items-center gap-1 mt-2 transition-colors shadow-sm"
                                                            >
                                                                <span className="text-lg leading-none">+</span> Saat Ekle
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {saveMessage.text && activeTab === 'workingHours' && (
                                        <div className={`p-4 rounded-xl text-sm font-bold ${saveMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {saveMessage.text}
                                        </div>
                                    )}
                                    <div className="pt-4 border-t border-gray-50 flex justify-end">
                                        <button onClick={handleSaveWorkingHours} disabled={isSaving} className="bg-amber-500 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-amber-500/30 hover:bg-amber-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
                                            {isSaving ? 'Kaydediliyor...' : 'Çalışma Saatlerini Kaydet'}
                                        </button>
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
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">YENİ ŞİFRE (TEKRAR)</label>
                                            <input type="password" placeholder="Yeni şifreyi tekrar girin" className="w-full bg-gray-50 border-none rounded-2xl py-3.5 px-4 font-semibold text-gray-900" />
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
