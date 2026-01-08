
import React, { useState, useEffect } from 'react';
import { ChevronLeft, PlayCircle, CheckCircle, Lock, MessageSquare, Download, Star, ChevronRight, Menu, X, RefreshCw } from 'lucide-react';

interface CoursePlayerProps {
  id: string;
  onBack: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ id, onBack }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState(65);
  const [isUpdating, setIsUpdating] = useState(false);

  const modules = [
    {
      title: 'Module 1: Getting Started',
      lessons: [
        { title: 'Introduction to the Course', duration: '5:20', completed: true, type: 'video' },
        { title: 'Setting up your environment', duration: '12:45', completed: true, type: 'video' },
        { title: 'Basic Concepts & Terminology', duration: '8:15', completed: false, type: 'video' }
      ]
    },
    {
      title: 'Module 2: Core Principles',
      lessons: [
        { title: 'Foundational Theory', duration: '15:30', completed: false, type: 'video' },
        { title: 'Practical Application 1', duration: '22:10', completed: false, type: 'video' },
        { title: 'Case Study: Real World Scenario', duration: '10:00', completed: false, type: 'quiz' }
      ]
    }
  ];

  const flattenedLessons = modules.flatMap(m => m.lessons);

  const handleNext = () => {
    if (currentLesson < flattenedLessons.length - 1) {
      setIsUpdating(true);
      setTimeout(() => {
        // Mock update progress
        const newProgress = Math.min(100, progress + 10);
        setProgress(newProgress);
        setCurrentLesson(currentLesson + 1);
        setIsUpdating(false);
      }, 500);
    } else {
      onBack(); // End of course
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white font-inter animate-in fade-in duration-500">
      {/* Navbar */}
      <nav className="h-20 border-b border-gray-100 px-8 flex items-center justify-between shrink-0 bg-white relative z-50">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 hover:bg-gray-50 rounded-2xl transition-all border border-gray-100 shadow-sm">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="hidden lg:block">
            <h1 className="text-base font-black text-gray-900">AI & Virtual Reality Fundamentals</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-0.5">Lesson {currentLesson + 1} • {flattenedLessons[currentLesson]?.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end gap-1 mr-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Progress: {progress}%</span>
                <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                  <div className="h-full bg-emerald-500 transition-all duration-1000 ease-out shadow-lg" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
           </div>
           <button 
             onClick={handleNext}
             disabled={isUpdating}
             className="px-8 py-3.5 bg-gray-900 text-white text-xs font-black rounded-2xl hover:bg-black transition-all flex items-center gap-3 shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50"
           >
              {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              {currentLesson === flattenedLessons.length - 1 ? 'Finish Course' : 'Complete & Next'}
           </button>
           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl lg:hidden text-gray-600">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
           </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-96' : 'w-0'} border-r border-gray-50 overflow-y-auto transition-all duration-500 shrink-0 lg:block bg-gray-50/20 scrollbar-hide relative z-40`}>
          <div className="p-8 space-y-10">
            {modules.map((mod, midx) => (
              <div key={midx}>
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{mod.title}</h3>
                   <span className="text-[10px] font-black text-gray-300 uppercase">{mod.lessons.length} Lessons</span>
                </div>
                <div className="space-y-2">
                  {mod.lessons.map((lesson, lidx) => {
                    const absIdx = modules.slice(0, midx).reduce((acc, m) => acc + m.lessons.length, 0) + lidx;
                    const isActive = currentLesson === absIdx;
                    return (
                      <button 
                        key={lidx}
                        onClick={() => setCurrentLesson(absIdx)}
                        className={`w-full flex gap-4 p-5 rounded-[28px] text-left transition-all border-2 relative group ${
                          isActive 
                            ? 'bg-white border-[#9D72FF]/20 shadow-xl shadow-[#9D72FF]/5' 
                            : 'border-transparent hover:bg-white/50'
                        }`}
                      >
                        <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                          lesson.completed || absIdx < currentLesson 
                            ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' 
                            : isActive ? 'bg-[#9D72FF] text-white shadow-lg' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {lesson.completed || absIdx < currentLesson ? <CheckCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-black truncate transition-colors ${isActive ? 'text-[#9D72FF]' : 'text-gray-900'}`}>{lesson.title}</p>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                             {lesson.duration} • <span className="text-[#9D72FF]">{lesson.type}</span>
                          </p>
                        </div>
                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#9D72FF] rounded-r-full"></div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Player Content */}
        <div className="flex-1 overflow-y-auto bg-[#F9FAFB] scrollbar-hide">
          <div className="max-w-5xl mx-auto p-10 space-y-10">
             {/* Video Area */}
             <div className="aspect-video bg-black rounded-[48px] overflow-hidden shadow-2xl relative group border-[12px] border-white ring-1 ring-gray-100">
                <img src={`https://picsum.photos/seed/lesson${currentLesson}/1280/720`} className="w-full h-full object-cover opacity-80 transition-transform duration-[2000ms] group-hover:scale-105" alt="" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                   <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all cursor-pointer shadow-2xl">
                     <PlayCircle className="w-14 h-14 text-white fill-current drop-shadow-2xl" />
                   </div>
                </div>
                {/* Custom Controls Mockup */}
                <div className="absolute bottom-10 left-10 right-10 flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                   <div className="flex-1 h-2 bg-white/20 backdrop-blur-md rounded-full overflow-hidden border border-white/10">
                      <div className="h-full bg-[#9D72FF] w-1/3 shadow-xl"></div>
                   </div>
                   <span className="text-white text-[10px] font-black uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-xl backdrop-blur-md">12:45 / 24:00</span>
                </div>
             </div>

             {/* Content Area */}
             <div className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-sm space-y-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div>
                     <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2">{flattenedLessons[currentLesson]?.title}</h2>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                           <img src="https://picsum.photos/seed/patty/40/40" className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100" alt="" />
                           <span className="text-sm font-black text-gray-900">Patty Kutch</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1.5 text-amber-500 text-xs font-black">
                           <Star className="w-4 h-4 fill-current" /> 4.9 <span className="text-gray-400 font-bold ml-1">(2.4k students)</span>
                        </div>
                     </div>
                   </div>
                   <div className="flex gap-3">
                      <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-[20px] transition-all text-gray-400 hover:text-gray-900 border border-gray-50 shadow-sm"><Download className="w-5 h-5" /></button>
                      <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-[20px] transition-all text-gray-400 hover:text-gray-900 border border-gray-50 shadow-sm"><MessageSquare className="w-5 h-5" /></button>
                   </div>
                </div>

                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
                   <p className="text-lg font-medium">
                      In this section, we dive deep into the foundations of the subject. We'll explore how modern techniques are applied in professional environments and what pitfalls to avoid during the early stages of development.
                   </p>
                   <div className="p-10 bg-gray-50 rounded-[40px] border border-gray-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><CheckCircle className="w-24 h-24" /></div>
                      <h4 className="font-black text-gray-900 mb-6 text-xl">Key Learning Objectives</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0 m-0">
                         {[
                           'Architectural system design and logic',
                           'Optimizing high-performance workflows',
                           'Mastering professional-grade toolsets',
                           'Security protocols for digital environments'
                         ].map((item, i) => (
                           <li key={i} className="flex gap-4 items-center bg-white p-5 rounded-2xl border border-gray-50 shadow-sm group-hover:translate-y-[-4px] transition-transform">
                              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                              <span className="text-sm font-black text-gray-700">{item}</span>
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>

                <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-50">
                   <button 
                    onClick={() => currentLesson > 0 && setCurrentLesson(currentLesson - 1)}
                    disabled={currentLesson === 0}
                    className="flex items-center gap-3 text-sm font-black text-gray-400 hover:text-gray-900 transition-all disabled:opacity-20"
                   >
                      <ChevronLeft className="w-5 h-5" /> Previous Lesson
                   </button>
                   <button 
                    onClick={handleNext}
                    className="flex items-center gap-3 text-sm font-black text-[#9D72FF] hover:text-[#8A5CF5] transition-all active:scale-95"
                   >
                      Next Lesson <ChevronRight className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
