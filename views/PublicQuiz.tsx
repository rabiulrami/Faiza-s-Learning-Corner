
import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, Trophy, CheckCircle2, AlertCircle, GraduationCap } from 'lucide-react';

export const PublicQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 mins
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const quiz = {
    title: "Business Strategy Public Assessment",
    questions: [
      {
        id: '1',
        text: 'Which of the following scenarios is likely to cause a significant shift in market equilibrium?',
        options: [
          { id: '1a', text: 'A sudden increase in consumer demand' },
          { id: '1b', text: 'Seasonal fluctuations in supply' },
          { id: '1c', text: 'Routine maintenance of production machinery' },
        ]
      },
      {
        id: '2',
        text: 'A nation with a trade surplus is said to have a favourable trade position.',
        options: [
          { id: '2t', text: 'TRUE' },
          { id: '2f', text: 'FALSE' },
        ]
      }
    ]
  };

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const rs = s % 60;
    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: rs.toString().padStart(2, '0')
    };
  };

  const timeParts = formatTime(timeLeft);

  if (isFinished) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 font-inter">
        <div className="max-w-xl w-full text-center space-y-8 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-xl shadow-emerald-100/50">
              <CheckCircle2 className="w-12 h-12" />
           </div>
           <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Assessment Completed</h2>
              <p className="text-gray-500 font-medium">Your response has been submitted successfully to the instructor. You may now close this window.</p>
           </div>
           <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 grid grid-cols-2 gap-8">
              <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Time Spent</p><p className="text-xl font-black text-gray-900">04:22</p></div>
              <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p><p className="text-xl font-black text-emerald-500">Submitted</p></div>
           </div>
           <button onClick={() => window.location.href = '/'} className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-black/10 hover:bg-black transition-all">
              Go to Home Page
           </button>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[step];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-inter">
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm relative z-10">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#9D72FF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#9D72FF]/20"><GraduationCap className="w-6 h-6" /></div>
            <div className="hidden sm:block">
               <h1 className="text-lg font-black text-gray-900">Skillzone Assessment</h1>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Public Session • {quiz.title}</p>
            </div>
         </div>
         
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="flex gap-1.5">
                  {[timeParts.h, timeParts.m, timeParts.s].map((part, i) => (
                    <React.Fragment key={i}>
                       <div className="w-10 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white text-xl font-mono font-black shadow-lg">
                          {part}
                       </div>
                       {i < 2 && <span className="text-xl font-black text-gray-300 self-center">:</span>}
                    </React.Fragment>
                  ))}
               </div>
               <div className="ml-2 hidden lg:block">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time Remaining</p>
                  <p className="text-[10px] font-bold text-red-500 animate-pulse">Live Countdown</p>
               </div>
            </div>
         </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
         <div className="max-w-4xl w-full py-8">
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="h-2 bg-gray-100"><div className="h-full bg-gradient-to-r from-[#9D72FF] to-[#38BDF8] transition-all duration-1000 ease-out" style={{ width: `${((step + 1) / quiz.questions.length) * 100}%` }}></div></div>
               
               <div className="p-10 md:p-16">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                       <span className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Question {step + 1} of {quiz.questions.length}</span>
                       {timeLeft < 300 && <span className="px-3 py-1 bg-red-50 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse border border-red-100">Low Time</span>}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-100">
                       <Trophy className="w-4 h-4 text-amber-500" />
                       <span className="text-xs font-black text-amber-700">10 Points</span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-black text-gray-900 mb-12 leading-tight">{currentQ.text}</h2>

                  <div className="space-y-4">
                     {currentQ.options.map((opt, idx) => (
                       <button 
                         key={opt.id}
                         onClick={() => setSelectedOption(opt.id)}
                         className={`w-full p-6 text-left rounded-3xl border-2 transition-all group flex items-center gap-4 active:scale-[0.98] ${
                           selectedOption === opt.id ? 'border-[#9D72FF] bg-[#9D72FF]/5 ring-4 ring-[#9D72FF]/5' : 'border-gray-50 hover:border-gray-200 hover:bg-gray-50'
                         }`}
                       >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black border transition-all duration-300 ${
                            selectedOption === opt.id ? 'bg-[#9D72FF] text-white border-[#9D72FF] shadow-lg shadow-[#9D72FF]/30' : 'bg-white text-gray-400 border-gray-100 group-hover:border-gray-300'
                          }`}>
                             {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={`text-base font-bold transition-colors ${selectedOption === opt.id ? 'text-gray-900' : 'text-gray-600'}`}>{opt.text}</span>
                       </button>
                     ))}
                  </div>

                  <div className="mt-16 pt-10 border-t border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-gray-400">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Answer required to proceed</span>
                     </div>
                     <button 
                       onClick={() => {
                         if (step < quiz.questions.length - 1) {
                           setStep(s => s + 1);
                           setSelectedOption(null);
                         } else {
                           setIsFinished(true);
                         }
                       }}
                       disabled={!selectedOption}
                       className="px-12 py-5 bg-[#9D72FF] text-white rounded-[24px] text-sm font-black shadow-2xl shadow-[#9D72FF]/30 hover:bg-[#8A5CF5] hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
                     >
                       {step === quiz.questions.length - 1 ? 'Finish Assessment' : 'Next Question'}
                       <ChevronRight className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
            <div className="mt-12 flex flex-col items-center gap-4">
               <div className="flex gap-2">
                  {quiz.questions.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-12 bg-[#9D72FF]' : 'w-3 bg-gray-200'}`}></div>
                  ))}
               </div>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Skillzone Public Exam Protocol 1.4.0</p>
            </div>
         </div>
      </main>
    </div>
  );
};
