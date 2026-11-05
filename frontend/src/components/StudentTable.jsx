import React, { useState } from 'react';
import { Search, Edit3, Trash2, X, AlertOctagon, Check, User, Filter } from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  editingStudentId,
  onEdit,
  onDelete,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Extract unique courses for filter dropdown
  const courses = Array.from(new Set(students.map((s) => s.course).filter(Boolean)));

  // Filter students based on search term and selected course
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstname || ''} ${student.lastname || ''}`.toLowerCase();
    const course = (student.course || '').toLowerCase();
    const section = (student.section || '').toLowerCase();
    const id = String(student.id || '');
    const term = searchTerm.toLowerCase().trim();

    const matchesSearch =
      fullName.includes(term) ||
      course.includes(term) ||
      section.includes(term) ||
      id.includes(term);

    const matchesCourse =
      selectedCourse === 'ALL' ||
      (student.course || '').toUpperCase() === selectedCourse.toUpperCase();

    return matchesSearch && matchesCourse;
  });

  const getCourseBadgeColor = (course) => {
    const c = (course || '').toUpperCase();
    if (c.includes('IT')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (c.includes('CS')) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (c.includes('ENG') || c.includes('EE') || c.includes('CE'))
      return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Top Search & Filter Control Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, course, section, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-9 py-2 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Course Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-700 cursor-pointer"
          >
            <option value="ALL">All Courses ({students.length})</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course} ({students.filter((s) => s.course === course).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Content Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
            <tr>
              <th scope="col" className="px-5 py-3.5 w-16">
                ID
              </th>
              <th scope="col" className="px-5 py-3.5">
                Student Name
              </th>
              <th scope="col" className="px-5 py-3.5">
                Course
              </th>
              <th scope="col" className="px-5 py-3.5">
                Section
              </th>
              <th scope="col" className="px-5 py-3.5 text-right w-48">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-7 w-7 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm">Loading students from API...</p>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User className="h-6 w-6" />
                    </div>
                    <p className="font-medium text-slate-700">No students found</p>
                    <p className="text-xs text-slate-400">
                      {searchTerm || selectedCourse !== 'ALL'
                        ? 'Try clearing the search or filters to see more results.'
                        : 'Use the registration form on the left to add your first student record.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const isCurrentEdit = editingStudentId === student.id;
                const isConfirmingDelete = confirmDeleteId === student.id;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors hover:bg-slate-50/80 ${
                      isCurrentEdit ? 'bg-amber-50/60 font-medium' : ''
                    }`}
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500">
                      #{student.id}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isCurrentEdit
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-indigo-100 text-indigo-700'
                          }`}
                        >
                          {(student.firstname?.[0] || '').toUpperCase()}
                          {(student.lastname?.[0] || '').toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {student.firstname} {student.lastname}
                          </div>
                          <div className="text-xs text-slate-400 sm:hidden">
                            {student.course} • {student.section}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCourseBadgeColor(
                          student.course
                        )}`}
                      >
                        {student.course || '—'}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {student.section || '—'}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      {/* INLINE DELETE CONFIRMATION (NO MODAL) */}
                      {isConfirmingDelete ? (
                        <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg">
                          <span className="text-xs text-rose-700 font-medium hidden sm:inline">
                            Delete?
                          </span>
                          <button
                            onClick={() => {
                              onDelete(student.id);
                              setConfirmDeleteId(null);
                            }}
                            title="Confirm delete"
                            className="inline-flex items-center gap-0.5 px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded cursor-pointer transition-colors shadow-2xs"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Yes</span>
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            title="Cancel delete"
                            className="inline-flex items-center gap-0.5 px-2 py-1 bg-white hover:bg-slate-100 text-slate-600 text-xs rounded border border-slate-300 cursor-pointer transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>No</span>
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 justify-end">
                          <button
                            onClick={() => {
                              onEdit(student);
                              const el = document.getElementById('student-form-panel');
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            title="Edit student"
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              isCurrentEdit
                                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                : 'bg-white text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 border-slate-200'
                            }`}
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => setConfirmDeleteId(student.id)}
                            title="Delete student"
                            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Summary */}
      <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
        <span>
          Showing <strong className="text-slate-800">{filteredStudents.length}</strong> of{' '}
          <strong className="text-slate-800">{students.length}</strong> students
        </span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
}
