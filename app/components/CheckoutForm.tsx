'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { FaPlus, FaTrash, FaCalendarAlt, FaClock, FaUser, FaMapMarkerAlt, FaCalendarCheck, FaRupeeSign, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import { SuccessModal } from './SuccessModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Person {
  id: string;
  name: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  collectionDate: string;
  collectionTime: string;
}

// Add these interfaces for form validation
interface FormErrors {
  people?: {
    [key: string]: {
      name?: string;
      age?: string;
      phone?: string;
    };
  };
  address?: {
    street?: string;
    city?: string;
    pincode?: string;
  };
  collection?: {
    date?: string;
    time?: string;
  };
}

export const CheckoutForm = () => {
  const { items, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: '', age: '', gender: 'male', phone: '' }
  ]);
  const [nextId, setNextId] = useState(2);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    collectionDate: '',
    collectionTime: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'patient' | 'address' | 'schedule'>(
    'patient'
  );

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading skeleton
  }

  const addPerson = () => {
    setPeople([
      ...people,
      { 
        id: `person-${nextId}`,
        name: '', 
        age: '', 
        gender: 'male', 
        phone: '' 
      }
    ]);
    setNextId(prev => prev + 1);
  };

  const removePerson = (id: string) => {
    if (people.length > 1) {
      setPeople(people.filter(person => person.id !== id));
    }
  };

  const updatePerson = (id: string, field: keyof Person, value: string) => {
    setPeople(people.map(person => 
      person.id === id ? { ...person, [field]: value } : person
    ));
  };

  // Generate available time slots
  const timeSlots = [
    '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM',
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM',
    '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM'
  ];

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get date 7 days from now as maximum date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  // Add validation function
  const validateForm = () => {
    const errors: FormErrors = {};

    // Validate people
    const peopleErrors: FormErrors['people'] = {};
    people.forEach(person => {
      const personErrors: FormErrors['people'][string] = {};
      
      if (!person.name.trim()) {
        personErrors.name = 'Name is required';
      }
      
      if (!person.age) {
        personErrors.age = 'Age is required';
      } else if (parseInt(person.age) < 1 || parseInt(person.age) > 120) {
        personErrors.age = 'Enter valid age';
      }
      
      if (!person.phone.trim()) {
        personErrors.phone = 'Phone is required';
      } else if (!/^[0-9]{10}$/.test(person.phone)) {
        personErrors.phone = 'Enter valid 10-digit number';
      }

      if (Object.keys(personErrors).length > 0) {
        peopleErrors[person.id] = personErrors;
      }
    });

    if (Object.keys(peopleErrors).length > 0) {
      errors.people = peopleErrors;
    }

    // Validate address
    const addressErrors: FormErrors['address'] = {};
    
    if (!formData.address.trim()) {
      addressErrors.street = 'Address is required';
    }
    
    if (!formData.city?.trim()) {
      addressErrors.city = 'City is required';
    }
    
    if (!formData.pincode?.trim()) {
      addressErrors.pincode = 'PIN code is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      addressErrors.pincode = 'Enter valid 6-digit PIN code';
    }

    if (Object.keys(addressErrors).length > 0) {
      errors.address = addressErrors;
    }

    // Validate collection date/time for home collection
    if (hasHomeCollection) {
      const collectionErrors: FormErrors['collection'] = {};
      
      if (!formData.collectionDate) {
        collectionErrors.date = 'Please select a date';
      }
      
      if (!formData.collectionTime) {
        collectionErrors.time = 'Please select a time slot';
      }

      if (Object.keys(collectionErrors).length > 0) {
        errors.collection = collectionErrors;
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Update handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Skip validation temporarily for testing
    try {
      setIsProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success modal first, then clear cart
      setShowSuccess(true);
      clearCart();
      setIsProcessing(false);
      
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  const hasHomeCollection = items.some(item => item.type === 'home-collection');

  // Add step validation and navigation
  const goToNextStep = () => {
    switch (currentStep) {
      case 'patient':
        if (validatePatientDetails()) {
          setCurrentStep('address');
        }
        break;
      case 'address':
        if (validateAddress()) {
          setCurrentStep('schedule');
        }
        break;
      case 'schedule':
        handleSubmit(new Event('submit') as React.FormEvent);
        break;
    }
  };

  // Add these validation functions
  const validatePatientDetails = () => {
    const errors: FormErrors = {};
    const peopleErrors: FormErrors['people'] = {};

    people.forEach(person => {
      const personErrors: FormErrors['people'][string] = {};
      
      if (!person.name.trim()) {
        personErrors.name = 'Name is required';
      }
      
      if (!person.age) {
        personErrors.age = 'Age is required';
      } else if (parseInt(person.age) < 1 || parseInt(person.age) > 120) {
        personErrors.age = 'Enter valid age';
      }
      
      if (!person.phone.trim()) {
        personErrors.phone = 'Phone is required';
      } else if (!/^[0-9]{10}$/.test(person.phone)) {
        personErrors.phone = 'Enter valid 10-digit number';
      }

      if (Object.keys(personErrors).length > 0) {
        peopleErrors[person.id] = personErrors;
      }
    });

    if (Object.keys(peopleErrors).length > 0) {
      setFormErrors({ ...formErrors, people: peopleErrors });
      return false;
    }

    return true;
  };

  const validateAddress = () => {
    const errors: FormErrors = {};
    const addressErrors: FormErrors['address'] = {};
    
    if (!formData.address.trim()) {
      addressErrors.street = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      addressErrors.city = 'City is required';
    }
    
    if (!formData.pincode.trim()) {
      addressErrors.pincode = 'PIN code is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      addressErrors.pincode = 'Enter valid 6-digit PIN code';
    }

    if (Object.keys(addressErrors).length > 0) {
      setFormErrors({ ...formErrors, address: addressErrors });
      return false;
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 pt-24 pb-12">
      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Modern Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
            <p className="text-gray-600">Safe and secure checkout process</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <FaShieldAlt className="text-green-500" />
              <span className="text-sm text-gray-500">SSL Secure Payment</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  <FaUser size={14} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Details</span>
              </div>
              <div className="h-0.5 w-12 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="bg-gray-200 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center">
                  <FaCreditCard size={14} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-400">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Progress Bar - Left Side */}
            <div className="col-span-3">
              <div className="sticky top-24 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="space-y-6">
                  {[
                    { id: 'patient', label: 'Patient Details', icon: FaUser },
                    { id: 'address', label: 'Address', icon: FaMapMarkerAlt },
                    { id: 'schedule', label: 'Schedule', icon: FaCalendarCheck }
                  ].map((step) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div
                        className={`relative flex items-center ${
                          currentStep === step.id
                            ? 'text-blue-600'
                            : currentStep === 'address' && step.id === 'patient'
                            ? 'text-green-600'
                            : currentStep === 'schedule' && (step.id === 'patient' || step.id === 'address')
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep === step.id
                              ? 'bg-blue-50'
                              : currentStep === 'address' && step.id === 'patient'
                              ? 'bg-green-50'
                              : currentStep === 'schedule' && (step.id === 'patient' || step.id === 'address')
                              ? 'bg-green-50'
                              : 'bg-gray-50'
                          }`}
                        >
                          <step.icon size={20} />
                        </div>
                        {/* Vertical Line */}
                        {step.id !== 'schedule' && (
                          <div
                            className={`absolute top-10 left-1/2 w-0.5 h-12 -translate-x-1/2 ${
                              currentStep === step.id
                                ? 'bg-blue-200'
                                : currentStep === 'address' && step.id === 'patient'
                                ? 'bg-green-200'
                                : currentStep === 'schedule' && step.id === 'patient'
                                ? 'bg-green-200'
                                : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            currentStep === step.id ? 'text-gray-900' : 'text-gray-500'
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          {currentStep === step.id
                            ? 'In Progress'
                            : currentStep === 'address' && step.id === 'patient'
                            ? 'Completed'
                            : currentStep === 'schedule' && (step.id === 'patient' || step.id === 'address')
                            ? 'Completed'
                            : 'Pending'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Content - Right Side */}
            <div className="col-span-9">
              {/* Show only current step */}
              {currentStep === 'patient' && (
                <div className="space-y-6">
                  {/* Patient Details Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <FaUser className="text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Patient Details</h2>
                        <p className="text-sm text-gray-500">Add details for each person</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {people.map((person) => (
                        <div 
                          key={person.id} 
                          className="p-4 rounded-lg bg-gray-50 border border-gray-100 relative group"
                        >
                          {people.length > 1 && (
                            <button
                              onClick={() => removePerson(person.id)}
                              className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                              title="Remove Person"
                            >
                              <FaTrash size={12} />
                            </button>
                          )}
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={person.name}
                                onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                                  formErrors.people?.[person.id]?.name ? 'border-red-300' : 'border-gray-200'
                                }`}
                                placeholder="Full Name"
                              />
                              {formErrors.people?.[person.id]?.name && (
                                <p className="text-sm text-red-500 mt-1">
                                  {formErrors.people[person.id].name}
                                </p>
                              )}
                            </div>

                            <div className="w-24">
                              <input
                                type="number"
                                min={1}
                                value={person.age}
                                onChange={(e) => updatePerson(person.id, 'age', e.target.value)}
                                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                                  formErrors.people?.[person.id]?.age ? 'border-red-300' : 'border-gray-200'
                                }`}
                                placeholder="Age"
                              />
                              {formErrors.people?.[person.id]?.age && (
                                <p className="text-sm text-red-500 mt-1">
                                  {formErrors.people[person.id].age}
                                </p>
                              )}
                            </div>

                            <div className="w-32">
                              <select
                                value={person.gender}
                                onChange={(e) => updatePerson(person.id, 'gender', e.target.value as Person['gender'])}
                                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                required
                              >
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>

                            <div className="w-36">
                              <input
                                type="tel"
                                value={person.phone}
                                onChange={(e) => updatePerson(person.id, 'phone', e.target.value)}
                                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                                  formErrors.people?.[person.id]?.phone ? 'border-red-300' : 'border-gray-200'
                                }`}
                                placeholder="Phone"
                              />
                              {formErrors.people?.[person.id]?.phone && (
                                <p className="text-sm text-red-500 mt-1">
                                  {formErrors.people[person.id].phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Person Button */}
                      <button
                        type="button"
                        onClick={addPerson}
                        className="w-full py-2 px-4 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <FaPlus size={14} />
                        <span>Add Another Person</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 'address' && (
                <div className="space-y-6">
                  {/* Address Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-green-50 p-2 rounded-lg">
                        <FaMapMarkerAlt className="text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Collection Address</h2>
                        <p className="text-sm text-gray-500">Where should we collect the sample?</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          className={`w-full px-3 py-2 text-sm bg-white border rounded-lg ${
                            formErrors.address?.street ? 'border-red-300' : 'border-gray-200'
                          }`}
                          placeholder="Street Address, Area"
                        />
                        {formErrors.address?.street && (
                          <p className="error-message text-sm text-red-500 mt-1">
                            {formErrors.address.street}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className={`w-full px-3 py-2 text-sm bg-white border rounded-lg ${
                            formErrors.address?.city ? 'border-red-300' : 'border-gray-200'
                          }`}
                          placeholder="City"
                        />
                        {formErrors.address?.city && (
                          <p className="error-message text-sm text-red-500 mt-1">
                            {formErrors.address.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                          className={`w-full px-3 py-2 text-sm bg-white border rounded-lg ${
                            formErrors.address?.pincode ? 'border-red-300' : 'border-gray-200'
                          }`}
                          placeholder="PIN Code"
                        />
                        {formErrors.address?.pincode && (
                          <p className="error-message text-sm text-red-500 mt-1">
                            {formErrors.address.pincode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('patient')}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 'schedule' && hasHomeCollection && (
                <div className="space-y-6">
                  {/* Schedule Card */}
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-purple-50 p-2 rounded-lg">
                        <FaCalendarCheck className="text-purple-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Schedule Collection</h2>
                        <p className="text-sm text-gray-500">Choose your preferred date and time</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Collection Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            min={minDate}
                            max={maxDateStr}
                            value={formData.collectionDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, collectionDate: e.target.value }))}
                            className={`w-full px-4 py-2 pr-10 text-sm bg-white border rounded-lg ${
                              formErrors.collection?.date ? 'border-red-300' : 'border-gray-200'
                            }`}
                            required
                          />
                          <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          {formErrors.collection?.date && (
                            <p className="error-message text-sm text-red-500 mt-1">
                              {formErrors.collection.date}
                            </p>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Available for next 7 days</p>
                      </div>

                      {/* Time Slot Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time Slot
                        </label>
                        <div className="relative">
                          <select
                            value={formData.collectionTime}
                            onChange={(e) => setFormData(prev => ({ ...prev, collectionTime: e.target.value }))}
                            className="w-full px-4 py-2 pr-10 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                            required
                          >
                            <option value="">Select a time slot</option>
                            {timeSlots.map((slot) => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </select>
                          <FaClock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Collection available from 6 AM to 4 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('address')}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Complete Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal 
          onClose={() => {
            setShowSuccess(false);
            router.push('/'); // Redirect to home after closing
          }}
        />
      )}
    </div>
  );
}; 
