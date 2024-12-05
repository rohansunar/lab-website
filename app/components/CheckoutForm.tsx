'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { SuccessModal } from './SuccessModal';

interface Person {
  id: string;
  name: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
}

export const CheckoutForm = () => {
  const { items, getCartTotal } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: '', age: '', gender: 'male', phone: '' }
  ]);
  const [nextId, setNextId] = useState(2);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Patient Details</h2>
                  <p className="text-sm text-gray-500 mt-1">Add details for each person</p>
                </div>
                <button
                  onClick={addPerson}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FaPlus size={12} />
                  <span className="text-sm font-medium">Add Person</span>
                </button>
              </div>

              <div className="space-y-6">
                {people.map((person) => (
                  <div 
                    key={person.id} 
                    className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={person.name}
                          onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="Full Name"
                          required
                        />
                      </div>

                      <div className="w-24">
                        <input
                          type="number"
                          min={1}
                          value={person.age}
                          onChange={(e) => updatePerson(person.id, 'age', e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="Age"
                          required
                        />
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
                          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                          placeholder="Phone"
                          required
                        />
                      </div>

                      {people.length > 1 && (
                        <button
                          onClick={() => removePerson(person.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Person"
                        >
                          <FaTrash size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collection Address Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Collection Address</h2>
                <p className="text-sm text-gray-500 mt-1">Where should we collect the sample?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="House/Flat No., Building Name"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Street Address, Area"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="City"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="PIN Code"
                  />
                </div>
                <div className="col-span-2">
                  <textarea
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Landmark (Optional)"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.pathologyName}</p>
                    </div>
                    <span className="font-semibold text-gray-900">₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-xl font-bold text-gray-900">₹{getCartTotal()}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowSuccess(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Payment</span>
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
}; 