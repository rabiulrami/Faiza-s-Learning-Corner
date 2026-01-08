
import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, PlayCircle, MoreVertical } from 'lucide-react';
import { Course } from '../types';

interface MyCoursesProps {
  onSelectCourse: (id: string) => void;
}

export const MyCourses: React.FC<MyCoursesProps> = ({ onSelectCourse }) => {
  const [filter, setFilter] = useState('All');

  const myCourses: Course[] = [
    {
      id: 'c1',
      title: 'AI & Virtual Reality Fundamentals',
      instructor: 'Patty Kutch',
      level: 'Intermediate',
      rating: 4.8,
      reviews: 120,
      students: 450,
      price: 0,
      image: 'https://picsum.photos/seed/ai/400/250',
      progress: 65,
      category: 'Design'
    },
    {
      id: 'c2',
      title: 'Photography Masterclass 2024',
      instructor: 'Jenny Wilson',
      level: 'Beginner',
      rating: 4.9,
      reviews: 85,
      students: 210,
      price: 0,
      image: 'https://picsum.photos/seed/photo/400/250',
      progress: 25,
      category: 'Art'
    },
    {
      id: 'c3',
      title: 'Advanced React Native Development',
      instructor: 'Ralph Legros',
      level: 'Advanced',
      rating: 4.7,
      reviews: 230,
      students: 890,
      price: 0,
      image: 'https://picsum.photos/seed/code/400/250',
      progress: 90,
      category: 'Development'
    }
  ];

  const filtered = filter === 'All' ? myCourses : myCourses.filter(c => c.category === filter);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900">My Courses</h2>
          <p className="text-sm text-gray-500">Continue your journey where you left off.</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Development', 'Design', 'Art'].map(tab => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === tab ? 'bg-[#9D72FF] text-white' : 'bg-white text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(course => (
          <div 
            key={course.id} 
            className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            onClick={() => onSelectCourse(course.id)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-widest">{course.category}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <PlayCircle className="w-16 h-16 text-white drop-shadow-2xl" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#9D72FF] uppercase tracking-widest">{course.level}</span>
                <MoreVertical className="w-4 h-4 text-gray-300" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-4 leading-tight h-14 line-clamp-2">{course.title}</h3>
              
              <div className="flex items-center gap-2 mb-6">
                 <img src={`https://picsum.photos/seed/${course.instructor}/32/32`} className="w-6 h-6 rounded-full" alt="" />
                 <span className="text-xs font-bold text-gray-500">{course.instructor}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-gray-900">{course.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#9D72FF]" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
