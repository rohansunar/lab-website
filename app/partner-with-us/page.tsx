'use client';

import { useEffect, useState } from 'react';
import { FaHospital, FaUserMd, FaEnvelope, FaPhone, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { InputField } from '@/app/components/forms/InputField';
import { Toast } from '@/app/components/Toast';
import Image from 'next/image';
import { useFormValidation } from '@/app/components/forms/useFormValidation';
import { RegistrationSuccess } from '@/app/components/modals/RegistrationSuccess';

interface LabRegistrationForm {
  labName: string;
  ownerName: string;
  email: string;
  phone: string;
}

export default function PartnerWithUs() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const validationRules = {
    labName: [
      {
        validate: (value: string) => value.trim().length > 0,
        message: 'Lab name is required'
      }
    ],
    ownerName: [
      {
        validate: (value: string) => value.trim().length > 0,
        message: 'Owner name is required'
      }
    ],
    email: [
      {
        validate: (value: string) => value.trim().length > 0,
        message: 'Email is required'
      },
      {
        validate: (value: string) => /\S+@\S+\.\S+/.test(value),
        message: 'Invalid email format'
      }
    ],
    phone: [
      {
        validate: (value: string) => value.trim().length > 0,
        message: 'Phone is required'
      },
      {
        validate: (value: string) => /^[0-9]{10}$/.test(value),
        message: 'Invalid phone number'
      }
    ]
  };

  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setFormData
  } = useFormValidation({
    labName: '',
    ownerName: '',
    email: '',
    phone: ''
  }, validationRules);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateAll()) {
      setToast({
        message: 'Please fill all required fields correctly',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
    } catch (error) {
      console.error('Registration failed:', error);
      setToast({
        message: 'Registration failed. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-12">
        {/* Add a loading skeleton here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-3xl" />
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
          <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Partner with Health Quick Lab
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in animation-delay-300">
              Join our network of trusted diagnostic centers and expand your reach. 
              Together, we can make healthcare more accessible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Benefits Section */}
            <div className="space-y-8 animate-slide-up animation-delay-500">
              {[
                {
                  title: 'Expand Your Reach',
                  description: 'Connect with more patients through our platform',
                  icon: '🌐'
                },
                {
                  title: 'Digital Presence',
                  description: 'Get a modern digital interface for your services',
                  icon: '💻'
                },
                {
                  title: 'Easy Management',
                  description: 'Streamline your operations with our tools',
                  icon: '⚡'
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Registration Form */}
            <div className="animate-slide-up animation-delay-700">
              <form 
                onSubmit={handleSubmit} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaHospital className="text-blue-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Quick Registration</h2>
                  <p className="text-gray-500 mt-1">Get started in less than 2 minutes</p>
                </div>

                <InputField
                  label="Laboratory Name"
                  name="labName"
                  value={formData.labName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('labName')}
                  error={touched.labName ? errors.labName : undefined}
                  icon={FaHospital}
                  placeholder="Enter laboratory name"
                />
                
                <InputField
                  label="Owner Name"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('ownerName')}
                  error={touched.ownerName ? errors.ownerName : undefined}
                  icon={FaUserMd}
                  placeholder="Enter owner name"
                />
                
                <InputField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  error={touched.email ? errors.email : undefined}
                  icon={FaEnvelope}
                  type="email"
                  placeholder="Enter email address"
                />
                
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur('phone')}
                  error={touched.phone ? errors.phone : undefined}
                  icon={FaPhone}
                  placeholder="Enter 10-digit phone number"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Registration</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <RegistrationSuccess
          onClose={() => setShowSuccess(false)}
          labName={formData.labName}
        />
      )}

      {toast?.type === 'error' && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
} 