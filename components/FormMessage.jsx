'use client';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export function ErrorMessage({ message, onClose }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
      <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-red-700 text-sm flex-1">{message}</p>
      {onClose && <button onClick={onClose} className="text-red-400 hover:text-red-600"><X size={13}/></button>}
    </div>
  );
}

export function LoadingSpinner({ size = 16, className = '' }) {
  return (
    <span
      className={`inline-block border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}
      style={{ width: size, height: size }}
    />
  );
}