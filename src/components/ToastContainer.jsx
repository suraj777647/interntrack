import React from 'react';
import { useInternTrack } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useInternTrack();

  if (toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} color="#16a34a" />;
      case 'warning':
        return <AlertTriangle size={18} color="#d97706" />;
      case 'error':
        return <AlertCircle size={18} color="#dc2626" />;
      default:
        return <Info size={18} color="#0284c7" />;
    }
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <div className="toast-icon">{getIcon(toast.type)}</div>
          <div className="toast-content">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-desc">{toast.message}</div>
          </div>
          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;

