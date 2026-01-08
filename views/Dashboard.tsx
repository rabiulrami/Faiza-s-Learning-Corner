
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';
import { ChevronRight, TrendingUp, BookOpen, Clock, Users, Shield, Award, DollarSign, PlusCircle } from 'lucide-react';
import { User, View } from '../types';

interface DashboardProps {
  onContinueLearning?: (courseId: string) => void;
  onViewAllRecommendations?: () => void;
  onViewAllMyCourses?: () => void;
  onNavigate?: (view: View) => void;
}

const productivityData = [
  { name: 'Mon', mentoring: 40, self: 30, student: 20 },
  { name: 'Tue', mentoring: 60, rev: 200, student: 40 },
  { name: 'Wed', mentoring: 35, rev: 550, student: 30 },
  { name: 'Thu', mentoring: 50, rev: 400, student: 45 },
  { name: 'Fri', mentoring: 45, rev: 350, student: 50 },
  { name: 'Sat', mentoring: 30, rev: 600, student: 20 },
  { name: 'Sun', mentoring: 20, rev: 400, student: 70 },
];

export const Dashboard: React.FC<DashboardProps> = ({ 
  onContinueLearning, 
  onViewAllRecommendations,
  onViewAllMyCourses,
  onNavigate
}) => {
  const user: User = JSON.parse(localStorage.getItem('skillzone_session') || '{}');
  const role = user.role;

  // --- ADMIN VIEW ---
  if (role === 'admin') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-gradient-to-br from-[#1A1C1E] to-[#2D3135] p-10 rounded-[48px] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#9D72FF] rounded-full filter blur-[100px] opacity-10 -mr-40 -mt-40 transition-all group-hover:opacity-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 shadow-xl">
                  <Shield className="text-[#9D72FF] w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Admin Panel</h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Overview • Faiza's Learning Corner</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div><p className="text-4xl font-black">$452k</p><p className="text-[10px] text-gray-500 font-bold uppercase mt-2">Annual Revenue</p></div>
                <div><p className="text-4xl font-black">4.8k</p><p className="text-[10px] text-gray-500 font-bold uppercase mt-2">Monthly Orders</p></div>
                <div><p className="text-4xl font-black">22</p><p className="text-[10px] text-gray-500 font-bold uppercase mt-2">Active Regions</p></div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8"><h3 className="font-black text-gray-900">User Growth</h3><TrendingUp className="w-5 h-5 text-emerald-500" /></div>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={productivityData}><Area type="monotone" dataKey="student" stroke="#9D72FF" strokeWidth={3} fill="#9D72FF" fillOpacity={0.1} /></AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8"><h3 className="font-black text-gray-900">Revenue Stream</h3><DollarSign className="w-5 h-5 text-blue-500" /></div>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productivityData}><Bar dataKey="mentoring" fill="#38BDF8" radius={[4, 4, 0, 0]} /></BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </section>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-8">System Health</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Instructor Approvals', count: 18, color: 'text-amber-500', bg: 'bg-amber-50' },
                   { label: 'New Tickets', count: 9, color: 'text-red-500', bg: 'bg-red-50' },
                   { label: 'Platform Uptime', count: '99.9%', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-[24px] border border-gray-50 bg-gray-50/30">
                      <p className="text-xs font-bold text-gray-700">{item.label}</p>
                      <span className={`px-2.5 py-1 ${item.bg} ${item.color} rounded-lg text-[10px] font-black`}>{item.count}</span>
                   </div>
                 ))}
              </div>
              <button 
                onClick={() => onNavigate?.(View.USER_MANAGEMENT)}
                className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl text-xs font-black shadow-lg hover:bg-black transition-all"
              >
                Go to User Management
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- TEACHER VIEW ---
  if (role === 'teacher') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
        <div className="lg:col-span-2 space-y-8">
          <section className="flex flex-wrap gap-4">
             {[
               { label: 'Total Earnings', value: '$18,620', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
               { label: 'Active Students', value: '1,240', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
               { label: 'Rating', value: '4.95', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
             ].map((card, i) => (
               <div key={i} className="flex-1 min-w-[200px] bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-6">
                  <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center`}><card.icon className="w-7 h-7" /></div>
                  <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{card.label}</p><p className="text-2xl font-black text-gray-900">{card.value}</p></div>
               </div>
             ))}
          </section>

          <section className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-10">
               <div><h3 className="text-xl font-black text-gray-900">Student Enrollment</h3><p className="text-sm text-gray-500 font-medium">Daily statistics of your corner</p></div>
               <button className="text-[10px] font-black text-[#9D72FF] uppercase hover:underline">Full Analytics</button>
             </div>
             <div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={productivityData}><Area type="stepAfter" dataKey="rev" stroke="#9D72FF" strokeWidth={3} fill="#9D72FF" fillOpacity={0.05} /></AreaChart></ResponsiveContainer></div>
          </section>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100"><PlusCircle className="w-10 h-10 text-gray-300" /></div>
              <h3 className="text-lg font-black text-gray-900 mb-2">Build Your Content</h3>
              <p className="text-sm text-gray-500 font-medium mb-8">Grow your community by sharing new lessons or tests.</p>
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate?.(View.COURSE_EDITOR)}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl text-xs font-black hover:bg-black transition-all shadow-xl shadow-black/10"
                >
                  Open Course Editor
                </button>
                <button 
                  onClick={() => onNavigate?.(View.QUIZ_BUILDER)}
                  className="w-full py-4 bg-white border border-gray-100 text-gray-900 rounded-2xl text-xs font-black hover:bg-gray-50 transition-all"
                >
                  Create New Quiz
                </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- STUDENT VIEW (DEFAULT) ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recommended for you</h3>
            <button onClick={onViewAllRecommendations} className="text-[#9D72FF] text-sm font-semibold flex items-center gap-1 hover:underline">View all <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow" onClick={() => onContinueLearning?.('c'+i)}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-3">
                  <img src={`https://picsum.photos/seed/faiza${i}/400/250`} alt="Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white"><Clock className="w-4 h-4" /></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Faiza Pick</span><span className="flex items-center gap-1 text-[11px] font-medium text-amber-500">★ 4.9</span></div>
                  <h4 className="font-bold text-gray-900 leading-tight">{i === 1 ? 'Mastering Python Fundamentals in 3 Months' : "The Elite Guide to Business Management"}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-900">In Progress</h3><button onClick={onViewAllMyCourses} className="text-[#9D72FF] text-sm font-semibold hover:underline">My Courses</button></div>
          <div className="space-y-3">
            {[
              { id: 'c1', title: 'AI & Virtual Reality Fundamentals', sessions: '9/12', icon: '🎮', progress: 75 },
              { id: 'c2', title: 'Photography Masterclass', sessions: '4/24', icon: '📸', progress: 15 }
            ].map((course, idx) => (
              <div 
                key={idx} 
                className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 hover:border-[#9D72FF]/30 transition-all cursor-pointer group"
                onClick={() => onContinueLearning?.(course.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 group-hover:bg-[#9D72FF]/10 transition-colors rounded-xl flex items-center justify-center text-xl">{course.icon}</div>
                  <div><h5 className="font-bold text-sm text-gray-900 group-hover:text-[#9D72FF]">{course.title}</h5><p className="text-xs text-gray-500">Progress: {course.progress}%</p></div>
                </div>
                <div className="w-24 h-1.5 bg-gray-50 rounded-full overflow-hidden"><div className="h-full bg-[#9D72FF]" style={{width: course.progress+'%'}}></div></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6"><h3 className="font-bold text-gray-900">Learning Calendar</h3><span className="text-[10px] font-black uppercase text-gray-400">Week 14</span></div>
          <div className="flex justify-between mb-8">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase">{d}</span>
                <div className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold ${i === 4 ? 'bg-[#9D72FF] text-white shadow-lg shadow-[#9D72FF]/20' : 'text-gray-900 hover:bg-gray-50'}`}>{23 + i}</div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-[#9D72FF]/20 transition-all cursor-pointer">
             <div className="flex justify-between items-start mb-2"><h5 className="text-sm font-bold text-gray-900">Economics Exam</h5><span className="px-2 py-0.5 bg-red-50 text-red-500 text-[8px] font-black uppercase rounded">Critical</span></div>
             <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> 15:00 - 16:30</p>
          </div>
        </div>
      </div>
    </div>
  );
};
