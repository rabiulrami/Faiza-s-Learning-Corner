
import React from 'react';
import { Search, Bell } from 'lucide-react';
import { View, User } from '../types';

interface HeaderProps {
  currentView: View;
  user: User | null;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, user, onProfileClick }) => {
  const getTitle = () => {
    switch (currentView) {
      case View.DASHBOARD: return 'Dashboard';
      case View.TEACHERS: return 'Teachers';
      case View.TEACHER_PROFILE: return 'Teacher Profile';
      case View.COURSES: return 'My Courses';
      case View.MESSAGES: return 'Chat';
      case View.PAYMENTS: return 'Settings';
      case View.COURSE_EDITOR: return 'Course Editor';
      case View.STUDENT_PROFILE: return 'Student Profile';
      default: return 'Skillzone';
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-8 flex-1">
        <h1 className="text-2xl font-bold text-gray-900 min-w-max">{getTitle()}</h1>
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for courses, teachers, etc." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#9D72FF]/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        {user && (
          <button 
            onClick={onProfileClick}
            className="flex items-center gap-3 pl-4 border-l border-gray-100 group text-left"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#9D72FF] transition-colors">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100 group-hover:ring-[#9D72FF]/50 transition-all"
            />
          </button>
        )}
      </div>
    </header>
  );
};
