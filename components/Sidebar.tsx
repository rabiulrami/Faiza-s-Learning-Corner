
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  MessageSquare, 
  BarChart3, 
  CreditCard, 
  LifeBuoy, 
  Settings,
  GraduationCap,
  LogOut,
  HelpCircle,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { View, User } from '../types';

interface SidebarProps {
  currentView: View;
  user: User | null;
  onViewChange: (view: View) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, user, onViewChange, onLogout }) => {
  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    
    // Admin Only
    { id: View.USER_MANAGEMENT, label: 'Users Control', icon: ShieldCheck, role: 'admin' },
    
    // Student items (also visible to Admin)
    { id: View.COURSES, label: 'My Courses', icon: BookOpen, role: 'student' },
    { id: View.TEACHERS, label: 'Teachers', icon: Users, role: 'student' },
    
    // Teacher items (also visible to Admin)
    { id: View.ANALYTICS, label: 'Analytics', icon: BarChart3, role: 'teacher' },
    { id: View.QUIZ_BUILDER, label: 'Quiz Builder', icon: HelpCircle, role: 'teacher' },
    { id: View.COURSE_EDITOR, label: 'Course Editor', icon: Briefcase, role: 'teacher' },
    
    // Shared items
    { id: View.MESSAGES, label: 'Messages', icon: MessageSquare, badge: 8 },
    { id: View.PAYMENTS, label: 'Payments & Settings', icon: CreditCard },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (isAdmin) return true;
    if (!item.role) return true;
    return item.role === user?.role;
  });

  return (
    <div className="w-64 h-full bg-[#1A1C1E] text-white flex flex-col shrink-0 font-inter">
      {/* Logo - Functional Branding */}
      <button 
        onClick={() => onViewChange(View.DASHBOARD)}
        className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity text-left"
      >
        <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg shadow-black/20">
          <GraduationCap className="text-[#9D72FF] w-6 h-6" />
        </div>
        <div>
          <span className="text-sm font-black tracking-tight leading-tight block">Faiza's Learning</span>
          <span className="text-[10px] font-bold text-[#9D72FF] uppercase tracking-[0.2em] opacity-80">Corner</span>
        </div>
      </button>

      {/* Main Nav */}
      <nav className="flex-1 px-4 mt-4 overflow-y-auto scrollbar-hide">
        <ul className="space-y-1">
          {filteredMenuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  currentView === item.id 
                    ? 'bg-[#9D72FF] text-white font-bold shadow-lg shadow-[#9D72FF]/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-white' : ''}`} />
                <span className="flex-1 text-left text-xs font-semibold">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full min-w-[20px] text-center ${
                    currentView === item.id ? 'bg-white text-[#9D72FF]' : 'bg-[#9D72FF] text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {isStudent && (
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#9D72FF]/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-[#9D72FF]/20 transition-all duration-700"></div>
            <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
               <GraduationCap className="text-[#9D72FF] w-5 h-5" />
            </div>
            <h4 className="text-sm font-black mb-1">Want to teach?</h4>
            <p className="text-[10px] text-gray-400 mb-4 font-medium leading-relaxed">Upgrade to a personal teacher account and share your knowledge.</p>
            <button 
              className="w-full py-2.5 bg-[#9D72FF]/10 hover:bg-[#9D72FF]/20 text-[#9D72FF] text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-[#9D72FF]/20"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Bottom Nav */}
      <div className="px-4 pb-6 space-y-1 mt-auto">
        <button
          onClick={() => onViewChange(View.SETTINGS)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="text-xs font-semibold">Settings</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-all mt-4 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-[0.15em]">Log Out</span>
        </button>
      </div>
    </div>
  );
};
