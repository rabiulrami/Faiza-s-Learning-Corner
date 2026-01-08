
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Eye, 
  Save, 
  Plus, 
  Type, 
  Image as ImageIcon, 
  Video, 
  List, 
  Paperclip, 
  Table as TableIcon, 
  Zap, 
  HelpCircle,
  Undo2,
  Redo2,
  MoreVertical,
  PlayCircle,
  CheckCircle,
  // Fix: Added missing icon imports
  RefreshCcw,
  Settings
} from 'lucide-react';

interface CourseEditorProps {
  onBack: () => void;
}

export const CourseEditor: React.FC<CourseEditorProps> = ({ onBack }) => {
  const [title, setTitle] = useState('Week 1 - Beginner - Introduction to Business Management');
  const [content, setContent] = useState('Hello my student! 👋 Economics isn\'t just a subject - it\'s the lens through which we view society. From micro to macroeconomics, I\'ll help you discover the keys to understanding economic phenomena in my comprehensive courses.');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [activeComponent, setActiveComponent] = useState('Video');
  
  const components = [
    { id: 'Image', icon: ImageIcon },
    { id: 'Gallery', icon: Plus },
    { id: 'Video', icon: Video },
    { id: 'List', icon: List },
    { id: 'Attachment', icon: Paperclip },
    { id: 'Table', icon: TableIcon },
    { id: 'Quiz', icon: HelpCircle },
    { id: 'Case Study', icon: Zap },
  ];

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('skillzone_courses') || '[]');
      // In a real app we'd find and update the specific course
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Top Bar */}
      <div className="bg-[#1A1C1E] p-6 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all border border-white/5"
            >
               <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
               <h3 className="font-black text-lg">Course Editor</h3>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isSaving ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span> 
                  {isSaving ? 'Saving changes...' : `Last saved: ${lastSaved?.toLocaleTimeString()}`}
               </p>
            </div>
         </div>
         <div className="flex gap-3">
           <button className="px-6 py-3 bg-white/10 text-white text-sm font-black rounded-2xl hover:bg-white/20 transition-all flex items-center gap-2 border border-white/5">
              <Eye className="w-4 h-4" /> Preview
           </button>
           <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-8 py-3 bg-[#9D72FF] text-white text-sm font-black rounded-2xl shadow-xl shadow-[#9D72FF]/20 flex items-center gap-2 hover:scale-105 transition-all ${isSaving ? 'opacity-50' : ''}`}
           >
              {isSaving ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saving...' : 'Publish Changes'}
           </button>
         </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-72 bg-white rounded-[40px] border border-gray-100 p-8 overflow-y-auto hidden xl:block shadow-sm">
           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">Lesson Components</h4>
           <div className="grid grid-cols-2 gap-4">
              {components.map(comp => (
                <button 
                  key={comp.id}
                  onClick={() => setActiveComponent(comp.id)}
                  className={`flex flex-col items-center gap-4 p-5 rounded-[28px] border-2 transition-all group ${
                    activeComponent === comp.id 
                      ? 'bg-gray-900 text-white border-gray-900 shadow-xl shadow-black/10 scale-[1.02]' 
                      : 'border-gray-50 text-gray-400 hover:border-gray-200'
                  }`}
                >
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeComponent === comp.id ? 'bg-white/10' : 'bg-gray-50 group-hover:bg-gray-100'}`}>
                      <comp.icon className="w-5 h-5" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest">{comp.id}</span>
                </button>
              ))}
           </div>
           
           <div className="mt-12 p-6 bg-emerald-50 rounded-[32px] border border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                 <CheckCircle className="w-4 h-4 text-emerald-500" />
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Quality Check</span>
              </div>
              <p className="text-[10px] text-emerald-800 font-medium leading-relaxed">Your lesson meets the marketplace standard for clarity and video quality.</p>
           </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-white rounded-[40px] border border-gray-100 flex flex-col overflow-hidden shadow-sm">
           <div className="p-10 border-b border-gray-50">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Lesson Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-black text-gray-900 w-full focus:outline-none placeholder:text-gray-100 bg-transparent"
              />
           </div>
           
           <div className="flex-1 p-10 overflow-y-auto space-y-10 scrollbar-hide">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Introductory Content</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-gray-600 leading-relaxed text-lg bg-gray-50/50 p-6 rounded-[28px] focus:outline-none focus:bg-white transition-all border-none resize-none min-h-[160px]"
                />
              </div>

              <div className="relative aspect-video rounded-[40px] overflow-hidden group shadow-2xl">
                 <img src="https://picsum.photos/seed/vid/1200/675" className="w-full h-full object-cover" alt="" />
                 <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all cursor-pointer">
                      <PlayCircle className="w-12 h-12 text-white fill-current" />
                    </div>
                 </div>
                 <div className="absolute bottom-10 left-10 right-10 flex items-center gap-6">
                    <div className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 shadow-xl">Video Active</div>
                    <h4 className="text-3xl font-black text-white drop-shadow-2xl">Lesson Overview Video</h4>
                 </div>
                 <button className="absolute top-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all">
                    <Settings className="w-5 h-5" />
                 </button>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h4 className="text-xl font-black text-gray-900">Curriculum Bullet Points</h4>
                    <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-[#9D72FF] transition-all"><Plus className="w-4 h-4" /></button>
                 </div>
                 <ul className="space-y-4">
                    {[
                      'Introduction to the ecosystem of global management.',
                      'Core foundations of business structures and tax implications.',
                      'Live case study: The rise and fall of market giants.'
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-4 items-start p-5 bg-gray-50/30 rounded-2xl border border-gray-50">
                         <div className="w-6 h-6 bg-[#9D72FF]/10 text-[#9D72FF] rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{idx + 1}</div>
                         <p className="text-sm font-semibold text-gray-600">{item}</p>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>

        {/* Inspector Area */}
        <div className="w-80 space-y-6 hidden 2xl:block">
           <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Settings</h4>
                 <Settings className="w-4 h-4 text-gray-300" />
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase block mb-3">Access Level</label>
                    <select className="w-full bg-gray-50 border-none rounded-2xl text-sm font-black p-4 focus:ring-2 focus:ring-[#9D72FF]/20">
                       <option>Everyone</option>
                       <option>Premium Only</option>
                       <option>Enrolled Only</option>
                    </select>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-50">
                       <label className="text-[8px] font-black text-gray-400 uppercase block mb-1">Time Goal</label>
                       <p className="text-sm font-black text-gray-900">45m</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-50">
                       <label className="text-[8px] font-black text-gray-400 uppercase block mb-1">Pass Grade</label>
                       <p className="text-sm font-black text-gray-900">80%</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Theme Accent</h4>
              <div className="grid grid-cols-5 gap-3">
                 {['#1A1C1E', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#9D72FF', '#FFFFFF'].map(c => (
                   <button key={c} className="w-8 h-8 rounded-lg border border-gray-100 hover:scale-110 transition-transform shadow-sm" style={{backgroundColor: c}}></button>
                 ))}
                 <button className="w-8 h-8 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-gray-400 transition-all">
                    <Plus className="w-4 h-4" />
                 </button>
              </div>
           </div>

           <div className="bg-gray-900 text-white rounded-[32px] p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between mb-6">
                 <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest">History</h4>
                 <HelpCircle className="w-4 h-4 opacity-30" />
              </div>
              <div className="flex gap-3">
                 <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex flex-col items-center gap-2 transition-all border border-white/5">
                    <Undo2 className="w-5 h-5 text-gray-400" />
                    <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Undo</span>
                 </button>
                 <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex flex-col items-center gap-2 transition-all border border-white/5">
                    <Redo2 className="w-5 h-5 text-gray-400" />
                    <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Redo</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
