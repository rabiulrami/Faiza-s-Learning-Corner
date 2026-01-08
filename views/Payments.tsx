
import React, { useState } from 'react';
import { CreditCard, MoreVertical, Plus, Filter, Download, CheckCircle2, Clock, XCircle, RefreshCcw, Bell, Lock as LockIcon, User as UserIcon, Shield } from 'lucide-react';

export const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Payment details');
  
  const tabs = [
    { id: 'My details', icon: UserIcon },
    { id: 'Password', icon: LockIcon },
    { id: 'Payment details', icon: CreditCard },
    { id: 'Notification', icon: Bell }
  ];
  
  const transactions = [
    { id: '#3066', date: 'Apr 19, 2024', status: 'Paid', product: 'Business Prospect Analysis', instructor: 'Lana Steiner', card: '***3139', logo: 'mastercard' },
    { id: '#3064', date: 'Feb 27, 2024', status: 'Paid', product: 'Python Development Course', instructor: 'Jenny Wilson', card: '***5320', logo: 'visa' },
    { id: '#3062', date: 'Feb 15, 2024', status: 'Refunded', product: 'Business Prospect Analysis', instructor: 'Lana Steiner', card: '***1325', logo: 'mastercard' },
    { id: '#3060', date: 'Jan 4, 2024', status: 'Cancelled', product: 'Economics: Introduction', instructor: 'Carole Towne', card: '***4613', logo: 'visa' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'My details':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">First Name</label>
                <input type="text" defaultValue="Cynthia" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#9D72FF]/20 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Name</label>
                <input type="text" defaultValue="Smith" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#9D72FF]/20 font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
              <input type="email" defaultValue="cynthia@mit.edu" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#9D72FF]/20 font-bold" />
            </div>
            <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-black/10">Update Profile</button>
          </div>
        );
      case 'Password':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#9D72FF]/20 font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#9D72FF]/20 font-bold" />
            </div>
            <button className="px-8 py-4 bg-[#9D72FF] text-white rounded-2xl font-black text-sm hover:bg-[#8A5CF5] transition-all shadow-xl shadow-[#9D72FF]/20">Reset Password</button>
          </div>
        );
      case 'Notification':
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
             {[
               { title: 'New Course Enrollment', desc: 'Notify me when a student joins my course', default: true },
               { title: 'Message Alerts', desc: 'Receive emails for new direct messages', default: true },
               { title: 'Platform Updates', desc: 'Periodic news about Skillzone features', default: false }
             ].map((n, i) => (
               <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-[32px] border border-gray-100">
                  <div>
                    <h4 className="text-sm font-black text-gray-900">{n.title}</h4>
                    <p className="text-xs text-gray-400 font-medium">{n.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${n.default ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${n.default ? 'left-7' : 'left-1'}`}></div>
                  </div>
               </div>
             ))}
          </div>
        );
      case 'Payment details':
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="aspect-[1.6/1] bg-black rounded-3xl p-6 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <CreditCard className="w-32 h-32" />
                </div>
                <div className="flex justify-between items-start mb-12">
                  <div>
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Bankname</p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-white/20 rounded-full"></div>)}
                      </div>
                  </div>
                  <div className="flex items-center gap-1.5 opacity-50">
                      <div className="w-3 h-3 border border-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Cynthia Smith</p>
                    <p className="font-mono text-sm tracking-[0.2em]">1234 1234 1234 1234</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">06/27</p>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-[#EB001B]"></div>
                      <div className="w-6 h-6 rounded-full bg-[#F79E1B]/80"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="aspect-[1.6/1] bg-[#CBB5FF] rounded-3xl p-6 text-gray-900 relative overflow-hidden">
                <div className="flex justify-between items-start mb-12">
                  <p className="text-[10px] font-bold text-gray-900/50 uppercase tracking-widest">Bankname</p>
                  <div className="w-6 h-4 border-2 border-gray-900/10 rounded"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-gray-900/50 uppercase tracking-widest mb-1">Cynthia Smith</p>
                    <p className="font-mono text-sm tracking-[0.2em]">1234 1234 1234 1234</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-900/50 uppercase tracking-widest mb-1">10/28</p>
                    <p className="text-[10px] font-black italic text-blue-900">VISA</p>
                  </div>
                </div>
              </div>

              {/* Add New Card */}
              <button className="aspect-[1.6/1] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 hover:border-[#9D72FF] hover:bg-gray-50 transition-all group">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-[#9D72FF]/10 transition-colors">
                  <Plus className="w-5 h-5 text-gray-400 group-hover:text-[#9D72FF]" />
                </div>
                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600">Add new card</span>
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Sub-tabs */}
      <div className="flex gap-10 border-b border-gray-100 overflow-x-auto pb-px">
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-black transition-all shrink-0 border-b-4 flex items-center gap-2 ${
              activeTab === tab.id ? 'text-[#9D72FF] border-[#9D72FF]' : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.id}
          </button>
        ))}
      </div>

      {/* Main Content Management */}
      <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xl font-black text-gray-900">{activeTab}</h3>
            <p className="text-sm text-gray-500 font-medium">Configure and manage your platform preferences and security.</p>
          </div>
          {activeTab === 'Payment details' && (
            <div className="flex gap-2">
              <button className="px-6 py-2.5 text-sm font-black text-gray-400 hover:bg-gray-50 rounded-xl transition-all">Cancel</button>
              <button className="px-8 py-2.5 text-sm font-black bg-gray-900 text-white rounded-xl shadow-xl shadow-black/10 hover:bg-black transition-all">Save Changes</button>
            </div>
          )}
        </div>

        {renderTabContent()}
      </section>

      {/* Transaction History (Always visible at bottom for clarity) */}
      <section className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
              <h3 className="text-xl font-black text-gray-900">Transaction History</h3>
              <p className="text-sm text-gray-500 font-medium">View and download your invoices for accounting.</p>
           </div>
           <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-100 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">
                <Filter className="w-4 h-4" /> Filters
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-black hover:bg-black transition-all shadow-lg shadow-black/10">
                <Download className="w-4 h-4" /> Export CSV
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoice</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 transition-colors cursor-pointer group">
                  <td className="px-10 py-6 font-black text-sm text-gray-900">{tx.id}</td>
                  <td className="px-10 py-6 text-sm text-gray-500 font-medium">{tx.date}</td>
                  <td className="px-10 py-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      tx.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                      tx.status === 'Refunded' ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-red-500'
                    }`}>
                      {tx.status === 'Paid' ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                        tx.status === 'Refunded' ? <RefreshCcw className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {tx.status}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#9D72FF]/10 transition-colors">
                        <Download className="w-4 h-4 text-gray-300 group-hover:text-[#9D72FF]" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 leading-tight mb-0.5">{tx.product}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instructor: {tx.instructor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className={`text-[10px] font-black italic ${tx.logo === 'visa' ? 'text-blue-800' : 'text-orange-500'}`}>
                          {tx.logo.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400 font-mono font-bold">{tx.card}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-gray-50 flex items-center justify-between">
          <button className="px-6 py-2 border border-gray-100 rounded-xl text-xs font-black text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all">Previous</button>
          <div className="flex items-center gap-2">
             {[1, 2, 3].map((p, i) => (
               <button key={i} className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${p === 1 ? 'bg-[#9D72FF] text-white shadow-lg shadow-[#9D72FF]/20' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                 {p}
               </button>
             ))}
          </div>
          <button className="px-6 py-2 border border-gray-100 rounded-xl text-xs font-black text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all">Next</button>
        </div>
      </section>
    </div>
  );
};
