import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Notification({ notification, onDismiss }) {
  if (!notification || !notification.message) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <div
      className={`rounded-xl border p-4 shadow-sm transition-all flex items-start justify-between gap-3 ${
        isSuccess
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : isError
          ? 'bg-rose-50 border-rose-200 text-rose-900'
          : 'bg-indigo-50 border-indigo-200 text-indigo-900'
      }`}
    >
      <div className="flex items-center gap-3">
        {isSuccess && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />}
        {isError && <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />}
        {!isSuccess && !isError && <Info className="h-5 w-5 text-indigo-600 shrink-0" />}
        <p className="text-sm font-medium">{notification.message}</p>
      </div>

      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
        title="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
