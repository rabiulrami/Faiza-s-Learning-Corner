
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './views/Dashboard';
import { Teachers } from './views/Teachers';
import { QuizView } from './views/QuizView';
import { Payments } from './views/Payments';
import { TeacherProfile } from './views/TeacherProfile';
import { CourseEditor } from './views/CourseEditor';
import { QuizBuilder } from './views/QuizBuilder';
import { Messages } from './views/Messages';
import { MyCourses } from './views/MyCourses';
import { CoursePlayer } from './views/CoursePlayer';
import { StudentProfile } from './views/StudentProfile';
import { PublicQuiz } from './views/PublicQuiz';
import { Auth } from './views/Auth';
import { UserManagement } from './views/UserManagement';
import { Analytics } from './views/Analytics';
import { View, User } from './types';
import { ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('quizId')) {
      setCurrentView(View.PUBLIC_QUIZ);
    } else {
      const savedUser = localStorage.getItem('skillzone_session');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      else setCurrentView(View.AUTH);
    }
    setIsInitialized(true);
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('skillzone_session', JSON.stringify(user));
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('skillzone_session');
    setCurrentUser(null);
    setCurrentView(View.AUTH);
  };

  const navigateTo = (view: View) => setCurrentView(view);

  const canAccess = (view: View): boolean => {
    if (!currentUser) return view === View.AUTH || view === View.PUBLIC_QUIZ;
    const role = currentUser.role;
    if (role === 'admin') return true;
    
    const teacherOnly = [View.QUIZ_BUILDER, View.COURSE_EDITOR, View.ANALYTICS];
    const studentOnly = [View.COURSES, View.TEACHERS, View.STUDENT_PROFILE, View.TEACHER_PROFILE, View.COURSE_PLAYER];
    const adminOnly = [View.USER_MANAGEMENT];

    if (adminOnly.includes(view)) return false;
    if (role === 'student' && teacherOnly.includes(view)) return false;
    if (role === 'teacher' && studentOnly.includes(view)) return false;
    return true;
  };

  const renderView = () => {
    if (currentView === View.PUBLIC_QUIZ) return <PublicQuiz />;
    if (!currentUser && currentView !== View.AUTH) return <Auth onAuthSuccess={handleAuthSuccess} />;

    if (!canAccess(currentView)) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-[40px] shadow-sm border border-gray-100 animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6"><ShieldAlert className="w-10 h-10 text-red-500" /></div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">Your current role ({currentUser?.role}) doesn't have permissions to access this feature in Faiza's Learning Corner.</p>
          <button onClick={() => setCurrentView(View.DASHBOARD)} className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all">Go Home</button>
        </div>
      );
    }

    switch (currentView) {
      case View.AUTH: return <Auth onAuthSuccess={handleAuthSuccess} />;
      case View.DASHBOARD: return <Dashboard onContinueLearning={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_PLAYER); }} onViewAllRecommendations={() => setCurrentView(View.TEACHERS)} onViewAllMyCourses={() => setCurrentView(View.COURSES)} onNavigate={navigateTo} />;
      case View.COURSES: return <MyCourses onSelectCourse={(id) => { setSelectedCourseId(id); setCurrentView(View.COURSE_PLAYER); }} />;
      case View.TEACHERS: return <Teachers onSelectTeacher={(id) => { setSelectedTeacherId(id); setCurrentView(View.TEACHER_PROFILE); }} />;
      case View.TEACHER_PROFILE: return <TeacherProfile id={selectedTeacherId || '1'} onBack={() => setCurrentView(View.TEACHERS)} onBookSuccess={() => setCurrentView(View.DASHBOARD)} onOpenChat={() => setCurrentView(View.MESSAGES)} />;
      case View.QUIZ: return <QuizView onComplete={() => setCurrentView(View.DASHBOARD)} />;
      case View.ANALYTICS: return <Analytics />;
      case View.PAYMENTS: return <Payments />;
      case View.SETTINGS: return <Payments />;
      case View.COURSE_EDITOR: return <CourseEditor onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.QUIZ_BUILDER: return <QuizBuilder onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.MESSAGES: return <Messages />;
      case View.COURSE_PLAYER: return <CoursePlayer id={selectedCourseId || '1'} onBack={() => setCurrentView(View.COURSES)} />;
      case View.STUDENT_PROFILE: return <StudentProfile onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.USER_MANAGEMENT: return <UserManagement />;
      default: return <div className="flex flex-col items-center justify-center h-full text-gray-500"><h2 className="text-2xl font-bold">404 View Not Found</h2><button onClick={() => setCurrentView(View.DASHBOARD)} className="mt-4 px-6 py-2 bg-[#9D72FF] text-white rounded-xl font-bold">Return Home</button></div>;
    }
  };

  if (!isInitialized) return null;
  const hideChrome = currentView === View.COURSE_PLAYER || currentView === View.AUTH || currentView === View.PUBLIC_QUIZ;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB] font-inter">
      {!hideChrome && <Sidebar currentView={currentView} user={currentUser} onViewChange={navigateTo} onLogout={handleLogout} />}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {!hideChrome && <Header currentView={currentView} user={currentUser} onProfileClick={() => navigateTo(View.STUDENT_PROFILE)} />}
        <main className={`flex-1 overflow-y-auto ${hideChrome ? 'p-0' : 'p-4 md:p-8'}`}>{renderView()}</main>
      </div>
    </div>
  );
};

export default App;
