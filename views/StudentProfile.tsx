
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Award, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Settings,
  MoreVertical,
  Star,
  Zap,
  Download,
  ExternalLink,
  PlayCircle,
  FileBadge,
  ChevronRight,
  Flame,
  Target,
  MapPin,
  X,
  MessageSquareText
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface StudentProfileProps {
  onBack: () => void;
}

const learningData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 4.2 },
  { day: 'Wed', hours: 3.8 },
  { day: 'Thu', hours: 5.1 },
  { day: 'Fri', hours: 2.9 },
  { day: 'Sat', hours: 6.4 },
  { day: 'Sun', hours: 4.5 },
];

export const StudentProfile: React.FC<StudentProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const achievements = [
    { name: 'Fast Learner', date: 'Mar 2024', icon: '⚡' },
    { name: 'Course Master', date: 'Feb 2024', icon: '🎓' },
    { name: 'Top Reviewer', date: 'Jan 2024', icon: '⭐' },
    { name: 'Weekly Champion', date: 'Jan 2024', icon: '🏆' },
  ];

  const completedCourses = [
    { 
      id: 'cc1', 
      title: 'Visual Hierarchy in UI Design', 
      instructor: 'Jenny Wilson', 
      date: 'Mar 12, 2024', 
      grade: 'A+', 
      image: 'https://picsum.photos/seed/ui/400/250' 
    },
    { 
      id: 'cc2', 
      title: 'Introduction to Financial Theory', 
      instructor: 'Ralph Legros', 
      date: 'Feb 28, 2024', 
      grade: 'A', 
      image: 'https://picsum.photos/seed/finance/400/250' 
    },
    { 
      id: 'cc3', 
      title: 'Mobile App Architecture', 
      instructor: 'Guy Hawkins', 
      date: 'Jan 15, 2024', 
      grade: 'A-', 
      image: 'https://picsum.photos/seed/mobile/400/250' 
    }
  ];

  const certificates = [
    { 
      id: 'cert1', 
      name: 'UI Design Specialization', 
      issuedBy: 'Skillzone Academy', 
      date: 'Mar 2024', 
      verifyId: 'SZ-9921-X3' 
    },
    { 
      id: 'cert2', 
      name: 'Business Foundations', 
      issuedBy: 'Skillzone Academy', 
      date: 'Jan 2024', 
      verifyId: 'SZ-8812-B1' 
    }
  ];

  const ongoingProgress = [
    { title: 'AI & Virtual Reality Fundamentals', progress: 65, remaining: '4 lessons', color: '#9D72FF' },
    { title: 'Advanced React Native', progress: 40, remaining: '12 lessons', color: '#38BDF8' },
    { title: 'Economics Masterclass', progress: 15, remaining: '20 lessons', color: '#10B981' },
  ];

  const skills = [
    { name: 'UI/UX Design', level: 92 },
    { name: 'React Development', level: 78 },
    { name: 'Business Strategy', level: 65 },
    { name: 'Data Analysis', level: 45 },
  ];

  const handleOpenReview = (course: any) => {
    setSelectedCourse(course);
    setRating(0);
    setReviewText('');
    setReviewModalOpen(true);
  };

  const handleSubmitReview = () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setReviewModalOpen(false);
      alert('Thank you for your review!');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            {/* Premium Profile Header */}
            <div className="h-56 bg-gradient-to-br from-[#9D72FF] via-[#8A5CF5] to-[#38BDF8] relative">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
              <div className="absolute top-6 right-6 flex gap-2">
                 <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl text-white text-xs font-bold hover:bg-white/20 transition-all border border-white/10">Change Cover</button>
              </div>
            </div>
            
            <div className="px-10 pb-10 -mt-20 relative">
              <div className="flex flex-col md:flex-row gap-8 items-end">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-[#9D72FF] to-[#38BDF8] rounded-[36px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <img 
                    src="https://picsum.photos/seed/cynthia/300/300" 
                    className="w-40 h-40 rounded-[32px] object-cover ring-[12px] ring-white relative z-10 shadow-2xl" 
                    alt="Student" 
                  />
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full z-20 shadow-lg"></div>
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-black text-gray-900">Cynthia Smith</h2>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-500 text-[10px] font-black rounded-lg uppercase tracking-widest border border-blue-100">PRO</span>
                  </div>
                  <p className="text-gray-500 font-semibold mb-4">Undergraduate Student at MIT • Passionate UI/UX Designer</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-xl text-gray-500 text-xs font-bold border border-gray-100">
                      <MapPin className="w-3.5 h-3.5" /> Cambridge, MA
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl text-amber-600 text-xs font-bold border border-amber-100">
                      <Flame className="w-3.5 h-3.5" /> 12 Day Streak
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pb-4">
                  <button className="px-8 py-3 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl shadow-black/10">Edit</button>
                  <button className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm"><Settings className="w-5 h-5 text-gray-400" /></button>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-gray-50">
                <div className="p-6 bg-gray-50/50 rounded-3xl text-center border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Completed</p>
                  <p className="text-2xl font-black text-gray-900">12</p>
                </div>
                <div className="p-6 bg-gray-50/50 rounded-3xl text-center border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Certificates</p>
                  <p className="text-2xl font-black text-gray-900">8</p>
                </div>
                <div className="p-6 bg-gray-50/50 rounded-3xl text-center border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Hours</p>
                  <p className="text-2xl font-black text-gray-900">248</p>
                </div>
                <div className="p-6 bg-[#9D72FF]/5 rounded-3xl text-center border border-[#9D72FF]/10">
                  <p className="text-[10px] font-black text-[#9D72FF] uppercase tracking-widest mb-1">Points</p>
                  <p className="text-2xl font-black text-[#9D72FF]">4,520</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Navigation Tabs */}
          <div className="space-y-6">
            <div className="flex gap-8 border-b border-gray-100 overflow-x-auto scrollbar-hide">
              {['Overview', 'Completed Courses', 'Certificates', 'Progress'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 text-sm font-black transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab ? 'text-[#9D72FF] border-[#9D72FF]' : 'text-gray-400 border-transparent hover:text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === 'Overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                {/* Learning Analytics Chart */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-black text-gray-900">Learning Activity</h3>
                      <p className="text-sm text-gray-500">Your studying hours this week</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg Daily</p>
                        <p className="text-lg font-black text-gray-900">4.1h</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-[#9D72FF] bg-[#9D72FF]/10 p-2 rounded-xl" />
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={learningData}>
                        <defs>
                          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9D72FF" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#9D72FF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 700}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 700}} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}} />
                        <Area type="monotone" dataKey="hours" stroke="#9D72FF" strokeWidth={4} fillOpacity={1} fill="url(#colorHours)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Skills Breakdown */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-black text-gray-900 mb-8">Skill Proficiency</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {skills.map((skill, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-black text-gray-900">{skill.name}</span>
                          <span className="text-[10px] font-black text-[#9D72FF] uppercase tracking-widest">{skill.level}% Mastery</span>
                        </div>
                        <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#9D72FF] to-[#38BDF8] rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COMPLETED COURSES */}
            {activeTab === 'Completed Courses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-left-2 duration-300">
                {completedCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group border-b-4 border-b-emerald-400 flex flex-col">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-xl text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                         Passed
                      </div>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-16 h-16 text-white drop-shadow-2xl" />
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Certified Completion</span>
                        </div>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg">Grade: {course.grade}</span>
                      </div>
                      <h4 className="text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-[#9D72FF] transition-colors">{course.title}</h4>
                      <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                        <img src={`https://picsum.photos/seed/${course.instructor}/24/24`} className="w-5 h-5 rounded-full" alt="" />
                        By {course.instructor}
                      </p>
                      
                      <div className="mt-auto space-y-4 pt-6 border-t border-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" /> {course.date}
                          </div>
                          <button 
                            onClick={() => handleOpenReview(course)}
                            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-[#9D72FF] text-[10px] font-black rounded-xl uppercase tracking-widest transition-colors flex items-center gap-1.5"
                          >
                            <Star className="w-3.5 h-3.5" /> Leave a Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: CERTIFICATES */}
            {activeTab === 'Certificates' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
                {certificates.map(cert => (
                  <div key={cert.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-[#9D72FF]/30 transition-all">
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#9D72FF]/10 to-[#38BDF8]/10 rounded-[24px] flex items-center justify-center text-[#9D72FF] shrink-0 border border-[#9D72FF]/5">
                        <FileBadge className="w-12 h-12" />
                      </div>
                      <div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                          <h4 className="text-xl font-black text-gray-900 group-hover:text-[#9D72FF] transition-colors">{cert.name}</h4>
                          <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Issued by {cert.issuedBy} • {cert.date}</p>
                        <div className="mt-3 flex items-center justify-center md:justify-start gap-3">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md border border-gray-100">ID: {cert.verifyId}</span>
                          <button className="text-[10px] font-black text-[#9D72FF] uppercase tracking-widest hover:underline flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> Verify
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                      <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-lg shadow-black/5">
                        <Download className="w-4 h-4" /> Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: PROGRESS */}
            {activeTab === 'Progress' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                {ongoingProgress.map((item, i) => (
                  <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8 group hover:border-[#9D72FF]/30 transition-all">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full animate-pulse`} style={{backgroundColor: item.color}}></div>
                          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active Learning</span>
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 group-hover:text-[#9D72FF] transition-colors">{item.title}</h4>
                        <p className="text-sm text-gray-500 mt-2 font-medium">Continue from Module 4: Advanced Principles • {item.remaining} to complete</p>
                      </div>
                      <div className="text-center">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="48" cy="48" r="42" stroke="#f3f4f6" strokeWidth="8" fill="transparent" />
                            <circle 
                              cx="48" cy="48" r="42" 
                              stroke={item.color} 
                              strokeWidth="8" 
                              fill="transparent" 
                              strokeDasharray={264}
                              strokeDashoffset={264 - (264 * item.progress) / 100}
                              strokeLinecap="round"
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <span className="absolute text-xl font-black text-gray-900">{item.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                           {[1,2,3,4].map(st => (
                             <img key={st} src={`https://picsum.photos/seed/stud${st+i}/32/32`} className="w-8 h-8 rounded-full border-2 border-white" alt="" />
                           ))}
                           <div className="w-8 h-8 rounded-full bg-[#9D72FF]/10 border-2 border-white flex items-center justify-center text-[10px] font-black text-[#9D72FF]">+12</div>
                        </div>
                        <p className="text-xs font-bold text-gray-400">Classmates studying now</p>
                      </div>
                      <button className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-[24px] text-sm font-black hover:bg-black transition-all flex items-center justify-center gap-3 group/btn shadow-xl shadow-black/5">
                        <PlayCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                        Resume Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Analytics & Highlights */}
        <div className="space-y-8">
          {/* Learning Streak Card */}
          <div className="bg-[#1A1C1E] rounded-[40px] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 group-hover:scale-125 transition-all duration-1000">
               <Flame className="w-40 h-40" />
            </div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-orange-500/20">
                 <Flame className="w-10 h-10 text-white fill-current" />
              </div>
              <h3 className="text-4xl font-black mb-1">12</h3>
              <p className="text-sm font-black text-white/40 uppercase tracking-widest mb-6">Day Streak</p>
              <div className="flex justify-between gap-1">
                 {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                   <div key={day} className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold ${i < 5 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white/10 text-white/30'}`}>
                         {day}
                      </div>
                   </div>
                 ))}
              </div>
              <p className="text-xs text-white/50 mt-8">You're in the top <span className="text-orange-400 font-bold">5%</span> of learners this week!</p>
            </div>
          </div>

          {/* Achievement Showcase */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-900">Badges</h3>
              <button className="text-[10px] font-black text-[#9D72FF] uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item, i) => (
                <div key={i} className="bg-gray-50/50 p-5 rounded-[32px] flex flex-col items-center text-center gap-3 group hover:bg-[#9D72FF]/5 transition-all cursor-default border border-gray-100">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:rotate-12 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Goal Progress */}
          <div className="bg-gradient-to-br from-[#9D72FF] to-[#38BDF8] p-8 rounded-[40px] text-white shadow-2xl shadow-[#9D72FF]/20">
             <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6" />
                <h3 className="text-lg font-black">Monthly Goal</h3>
             </div>
             <p className="text-sm font-medium text-white/80 mb-6">Complete 4 certifications to unlock the 'Elite Scholar' status.</p>
             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <span className="text-xs font-bold uppercase tracking-widest">3 of 4 Completed</span>
                   <span className="text-lg font-black">75%</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden border border-white/10">
                   <div className="h-full bg-white rounded-full shadow-lg" style={{width: '75%'}}></div>
                </div>
             </div>
             <button className="w-full mt-8 py-4 bg-white text-gray-900 rounded-[24px] text-sm font-black hover:bg-gray-50 transition-all shadow-xl shadow-black/10">
                Pick next course
             </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => !isSubmitting && setReviewModalOpen(false)}
          ></div>
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9D72FF]/10 rounded-xl flex items-center justify-center text-[#9D72FF]">
                  <MessageSquareText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">Leave a Review</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{selectedCourse?.title}</p>
                </div>
              </div>
              <button 
                onClick={() => setReviewModalOpen(false)}
                className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-10 space-y-8">
              {/* Star Rating Selection */}
              <div className="text-center space-y-4">
                <p className="text-sm font-bold text-gray-900">How would you rate this course?</p>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform active:scale-90"
                    >
                      <Star 
                        className={`w-10 h-10 transition-colors ${
                          (hoverRating || rating) >= star 
                            ? 'text-amber-400 fill-current' 
                            : 'text-gray-100'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Great' : rating === 5 ? 'Excellent' : 'Select a rating'}
                </p>
              </div>

              {/* Text Feedback */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Feedback</label>
                <textarea 
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with other students..."
                  className="w-full min-h-[120px] bg-gray-50 border-2 border-transparent focus:border-[#9D72FF]/20 focus:bg-white rounded-3xl p-5 text-sm font-semibold outline-none transition-all resize-none placeholder:text-gray-300"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setReviewModalOpen(false)}
                  className="flex-1 py-4 bg-gray-50 text-gray-400 text-sm font-black rounded-2xl hover:bg-gray-100 hover:text-gray-600 transition-all"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || isSubmitting}
                  className={`flex-1 py-4 text-white text-sm font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${
                    rating === 0 || isSubmitting 
                      ? 'bg-gray-100 cursor-not-allowed shadow-none' 
                      : 'bg-[#9D72FF] hover:bg-[#8A5CF5] shadow-[#9D72FF]/20'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Submit Review <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
