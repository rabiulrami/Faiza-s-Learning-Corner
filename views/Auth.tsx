
import React, { useState, useEffect } from 'react';
import { GraduationCap, Mail, Lock, User, ArrowRight, Briefcase, Info, X, ShieldAlert } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthProps {
  onAuthSuccess: (user: UserType) => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [error, setError] = useState('');
  const [showDemoInfo, setShowDemoInfo] = useState(true);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('skillzone_users') || '[]');
    const demoAccounts: UserType[] = [
      { id: 'admin-demo', name: 'Site Administrator', email: 'admin@faizalms.com', password: 'password', role: 'admin', avatar: 'https://picsum.photos/seed/admin/100/100' },
      { id: 'teacher-demo', name: 'Faiza Instructor', email: 'teacher@faizalms.com', password: 'password', role: 'teacher', avatar: 'https://picsum.photos/seed/faiza/100/100' },
      { id: 'student-demo', name: 'Demo Student', email: 'student@faizalms.com', password: 'password', role: 'student', avatar: 'https://picsum.photos/seed/demo/100/100' }
    ];

    let updated = false;
    demoAccounts.forEach(acc => {
      if (!storedUsers.some((u: UserType) => u.email === acc.email)) {
        storedUsers.push(acc);
        updated = true;
      }
    });

    if (updated) localStorage.setItem('skillzone_users', JSON.stringify(storedUsers));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const storedUsers = JSON.parse(localStorage.getItem('skillzone_users') || '[]');
    if (isLogin) {
      const user = storedUsers.find((u: UserType) => u.email === email && u.password === password);
      if (user) onAuthSuccess(user);
      else setError('Invalid credentials. Use demo accounts below for testing.');
    } else {
      if (!name || !email || !password) return setError('Please fill in all fields.');
      if (storedUsers.some((u: UserType) => u.email === email)) return setError('Email already exists.');

      const newUser: UserType = {
        id: Math.random().toString(36).substr(2, 9),
        name, email, password, role,
        avatar: `https://picsum.photos/seed/${email}/100/100`
      };
      storedUsers.push(newUser);
      localStorage.setItem('skillzone_users', JSON.stringify(storedUsers));
      onAuthSuccess(newUser);
    }
  };

  const useDemo = (type: string) => {
    setEmail(`${type}@faizalms.com`);
    setPassword('password');
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4 font-inter">
      <div className="max-w-5xl w-full bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-gray-100">
        
        <div className="md:w-5/12 bg-[#1A1C1E] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#9D72FF] rounded-full filter blur-[120px] opacity-20 -mr-40 -mt-40"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5">
                <GraduationCap className="text-[#9D72FF] w-7 h-7" />
              </div>
              <span className="text-xl font-black tracking-tight leading-none">Faiza's Learning Corner</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black mb-8 leading-[1.1]">
              Master your <span className="text-[#9D72FF]">Future</span> today.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              A premium Pakistan-based marketplace for students and elite instructors.
            </p>
          </div>

          <div className="relative z-10 mt-12 bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-md">
             <div className="flex items-center gap-2 mb-6 text-emerald-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Platform Ready</p>
             </div>
             <div className="grid grid-cols-2 gap-8">
                <div><p className="text-3xl font-black tabular-nums">1.5k+</p><p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Exams</p></div>
                <div><p className="text-3xl font-black tabular-nums">240+</p><p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Tutors</p></div>
             </div>
          </div>
        </div>

        <div className="md:w-7/12 p-8 lg:p-16 flex flex-col justify-center overflow-y-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">{isLogin ? 'Welcome back' : 'Join us'}</h2>
            <p className="text-gray-500 font-semibold">{isLogin ? 'Log in to continue your learning journey.' : 'Start your teaching or learning career.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {(['student', 'teacher', 'admin'] as const).map(r => (
                  <button 
                    key={r} type="button" onClick={() => setRole(r)}
                    className={`p-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${role === r ? 'border-[#9D72FF] bg-[#9D72FF]/5 text-gray-900' : 'border-gray-50 text-gray-400'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2 animate-bounce"><ShieldAlert className="w-4 h-4" /> {error}</div>}

            {!isLogin && (
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#9D72FF]" />
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-[24px] focus:bg-white focus:ring-2 focus:ring-[#9D72FF]/20 font-bold" />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#9D72FF]" />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-[24px] focus:bg-white focus:ring-2 focus:ring-[#9D72FF]/20 font-bold" />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#9D72FF]" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-[24px] focus:bg-white focus:ring-2 focus:ring-[#9D72FF]/20 font-bold" />
            </div>

            <button type="submit" className="w-full py-5 bg-[#9D72FF] text-white rounded-[28px] font-black shadow-2xl shadow-[#9D72FF]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {isLogin && showDemoInfo && (
            <div className="mt-8 p-6 bg-gray-50 rounded-[32px] border border-gray-100 animate-in fade-in duration-500">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Info className="w-4 h-4 text-[#9D72FF]" /><h3 className="text-[10px] font-black uppercase tracking-widest">Demo Access</h3></div>
                  <button onClick={() => setShowDemoInfo(false)}><X className="w-4 h-4 text-gray-300" /></button>
               </div>
               <div className="grid grid-cols-3 gap-2">
                  {['admin', 'teacher', 'student'].map(t => (
                    <button key={t} onClick={() => useDemo(t)} className="p-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold text-gray-600 hover:border-[#9D72FF] capitalize">{t}</button>
                  ))}
               </div>
            </div>
          )}

          <div className="mt-8 text-center text-xs font-bold text-gray-500">
            {isLogin ? "No account?" : "Already a member?"}
            <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-[#9D72FF] font-black hover:underline">{isLogin ? 'Join Now' : 'Login'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
