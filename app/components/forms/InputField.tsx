'use client';

import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon: IconType;
  type?: string;
  placeholder?: string;
  onBlur?: () => void;
}

export const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  icon: Icon,
  type = 'text',
  placeholder,
  onBlur,
}: InputFieldProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
}; 