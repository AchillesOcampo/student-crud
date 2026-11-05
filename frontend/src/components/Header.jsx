import React from 'react';
import { GraduationCap, Users, BookOpen, RefreshCw } from 'lucide-react';

export default function Header({ totalStudents, uniqueCourses, onRefresh, isLoading }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Management</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Vite + React
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                API Endpoint: <span className="text-indigo-600 font-semibold">/ocampo/students</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-sm">
              <Users className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600 font-medium">Students:</span>
              <span className="font-bold text-slate-900">{totalStudents}</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-sm">
              <BookOpen className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600 font-medium">Courses:</span>
              <span className="font-bold text-slate-900">{uniqueCourses}</span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh student list"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
