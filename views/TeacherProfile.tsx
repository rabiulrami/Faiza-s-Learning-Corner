
import React, { useState } from 'react';
import { ChevronLeft, Star, MessageSquare, PlayCircle, Clock, Calendar as CalendarIcon, MapPin, CheckCircle } from 'lucide-react';

interface TeacherProfileProps {
  id: string;
  onBack: () => void;
  onBookSuccess?: () => void;
  onOpenChat?: () => void;
}

export const TeacherProfile: React.FC<TeacherProfileProps> = ({ id, onBack, onBookSuccess, onOpenChat }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [activeTab, setActiveTab] = useState('About me');

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      alert('Success! Your trial lesson with Jenny has been requested.');
      onBookSuccess?.();
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Teachers
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
             <div className="flex flex-col md:flex-row gap-8">
                <img src="https://picsum.photos/seed/jenny/200/200" className="w-32 h-32 md:w-48 md:h-48 rounded-3xl object-cover ring-8 ring-gray-50" alt="" />
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">✓ TOP Tutor</span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                         <Star className="w-4 h-4 fill-current" /> 4.9 
                         <span className="text-gray-400 font-medium text-xs">(236 reviews)</span>
                      </div>
                   </div>
                   <h2 className="text-3xl font-black text-gray-900 mb-2">Jenny Wilson <span className="text-blue-500">✓</span></h2>
                   <p className="text-gray-500 font-medium mb-6">Instructor at Faiza's Learning Corner</p>
                   
                   <div className="flex flex-wrap gap-2 mb-6">
                      {["Economics", "Financial Theory", "Management"].map(t => (
                        <span key={t} className="px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-xl">{t}</span>
                      ))}
                   </div>

                   <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase mb-1">XP</p><p className="text-sm font-bold text-gray-900">8y+</p></div>
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Courses</p><p className="text-sm font-bold text-gray-900">24</p></div>
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Students</p><p className="text-sm font-bold text-gray-900">250+</p></div>
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Rating</p><p className="text-sm font-bold text-gray-900">4.9</p></div>
                   </div>
                </div>
             </div>
           </div>

           <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="flex border-b border-gray-50 overflow-x-auto scrollbar-hide">
                 {['About me', 'Schedule', 'Reviews (236)'].map((tab) => (
                   <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-4 transition-all whitespace-nowrap ${activeTab === tab ? 'text-[#9D72FF] border-[#9D72FF]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                   >
                     {tab}
                   </button>
                 ))}
              </div>
              <div className="p-10">
                 <h3 className="text-xl font-black text-gray-900 mb-6">{activeTab}</h3>
                 <p className="text-gray-500 leading-relaxed text-sm">
                    I believe that knowledge is power only when shared. Having been an instructor at the corner for over 3 years, I've seen students transform from beginners to industry professionals. My methods are research-driven but focused on real-world applications.
                 </p>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm sticky top-8">
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 group cursor-pointer shadow-lg">
                 <img src="https://picsum.photos/seed/vid/400/225" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center"><PlayCircle className="w-16 h-16 text-white drop-shadow-2xl" /></div>
              </div>

              <div className="flex items-center justify-between mb-8">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Hourly Rate</p>
                 <p className="text-4xl font-black text-gray-900">$32<span className="text-sm font-bold text-gray-400">/hr</span></p>
              </div>

              <div className="space-y-4 mb-8">
                 <button 
                  onClick={handleBook}
                  disabled={isBooking}
                  className="w-full py-5 bg-[#9D72FF] hover:bg-[#8A5CF5] text-white rounded-[24px] font-black shadow-xl shadow-[#9D72FF]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                    {isBooking ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <><CalendarIcon className="w-5 h-5" /> Book trial lesson</>}
                 </button>
                 <button 
                  onClick={onOpenChat}
                  className="w-full py-5 bg-gray-900 text-white hover:bg-black rounded-[24px] font-black transition-all flex items-center justify-center gap-3"
                 >
                    <MessageSquare className="w-5 h-5" /> Send message
                 </button>
              </div>

              <div className="pt-8 border-t border-gray-50 space-y-4">
                 <div className="flex items-center gap-3 text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Corner Instructor</span>
                 </div>
                 <div className="flex items-center gap-3 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Avg. reply: 2 hours</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
