import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 max-w-md animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white shadow-xl border border-slate-700/60">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : isInfo ? (
          <Info className="w-5 h-5 text-sky-400 shrink-0" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        )}
        <p className="text-sm font-medium tracking-tight pr-2">{toast.message}</p>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Dismiss toast"
            className="text-slate-400 hover:text-white text-xs ml-auto shrink-0 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
