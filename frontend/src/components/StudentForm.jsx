import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, X, Save, AlertTriangle } from 'lucide-react';

export default function StudentForm({
  editingStudent,
  onSave,
  onCancelEdit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [formError, setFormError] = useState('');

  // Synchronize form when editingStudent changes
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setFormError('');
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setFormError('');
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formError) setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstname.trim() ||
      !formData.lastname.trim() ||
      !formData.course.trim() ||
      !formData.section.trim()
    ) {
      setFormError('Please fill in all required fields (First Name, Last Name, Course, Section).');
      return;
    }

    onSave(formData);
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div
      id="student-form-panel"
      className={`rounded-2xl border transition-all duration-300 shadow-sm bg-white overflow-hidden ${
        isEditing
          ? 'border-amber-400 ring-2 ring-amber-100 shadow-md'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Header bar of the form card */}
      <div
        className={`px-5 py-4 flex items-center justify-between border-b ${
          isEditing ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-lg ${
              isEditing ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'
            }`}
          >
            {isEditing ? <UserCheck className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {isEditing ? 'Edit Student Details' : 'Register New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? `Updating ID #${editingStudent.id}`
                : 'Enter information to create a new record'}
            </p>
          </div>
        </div>

        {isEditing && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
            Edit Mode
          </span>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {formError && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{formError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="e.g. John"
              disabled={isSubmitting}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors disabled:bg-slate-100 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="e.g. Doe"
              disabled={isSubmitting}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors disabled:bg-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSIT, BSCS, BSEE"
              disabled={isSubmitting}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors disabled:bg-slate-100 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3A, 4B, 1-1"
              disabled={isSubmitting}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors disabled:bg-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
              </button>

              <button
                type="button"
                onClick={onCancelEdit}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              <span>{isSubmitting ? 'Adding Student...' : 'Add Student'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
