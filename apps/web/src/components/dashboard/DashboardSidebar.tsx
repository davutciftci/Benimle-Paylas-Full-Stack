import React from 'react';
import { User, Lock, Calendar, ChevronRight, LogOut, LayoutDashboard, Briefcase, Clock, BookOpen } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export type DashboardTab =
  | 'dashboard'
  | 'profile'
  | 'account'
  | 'security'
  | 'appointments'
  | 'users'
  | 'workingHours'
  | 'reference';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const roleStr = typeof user?.role === 'string' ? user.role : (user?.role as any)?.name;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const baseMenuItems = [
    {
      id: 'account' as DashboardTab,
      label: 'Hesap Bilgileri',
      icon: User,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'security' as DashboardTab,
      label: 'Şifre Değiştirme',
      icon: Lock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'appointments' as DashboardTab,
      label: 'Randevular',
      icon: Calendar,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  let menuItems: any[] = [];

  const isExpert = roleStr?.toLowerCase() === 'expert';
  const isAdmin = roleStr?.toLowerCase() === 'admin';

  if (isExpert) {
    menuItems = [
      { id: 'dashboard' as DashboardTab, label: 'Genel Bakış', icon: LayoutDashboard, color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
      { id: 'appointments' as DashboardTab, label: 'Randevularım', icon: Calendar, color: 'text-green-500', bgColor: 'bg-green-50' },
      { id: 'profile' as DashboardTab, label: 'Uzmanlık & Profil', icon: Briefcase, color: 'text-purple-500', bgColor: 'bg-purple-50' },
      { id: 'workingHours' as DashboardTab, label: 'Çalışma Saatleri', icon: Clock, color: 'text-amber-500', bgColor: 'bg-amber-50' },
      { id: 'account' as DashboardTab, label: 'Hesap Bilgileri', icon: User, color: 'text-blue-500', bgColor: 'bg-blue-50' },
      { id: 'security' as DashboardTab, label: 'Şifre Değiştirme', icon: Lock, color: 'text-gray-500', bgColor: 'bg-gray-50' },
    ];
  } else {
    menuItems = [...baseMenuItems];
  }

  // Admine özel Kullanıcı Yönetimi sekmesi
  if (isAdmin) {
    menuItems.push({
      id: 'users' as DashboardTab,
      label: 'Kullanıcı Yönetimi',
      icon: User,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    });

    menuItems.push({
      id: 'reference' as DashboardTab,
      label: 'Referans Verileri',
      icon: BookOpen,
      color: 'text-teal-500',
      bgColor: 'bg-teal-50'
    });
  }

  return (
    <div className="w-full md:w-80 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full font-nunito">
      {/* User Header */}
      <div className="p-6 border-b border-gray-50 bg-linear-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <span className="text-xl font-bold uppercase">{user?.firstName?.charAt(0) || 'U'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">{`${user?.firstName} ${user?.lastName}`}</h3>
            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{roleStr === 'user' ? 'Danışan' : roleStr}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? `${item.bgColor} shadow-sm border-l-4 border-l-blue-500` 
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-white shadow-sm' : 'bg-gray-50'
                }`}>
                  <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-400 group-hover:text-gray-600'}`} />
                </div>
                <span className={`font-semibold text-sm ${isActive ? 'text-gray-900' : 'group-hover:text-gray-900'}`}>
                  {item.label}
                </span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-blue-500" />}
            </button>
          );
        })}
      </div>

      {/* Footer / Logout */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-300 font-semibold text-sm"
        >
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <LogOut className="w-5 h-5" />
          </div>
          <span>Oturumu Kapat</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
