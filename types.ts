
export enum View {
  DASHBOARD = 'DASHBOARD',
  COURSES = 'COURSES',
  TEACHERS = 'TEACHERS',
  MESSAGES = 'MESSAGES',
  ANALYTICS = 'ANALYTICS',
  PAYMENTS = 'PAYMENTS',
  SETTINGS = 'SETTINGS',
  QUIZ = 'QUIZ',
  COURSE_EDITOR = 'COURSE_EDITOR',
  QUIZ_BUILDER = 'QUIZ_BUILDER',
  TEACHER_PROFILE = 'TEACHER_PROFILE',
  COURSE_PLAYER = 'COURSE_PLAYER',
  STUDENT_PROFILE = 'STUDENT_PROFILE',
  AUTH = 'AUTH',
  PUBLIC_QUIZ = 'PUBLIC_QUIZ',
  USER_MANAGEMENT = 'USER_MANAGEMENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'teacher' | 'admin';
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  reviews: number;
  students: number;
  price: number;
  oldPrice?: number;
  image: string;
  progress?: number;
  category?: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  students: number;
  lessons: number;
  pricePerHour: number;
  tags: string[];
  avatar: string;
  about: string;
}
