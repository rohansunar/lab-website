'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaEnvelope, FaWhatsapp, FaSms, FaTimes } from 'react-icons/fa';

interface RegistrationSuccessProps {
  onClose: () => void;
  labName: string;
}

export const RegistrationSuccess = ({ onClose, labName }: RegistrationSuccessProps) => {
  const router = useRouter();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleExit = () => {
    onClose();
    router.push('/');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleExit}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto relative animate-scale-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleExit}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-bounce-small">
                <FaCheckCircle className="text-green-500 text-4xl" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-green-500 opacity-20 animate-ping" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-600">
              Thank you for registering <span className="font-semibold">{labName}</span>. 
              Our team will review your application and contact you soon.
            </p>
          </div>

          {/* Notification Methods */}
          <div className="bg-gray-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-600 mb-3">You will receive updates via:</p>
            <div className="space-y-2">
              {[
                { icon: FaEnvelope, text: 'Email Confirmation' },
                { icon: FaWhatsapp, text: 'WhatsApp Message' },
                { icon: FaSms, text: 'SMS Notification' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <item.icon className="text-blue-600" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleExit}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}; 