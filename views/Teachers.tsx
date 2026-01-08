
import React from 'react';
import { Star, MessageCircle, ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface TeachersProps {
  onSelectTeacher: (id: string) => void;
}

export const Teachers: React.FC<TeachersProps> = ({ onSelectTeacher }) => {
  const categories = ["Economics", "English", "Psychology", "Design", "Marketing"];
  
  const teachers = [
    {
      id: '1',
      name: 'Carole Towne',
      title: 'Economics teacher',
      rating: 4.9,
      students: 250,
      courses: 24,
      lessons: 132,
      price: 32,
      oldPrice: 46,
      tags: ['TOP Tutor'],
      avatar: 'https://picsum.photos/seed/carole/120/120',
      description: 'Ready to unravel the complexities of supply, demand, and market forces? Dive into my Economics course now!'
    },
    {
      id: '2',
      name: 'Ralph Legros',
      title: 'Economics teacher',
      rating: 4.8,
      students: 190,
      courses: 18,
      lessons: 94,
      price: 23,
      oldPrice: 32,
      tags: ['Certified'],
      avatar: 'https://picsum.photos/seed/ralph/120/120',
      description: 'From micro to macroeconomics, discover the keys to understanding economic phenomena in my courses.'
    },
    {
       id: '3',
       name: 'Jenny Wilson',
       title: 'Economics teacher',
       rating: 4.9,
       students: 310,
       courses: 29,
       lessons: 215,
       price: 17,
       tags: ['TOP Tutor'],
       avatar: 'https://picsum.photos/seed/jenny/120/120',
       description: 'Economics isn\'t just a subject - it\'s the lens through which we view society. Join my sessions today.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-xl font-bold text-gray-900">Teachers</h2>
           <p className="text-sm text-gray-500">Search for specific subjects and find teachers you're ready to take a course with.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-semibold hover:shadow-sm transition-all">
             <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-semibold hover:shadow-sm transition-all">
             <ArrowUpDown className="w-4 h-4" /> Sort: Most popular
          </button>
        </div>
      </div>

      {/* Category Sections */}
      {categories.slice(0, 2).map((category, catIdx) => (
        <section key={category} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">{category} teachers</h3>
            <button className="text-sm font-bold text-[#9D72FF] flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div 
                key={teacher.id + catIdx} 
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => onSelectTeacher(teacher.id)}
              >
                <div className="flex gap-4 mb-4">
                  <div className="relative">
                    <img src={teacher.avatar} alt={teacher.name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-gray-50" />
                    {teacher.tags.includes('TOP Tutor') && (
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-1 rounded-lg border-2 border-white uppercase tracking-tighter">Top</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900 truncate group-hover:text-[#9D72FF] transition-colors">{teacher.name}</h4>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs shrink-0">
                        <Star className="w-3 h-3 fill-current" /> {teacher.rating}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{teacher.title}</p>
                    <div className="flex flex-wrap gap-2">
                       {teacher.tags.map(tag => (
                         <span key={tag} className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600">✓ {tag}</span>
                       ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                  {teacher.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Courses</p>
                    <p className="text-xs font-bold text-gray-900">{teacher.courses}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Students</p>
                    <p className="text-xs font-bold text-gray-900">{teacher.students}+</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Lessons</p>
                    <p className="text-xs font-bold text-gray-900">{teacher.lessons}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-gray-900">${teacher.price}</span>
                    <span className="text-xs text-gray-400 font-medium">/hr</span>
                    {teacher.oldPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1">${teacher.oldPrice}</span>
                    )}
                  </div>
                  <button className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors">
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
