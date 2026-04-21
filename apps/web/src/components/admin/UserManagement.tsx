import React, { useState, useEffect } from 'react';
import { User, Shield, UserX, Check } from 'lucide-react';
import { http } from '../../services/api';

// Tip tanımları
interface AppUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await http.get('/users');
      setUsers(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Kullanıcıları çekerken hata:', err);
      setError(err.response?.data?.message || 'Kullanıcı listesi alınamadı');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await http.patch(`/users/${userId}/role`, { role: newRole });
      
      setActionSuccess('Rol başarıyla güncellendi.');
      setTimeout(() => setActionSuccess(null), 3000);
      
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err: any) {
      alert('Rol güncellenemedi: ' + (err.response?.data?.message || err.message));
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500 font-medium">Kullanıcılar yükleniyor...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 font-nunito">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
          <p className="text-gray-500 mt-1 font-medium">Platformdaki tüm üyeleri görün ve rollerini düzenleyin.</p>
        </div>
        <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl flex items-center gap-2">
          <UsersIcon className="w-5 h-5" />
          <span className="font-bold">{users.length} Kayıtlı</span>
        </div>
      </div>

      {actionSuccess && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-center space-x-2">
          <Check size={18} />
          <span className="font-semibold text-sm">{actionSuccess}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 font-bold">Kullanıcı</th>
                <th className="px-6 py-4 font-bold">İletişim</th>
                <th className="px-6 py-4 font-bold">Kayıt Tarihi</th>
                <th className="px-6 py-4 font-bold">Yetki / Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-xl bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold shadow-xs border border-gray-200">
                        {u.firstName.charAt(0)}{u.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{u.firstName} {u.lastName}</p>
                        <p className="text-xs text-gray-500">ID: #{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{u.email}</p>
                    <p className="text-xs text-gray-500">{u.phone || 'Telefon yok'}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {new Date(u.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className={`text-sm font-bold border-2 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-offset-1 focus:outline-none transition-all cursor-pointer ${
                        u.role === 'admin' ? 'bg-red-50 text-red-700 border-red-200 focus:ring-red-500' :
                        u.role === 'expert' ? 'bg-purple-50 text-purple-700 border-purple-200 focus:ring-purple-500' :
                        'bg-primary/10 text-primary border-primary/20 focus:ring-primary'
                      }`}
                    >
                      <option value="user" className="font-medium">Danışan (Kullanıcı)</option>
                      <option value="expert" className="font-medium">Uzman (Psikolog)</option>
                      <option value="admin" className="font-medium">Yönetici (Admin)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center justify-center text-gray-500 space-y-3">
              <UserX className="w-12 h-12 text-gray-300" />
              <p className="font-medium">Sistemde henüz hiçbir kullanıcı bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
