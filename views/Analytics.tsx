
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { TrendingUp, Users, BookOpen, DollarSign, ArrowUpRight, ArrowDownRight, Award, Clock } from 'lucide-react';

const revenueData = [
  { name: 'Jan', rev: 4500, users: 400 },
  { name: 'Feb', rev: 5200, users: 450 },
  { name: 'Mar', rev: 4800, users: 600 },
  { name: 'Apr', rev: 6100, users: 780 },
  { name: 'May', rev: 5900, users: 820 },
  { name: 'Jun', rev: 7200, users: 950 },
];

const categoryData = [
  { name: 'Development', value: 400 },
  { name: 'Design', value: 300 },
  { name: 'Business', value: 300 },
  { name: 'Art', value: 200 },
];

const COLORS = ['#9D72FF', '#38BDF8', '#10B981', '#F59E0B'];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Platform Analytics</h2>
          <p className="text-sm text-gray-500 font-medium">Real-time data synchronization across all platform activities.</p>
        </div>
        <select className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-black shadow-sm outline-none focus:ring-2 focus:ring-[#9D72FF]/20">
          <option>Last 30 Days</option>
          <option>Last 6 Months</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$45,200', change: '+12.5%', up: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Active Learners', value: '12,400', change: '+8.2%', up: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'New Courses', value: '342', change: '-2.4%', up: false, icon: BookOpen, color: 'text-[#9D72FF]', bg: 'bg-[#9D72FF]/5' },
          { label: 'Avg. Rating', value: '4.85', change: '+0.1%', up: true, icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-lg ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-gray-900">Revenue & Growth</h3>
              <p className="text-sm text-gray-500 font-medium">Monthly trajectory of sales vs users</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#9D72FF] rounded-full"></div><span className="text-[10px] font-black uppercase text-gray-400">Revenue</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#38BDF8] rounded-full"></div><span className="text-[10px] font-black uppercase text-gray-400">Users</span></div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9D72FF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#9D72FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 700}} />
                <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="rev" stroke="#9D72FF" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="users" stroke="#38BDF8" strokeWidth={4} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-gray-900 mb-2">Category Split</h3>
          <p className="text-sm text-gray-500 font-medium mb-10">Course distribution by niche</p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-4xl font-black text-gray-900">1.2k</p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Items</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full mt-10">
               {categoryData.map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-tight">{item.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
