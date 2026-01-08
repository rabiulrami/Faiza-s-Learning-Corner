
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuizViewProps {
  onComplete: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const h = Math.floor(m / 60);
    return `${h.toString().padStart(2, '0')} : ${ (m % 60).toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  };

  const steps = [1, 2, 3, 4, 5, 6];

  return (
    <div className="max-w-6xl mx-auto h-full flex gap-8">
      {/* Sidebar Progress */}
      <div className="w-80 shrink-0 hidden lg:block">
        <div className="bg-[#1A1C1E] rounded-3xl p-6 text-white h-full flex flex-col">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
             <ChevronLeft className="w-4 h-4" /> Hide
          </button>
          
          <div className="mb-6">
             <h2 className="text-lg font-bold mb-1">Sample exam 2024_Business</h2>
             <div className="flex items-center gap-2 mt-2">
                <img src="https://picsum.photos/seed/jenny/32/32" className="w-6 h-6 rounded-full" alt="" />
                <span className="text-xs text-gray-400">Jenny Wilson</span>
             </div>
          </div>

          <div className="flex-1 space-y-4">
            {steps.map(s => (
              <div 
                key={s} 
                className={`p-4 rounded-2xl cursor-pointer transition-all ${
                  currentStep === s 
                    ? 'bg-[#9D72FF] text-white' 
                    : s < currentStep 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-white/5 text-gray-400'
                }`}
                onClick={() => setCurrentStep(s)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Quiz {s}</span>
                  {s < currentStep && <CheckCircle2 className="w-3 h-3" />}
                </div>
                <p className="text-xs font-semibold line-clamp-1">
                   {s === 1 ? 'Which of the following scenarios is likely to cause...' : s === 2 ? 'A nation with a trade surplus is said to have...' : `Question ${s} details...`}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-black/40 rounded-3xl p-6">
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Timer</p>
            <div className="flex gap-2 justify-center">
              {formatTime(timeLeft).split('').map((char, i) => (
                <div key={i} className={`text-2xl font-mono font-bold ${char === ':' ? 'text-[#9D72FF]' : 'bg-white/5 w-8 h-10 flex items-center justify-center rounded-lg'}`}>
                  {char}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col">
        <div className="flex items-center justify-between mb-8">
           <div>
              <p className="text-xs font-bold text-[#9D72FF] uppercase tracking-widest mb-1">Lesson 2 of 2</p>
              <h3 className="text-lg font-bold text-gray-900">Week 1 - Beginner - Introduction to Business Management Success</h3>
           </div>
           <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-bold text-gray-700 transition-colors">Next lesson</button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="mb-6">
             <p className="text-sm font-semibold text-gray-400 mb-2">Quiz {currentStep} out of 6</p>
             <p className="text-gray-600 mb-6">Provide an answer by selecting 'true' if you agree with the statement or 'false' if you disagree.</p>
             <h4 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
                A nation with a trade surplus is said to have a favourable trade position.
             </h4>
             
             {/* Quiz Media - Map as shown in image 11 */}
             <div className="w-full aspect-video rounded-3xl overflow-hidden mb-8">
                <img src="https://picsum.photos/seed/map/800/400" className="w-full h-full object-cover" alt="World Map" />
             </div>

             <div className="space-y-4">
                {[
                  { id: 1, label: 'TRUE' },
                  { id: 2, label: 'FALSE' }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`w-full p-6 text-left rounded-2xl border-2 transition-all font-bold tracking-wide ${
                      selectedOption === opt.id 
                        ? 'border-[#9D72FF] bg-[#9D72FF]/5 text-[#9D72FF]' 
                        : 'border-gray-100 hover:border-gray-200 text-gray-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-100 flex items-center justify-between">
           <button className="px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-bold text-gray-600 transition-colors">Finish quiz</button>
           <button 
            onClick={() => {
              if(currentStep < 6) setCurrentStep(s => s + 1);
              else onComplete();
              setSelectedOption(null);
            }}
            className="px-8 py-3 bg-[#9D72FF] hover:bg-[#8A5CF5] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#9D72FF]/20 flex items-center gap-2"
           >
             Next question <ChevronRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
};
