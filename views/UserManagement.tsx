
import React, { useState, useEffect } from 'react';
import { User as UserIcon, Shield, Search, MoreVertical, Trash2, Edit3, UserCheck, Mail, Filter, Download, Plus } from 'lucide-react';
import { User } from '../types';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'teacher' | 'student'>('all');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('skillzone_users') || '[]');
    setUsers(storedUsers);
  }, []);

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to remove this user? This action cannot be undone.')) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      localStorage.setItem('skillzone_users', JSON.stringify(updated));
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500 font-medium">Manage permissions, roles, and accounts across the platform.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl shadow-black/10">
            <Plus className="w-4 h-4" /> Add New User
          </button>
          <button className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
            <Download className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#9D72FF]/20 transition-all font-medium"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['all', 'admin', 'teacher', 'student'].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filterRole === r 
                    ? 'bg-[#9D72FF] text-white shadow-lg shadow-[#9D72FF]/20' 
                    : 'bg-gray-50 text-gray-400 hover:text-gray-600'
                }`}
              >
                {r}s
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Profile</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={u.avatar} className="w-12 h-12 rounded-[18px] object-cover ring-2 ring-gray-100 group-hover:ring-[#9D72FF]/30 transition-all" alt="" />
                        {u.role === 'admin' && <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"><Shield className="w-2.5 h-2.5 text-white" /></div>}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      u.role === 'admin' ? 'bg-red-50 text-red-600 border-red-100' :
                      u.role === 'teacher' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-gray-600">Active</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold text-gray-400">Oct 24, 2023</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#9D72FF] hover:bg-[#9D72FF]/5 rounded-xl transition-all"><Edit3 className="w-4 h-4" /></button>
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
               <UserIcon className="w-10 h-10" />
            </div>
            <p className="text-gray-500 font-bold text-lg">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
