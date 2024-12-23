"use client";

import { useState, useEffect } from "react";

type ValidationRule<T> = {
  validate: (value: string) => boolean;
  message: string;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T>[];
};

export const useFormValidation = <T extends Record<string, any>>(
  initialData: T,
  validationRules: ValidationRules<T>
) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = (name: keyof T, value: string) => {
    const fieldRules = validationRules[name];
    if (!fieldRules) return;

    const fieldErrors = fieldRules
      .map((rule) => (!rule.validate(value) ? rule.message : null))
      .filter(Boolean);

    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors.length ? fieldErrors[0] : undefined,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof T, value);
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateAll = () => {
    const newErrors: Partial<T> = {};
    Object.keys(validationRules).forEach((key) => {
      const value = formData[key as keyof T];
      const fieldRules = validationRules[key as keyof T];
      if (fieldRules) {
        const fieldErrors = fieldRules
          .map((rule) => (!rule.validate(value) ? rule.message : null))
          .filter(Boolean);
        if (fieldErrors.length) {
          newErrors[key as keyof T] = fieldErrors[0] as any;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setFormData,
  };
};
