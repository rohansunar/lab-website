'use client';

import { useEffect } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative animate-scale-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          <FaExclamationCircle className="text-red-500 text-4xl mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Error</h2>
        </div>
        <p className="text-gray-600">{message}</p>
        <button 
          onClick={onClose}
          className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}; 