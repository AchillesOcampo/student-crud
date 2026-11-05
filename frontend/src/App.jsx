import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Notification from './components/Notification';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import * as studentApi from './api/studentApi';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  // Fetch all students from the API
  const loadStudents = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    try {
      const data = await studentApi.getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      showNotification(
        `Failed to connect to backend: ${err.message}. Is your Spring Boot server running on port 8080?`,
        'error'
      );
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Handle Save (both Create and Update)
  const handleSaveStudent = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // UPDATE
        const updated = await studentApi.updateStudent(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showNotification(
          `Student "${updated.firstname} ${updated.lastname}" (#${updated.id}) updated successfully!`,
          'success'
        );
        setEditingStudent(null);
      } else {
        // CREATE
        const created = await studentApi.createStudent(formData);
        setStudents((prev) => [...prev, created]);
        showNotification(
          `Student "${created.firstname} ${created.lastname}" added successfully!`,
          'success'
        );
      }
    } catch (err) {
      console.error('Error saving student:', err);
      showNotification(`Failed to save student: ${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDeleteStudent = async (id) => {
    try {
      await studentApi.deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showNotification(`Student #${id} deleted successfully.`, 'info');
    } catch (err) {
      console.error('Error deleting student:', err);
      showNotification(`Failed to delete student #${id}: ${err.message}`, 'error');
    }
  };

  // Unique course count
  const uniqueCoursesCount = new Set(
    students.map((s) => s.course).filter(Boolean)
  ).size;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        totalStudents={students.length}
        uniqueCourses={uniqueCoursesCount}
        onRefresh={() => loadStudents()}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Notification Toast Banner */}
        {notification && (
          <Notification
            notification={notification}
            onDismiss={dismissNotification}
          />
        )}

        {/* 2-Column Responsive Dashboard Layout (Modal-Free) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Panel (Sticky on desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <StudentForm
              editingStudent={editingStudent}
              onSave={handleSaveStudent}
              onCancelEdit={() => setEditingStudent(null)}
              isSubmitting={isSubmitting}
            />

            <div className="p-4 rounded-xl bg-white/70 border border-slate-200/80 text-xs text-slate-500 space-y-1.5 shadow-2xs">
              <p className="font-semibold text-slate-700">Quick Tips</p>
              <p>• Click the <strong>Edit (✎)</strong> button on any student row to load their data directly into this form.</p>
              <p>• Click the <strong>Trash (🗑)</strong> button to reveal inline delete confirmation.</p>
              <p>• All requests are automatically proxied to your Spring Boot backend on port 8080.</p>
            </div>
          </div>

          {/* Right Column: Students Table & Filters */}
          <div className="lg:col-span-8">
            <StudentTable
              students={students}
              isLoading={isLoading}
              editingStudentId={editingStudent ? editingStudent.id : null}
              onEdit={(student) => setEditingStudent(student)}
              onDelete={handleDeleteStudent}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Student CRUD Frontend • Vite + React + Tailwind CSS
      </footer>
    </div>
  );
}
