'use client';

import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`
      fixed top-20 right-4 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-slide-down z-50
      ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
    `}>
      {type === 'success' ? (
        <FaCheckCircle className="text-white" />
      ) : (
        <FaExclamationCircle className="text-white" />
      )}
      {message}
    </div>
  );
}; 