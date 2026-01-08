
import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Settings, 
  ChevronLeft, 
  Save, 
  GripVertical,
  Type,
  CheckSquare,
  AlignLeft,
  Clock,
  Target,
  ChevronDown,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronRight,
  Layout,
  Trophy,
  AlertCircle,
  Share2,
  Copy,
  Check,
  X,
  Globe,
  Lock
} from 'lucide-react';

type QuestionType = 'mcq' | 'true_false' | 'short_answer';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: Option[];
  correctAnswer?: string;
  points: number;
}

interface QuizBuilderProps {
  onBack: () => void;
}

export const QuizBuilder: React.FC<QuizBuilderProps> = ({ onBack }) => {
  const [title, setTitle] = useState('Business Strategy Final Assessment');
  const [timeLimit, setTimeLimit] = useState(45);
  const [passingScore, setPassingScore] = useState(70);
  const [isPreview, setIsPreview] = useState(false);
  const [previewStep, setPreviewStep] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'settings'>('editor');
  
  // Public Share States
  const [showShareModal, setShowShareModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q1',
      type: 'mcq',
      text: 'Which of the following scenarios is likely to cause a significant shift in market equilibrium?',
      options: [
        { id: '1a', text: 'A sudden increase in consumer demand', isCorrect: true },
        { id: '1b', text: 'Seasonal fluctuations in supply', isCorrect: false },
        { id: '1c', text: 'Routine maintenance of production machinery', isCorrect: false },
      ],
      points: 10
    },
    {
      id: 'q2',
      type: 'true_false',
      text: 'A nation with a trade surplus is said to have a favourable trade position.',
      options: [
        { id: '2t', text: 'TRUE', isCorrect: true },
        { id: '2f', text: 'FALSE', isCorrect: false },
      ],
      points: 5
    }
  ]);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      text: '',
      options: type === 'mcq' ? [
        { id: Math.random().toString(36).substr(2, 5), text: 'Option 1', isCorrect: true },
        { id: Math.random().toString(36).substr(2, 5), text: 'Option 2', isCorrect: false },
      ] : type === 'true_false' ? [
        { id: 'tf-t', text: 'TRUE', isCorrect: true },
        { id: 'tf-f', text: 'FALSE', isCorrect: false },
      ] : [],
      points: 10
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestionText = (id: string, text: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
  };

  const updateQuestionPoints = (id: string, points: number) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, points: isNaN(points) ? 0 : points } : q));
  };

  const updateOptionText = (qId: string, oId: string, text: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.map(o => o.id === oId ? { ...o, text } : o)
        };
      }
      return q;
    }));
  };

  const setCorrectOption = (qId: string, oId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.map(o => ({ ...o, isCorrect: o.id === oId }))
        };
      }
      return q;
    }));
  };

  const addOption = (qId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: [...q.options, { id: Math.random().toString(36).substr(2, 5), text: 'New Option', isCorrect: false }]
        };
      }
      return q;
    }));
  };

  const removeOption = (qId: string, oId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        return {
          ...q,
          options: q.options.filter(o => o.id !== oId)
        };
      }
      return q;
    }));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newQuestions = [...questions];
    const draggedItem = newQuestions[draggedIndex];
    newQuestions.splice(draggedIndex, 1);
    newQuestions.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setQuestions(newQuestions);
  };

  const handleCopyLink = () => {
    const publicUrl = `${window.location.origin}${window.location.pathname}?quizId=q-abc-123`;
    navigator.clipboard.writeText(publicUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isPreview) {
    const currentQ = questions[previewStep];
    return (
      <div className="fixed inset-0 z-50 bg-[#F9FAFB] overflow-y-auto flex flex-col font-inter">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsPreview(false)}
                className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                <h3 className="text-lg font-black text-gray-900">Student Preview</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{title}</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#9D72FF]/5 rounded-xl border border-[#9D72FF]/10">
                 <Clock className="w-4 h-4 text-[#9D72FF]" />
                 <span className="text-sm font-black text-[#9D72FF] tabular-nums">{timeLimit}:00</span>
              </div>
              <button 
                onClick={() => setIsPreview(false)}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-black flex items-center gap-2 hover:bg-black transition-all"
              >
                <EyeOff className="w-4 h-4" /> End Preview
              </button>
           </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12">
          {questions.length === 0 ? (
            <div className="text-center space-y-4">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <AlertCircle className="w-8 h-8" />
               </div>
               <p className="text-gray-500 font-bold">No questions added yet. Go back to the editor.</p>
            </div>
          ) : (
            <div className="max-w-4xl w-full">
               <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-500">
                  <div className="h-1.5 bg-gray-100">
                    <div 
                      className="h-full bg-[#9D72FF] transition-all duration-700 ease-out"
                      style={{ width: `${((previewStep + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>

                  <div className="p-10 md:p-16">
                     <div className="flex items-center justify-between mb-10">
                       <span className="px-4 py-1.5 bg-gray-50 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                          Question {previewStep + 1} of {questions.length}
                       </span>
                       <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-black text-gray-900">{currentQ.points} Pts</span>
                       </div>
                     </div>

                     <h2 className="text-3xl font-black text-gray-900 mb-12 leading-tight">
                        {currentQ.text || 'Question text not provided'}
                     </h2>

                     <div className="space-y-4">
                        {(currentQ.type === 'mcq' || currentQ.type === 'true_false') ? (
                          currentQ.options.map((opt, idx) => (
                            <button 
                              key={opt.id}
                              className="w-full p-6 text-left rounded-3xl border-2 border-gray-50 hover:border-[#9D72FF] hover:bg-[#9D72FF]/5 transition-all group flex items-center gap-4 active:scale-[0.98]"
                            >
                               <div className="w-10 h-10 rounded-2xl bg-gray-50 group-hover:bg-[#9D72FF]/10 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:text-[#9D72FF] border border-gray-100 transition-colors">
                                  {String.fromCharCode(65 + idx)}
                               </div>
                               <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">{opt.text}</span>
                            </button>
                          ))
                        ) : (
                          <div className="space-y-4">
                             <textarea 
                               className="w-full min-h-[160px] bg-gray-50 border-2 border-transparent focus:border-[#9D72FF]/20 focus:bg-white rounded-[32px] p-8 text-sm font-semibold outline-none transition-all resize-none shadow-inner"
                               placeholder="Provide your analysis or answer here..."
                             ></textarea>
                          </div>
                        )}
                     </div>

                     <div className="mt-16 pt-10 border-t border-gray-50 flex items-center justify-between">
                       <button 
                         disabled={previewStep === 0}
                         onClick={() => setPreviewStep(p => p - 1)}
                         className="px-8 py-4 text-sm font-black text-gray-400 hover:text-gray-900 disabled:opacity-20 transition-all flex items-center gap-2"
                       >
                         <ChevronLeft className="w-4 h-4" /> Previous
                       </button>
                       <button 
                         onClick={() => previewStep < questions.length - 1 ? setPreviewStep(p => p + 1) : setIsPreview(false)}
                         className="px-12 py-5 bg-[#9D72FF] text-white rounded-[24px] text-sm font-black shadow-2xl shadow-[#9D72FF]/30 hover:bg-[#8A5CF5] hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3"
                       >
                         {previewStep === questions.length - 1 ? 'Finish Exam' : 'Next Question'}
                         <ChevronRight className="w-5 h-5" />
                       </button>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 font-inter">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <span className="text-[10px] font-black text-[#9D72FF] uppercase tracking-[0.2em] bg-[#9D72FF]/5 px-2 py-0.5 rounded border border-[#9D72FF]/10">LMS Builder</span>
               <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Teacher Panel</span>
            </div>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-black text-gray-900 bg-transparent border-none focus:ring-0 p-0 w-full md:min-w-[400px]"
              placeholder="Enter assessment title..."
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm mr-4">
             <button onClick={() => setActiveTab('editor')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'editor' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>Editor</button>
             <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'settings' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>Settings</button>
          </div>
          <button onClick={() => { setIsPreview(true); setPreviewStep(0); }} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Eye className="w-4 h-4 text-[#9D72FF]" /> Preview
          </button>
          <button 
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-sm font-black hover:bg-emerald-100 transition-all shadow-sm relative group"
          >
            <Share2 className="w-4 h-4" /> Share Link
            {isPublic && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>}
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-[#9D72FF] text-white rounded-2xl text-sm font-black hover:bg-[#8A5CF5] transition-all shadow-xl shadow-[#9D72FF]/20 hover:scale-[1.02]">
            <Save className="w-4 h-4" /> Save Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'editor' ? (
            <>
              {questions.map((question, index) => (
                <div 
                  key={question.id} 
                  draggable 
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={() => setDraggedIndex(null)}
                  className={`bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 group relative transition-all duration-300 ${draggedIndex === index ? 'opacity-40 scale-[0.98] border-[#9D72FF]' : 'hover:shadow-md'}`}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-all">
                     <GripVertical className="w-6 h-6 text-gray-300" />
                  </div>

                  <div className="flex items-start gap-6 ml-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-[20px] flex items-center justify-center shrink-0 text-gray-400 font-black text-sm border border-gray-100">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="px-3 py-1 bg-gray-50 rounded-lg flex items-center gap-2 border border-gray-100">
                           {question.type === 'mcq' && <CheckSquare className="w-3.5 h-3.5 text-[#9D72FF]" />}
                           {question.type === 'true_false' && <Type className="w-3.5 h-3.5 text-emerald-500" />}
                           {question.type === 'short_answer' && <AlignLeft className="w-3.5 h-3.5 text-blue-500" />}
                           <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                             {question.type === 'mcq' ? 'Multiple Choice' : question.type === 'true_false' ? 'True / False' : 'Short Answer'}
                           </span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="flex items-center bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-100">
                              <Trophy className="w-3.5 h-3.5 text-amber-500 mr-2" />
                              <input 
                                type="number"
                                min="0"
                                value={question.points}
                                onChange={(e) => updateQuestionPoints(question.id, parseInt(e.target.value))}
                                className="w-12 bg-transparent text-xs font-black text-gray-900 border-none p-0 focus:ring-0 text-center"
                              />
                              <span className="text-[10px] font-black text-gray-400 ml-1 uppercase">Pts</span>
                           </div>
                           <button onClick={() => removeQuestion(question.id)} className="p-2.5 text-gray-300 hover:text-red-500 rounded-xl hover:bg-red-50">
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      </div>

                      <textarea 
                        placeholder="What is your question?"
                        value={question.text}
                        rows={2}
                        onChange={(e) => updateQuestionText(question.id, e.target.value)}
                        className="w-full text-xl font-black text-gray-900 bg-gray-50 border-none focus:bg-white rounded-2xl px-6 py-5 outline-none transition-all placeholder:text-gray-200 resize-none"
                      />

                      {(question.type === 'mcq' || question.type === 'true_false') && (
                        <div className="space-y-3 pt-2">
                           {question.options.map((option, idx) => (
                             <div key={option.id} className="flex items-center gap-3 group/option">
                                <button 
                                  onClick={() => setCorrectOption(question.id, option.id)}
                                  className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all ${
                                    option.isCorrect 
                                      ? 'border-[#9D72FF] bg-[#9D72FF] text-white shadow-lg shadow-[#9D72FF]/20' 
                                      : 'border-gray-100 text-transparent bg-gray-50'
                                  }`}
                                >
                                  <Plus className={`w-4 h-4 ${option.isCorrect ? 'rotate-45' : ''}`} />
                                </button>
                                <div className="flex-1 relative">
                                   <input 
                                     value={option.text}
                                     readOnly={question.type === 'true_false'}
                                     onChange={(e) => updateOptionText(question.id, option.id, e.target.value)}
                                     className={`w-full px-5 py-3.5 rounded-2xl text-sm font-bold transition-all outline-none ${
                                       option.isCorrect ? 'bg-[#9D72FF]/5 border-[#9D72FF]/20 text-gray-900' : 'bg-white border-gray-50 text-gray-500'
                                     }`}
                                   />
                                   {question.type === 'mcq' && question.options.length > 2 && (
                                     <button onClick={() => removeOption(question.id, option.id)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/option:opacity-100 text-red-300 hover:text-red-500">
                                        <Trash2 className="w-3.5 h-3.5" />
                                     </button>
                                   )}
                                </div>
                             </div>
                           ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                 {[
                   { type: 'mcq' as QuestionType, icon: CheckSquare, label: 'Multiple Choice' },
                   { type: 'true_false' as QuestionType, icon: Type, label: 'True / False' },
                   { type: 'short_answer' as QuestionType, icon: AlignLeft, label: 'Short Answer' }
                 ].map((btn) => (
                   <button key={btn.type} onClick={() => addQuestion(btn.type)} className="p-10 bg-white border-2 border-dashed border-gray-200 rounded-[40px] hover:border-gray-900 hover:bg-gray-50 transition-all flex flex-col items-center justify-center gap-4 text-center">
                     <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all">
                        <btn.icon className="w-7 h-7" />
                     </div>
                     <p className="text-sm font-black text-gray-900">{btn.label}</p>
                   </button>
                 ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-12 space-y-12 animate-in fade-in duration-500">
               <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Quiz Global Configuration</h3>
                    <p className="text-sm text-gray-500 font-medium">Fine-tune the experience for your students.</p>
                  </div>
                  <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                     <button 
                       onClick={() => setIsPublic(true)}
                       className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all flex items-center gap-2 ${isPublic ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'text-gray-400'}`}
                     >
                        <Globe className="w-3.5 h-3.5" /> Public
                     </button>
                     <button 
                       onClick={() => setIsPublic(false)}
                       className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all flex items-center gap-2 ${!isPublic ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400'}`}
                     >
                        <Lock className="w-3.5 h-3.5" /> Private
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Clock className="w-4 h-4 text-[#9D72FF]" />
                           <span className="text-sm font-black text-gray-900">Time Limit</span>
                        </div>
                        <span className="text-2xl font-black text-gray-900">{timeLimit} MINS</span>
                     </div>
                     <input 
                       type="range" 
                       min="1" 
                       max="120" 
                       value={timeLimit} 
                       onChange={(e) => setTimeLimit(parseInt(e.target.value))} 
                       className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#9D72FF]" 
                     />
                  </div>
                  <div className="space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Target className="w-4 h-4 text-emerald-500" />
                           <span className="text-sm font-black text-gray-900">Passing Score</span>
                        </div>
                        <span className="text-2xl font-black text-emerald-500">{passingScore}%</span>
                     </div>
                     <input 
                       type="range" 
                       min="0" 
                       max="100" 
                       value={passingScore} 
                       onChange={(e) => setPassingScore(parseInt(e.target.value))} 
                       className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-emerald-500" 
                     />
                  </div>
               </div>
               
               <div className="p-8 bg-emerald-50/30 rounded-3xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                        <Globe className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-sm font-black text-emerald-900">Public Link Access</p>
                        <p className="text-xs font-medium text-emerald-700/70">When enabled, anyone with the link can take this quiz without an account.</p>
                     </div>
                  </div>
                  <div 
                    onClick={() => setIsPublic(!isPublic)}
                    className={`w-14 h-7 rounded-full relative cursor-pointer transition-colors duration-300 ${isPublic ? 'bg-emerald-500' : 'bg-gray-200'}`}
                  >
                     <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-sm ${isPublic ? 'left-8' : 'left-1'}`}></div>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="space-y-6 lg:sticky lg:top-8">
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl p-8 space-y-8">
              <div className="flex items-center gap-2"><Layout className="w-4 h-4 text-gray-400" /><h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Summary</h3></div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Weight</span>
                    <span className="text-lg font-black text-gray-900 tabular-nums">{questions.reduce((acc, q) => acc + q.points, 0)} Pts</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Questions</span>
                    <span className="text-lg font-black text-gray-900 tabular-nums">{questions.length}</span>
                 </div>
              </div>
              <button className="w-full py-5 bg-gray-900 text-white rounded-[24px] text-sm font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-2xl shadow-black/10">
                 <Save className="w-4 h-4 text-[#9D72FF]" /> Publish Final
              </button>
           </div>
        </div>
      </div>

      {/* Public Link Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowShareModal(false)}></div>
           <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500"><Share2 className="w-5 h-5" /></div>
                    <div><h3 className="text-lg font-black text-gray-900">Share Public Link</h3><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Enable public exam access</p></div>
                 </div>
                 <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-10 space-y-8 text-center">
                 <p className="text-sm font-medium text-gray-500 leading-relaxed">Anyone with this link can take the assessment without creating an account. Results will be saved for your review.</p>
                 
                 <div className="relative">
                   <div className="bg-gray-50 p-4 pl-6 pr-4 rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-between group overflow-hidden">
                      <span className="text-xs font-bold text-gray-400 truncate max-w-[280px]">{window.location.origin}{window.location.pathname}?quizId=q-abc-123</span>
                      <button 
                        onClick={handleCopyLink}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 ${isCopied ? 'bg-emerald-500 text-white' : 'bg-gray-900 text-white shadow-xl shadow-black/10 hover:bg-black'}`}
                      >
                        {isCopied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Link</>}
                      </button>
                   </div>
                   {isCopied && (
                     <div className="absolute inset-0 bg-emerald-500 flex items-center justify-center rounded-2xl animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-3 text-white">
                           <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center"><Check className="w-4 h-4" /></div>
                           <span className="text-sm font-black uppercase tracking-widest">Link copied successfully!</span>
                        </div>
                     </div>
                   )}
                 </div>

                 <div className="pt-4 flex gap-4">
                    <button onClick={() => setShowShareModal(false)} className="flex-1 py-4 bg-gray-50 text-gray-400 text-sm font-black rounded-2xl hover:bg-gray-100 transition-colors">Dismiss</button>
                    <button onClick={() => { setActiveTab('settings'); setShowShareModal(false); }} className="flex-1 py-4 bg-[#9D72FF] text-white text-sm font-black rounded-2xl shadow-xl shadow-[#9D72FF]/20 hover:bg-[#8A5CF5] transition-all">Configure Access</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
