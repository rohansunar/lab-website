'use client';

import { useState } from 'react';
import { FaShoppingCart, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  includes: string[];
  preparationTime: string;
  reportTime: string;
}

const popularTests: Test[] = [
  {
    id: '1',
    name: 'Complete Blood Count (CBC)',
    description: 'Measures different components of blood including RBC, WBC, and platelets',
    price: 399,
    originalPrice: 599,
    discount: 33,
    includes: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelets'],
    preparationTime: '8-10 hours fasting',
    reportTime: '24 hours'
  },
  {
    id: '2',
    name: 'Diabetes Screening',
    description: 'Comprehensive test to check blood sugar levels',
    price: 499,
    originalPrice: 799,
    discount: 38,
    includes: ['Fasting Blood Sugar', 'HbA1c', 'Post Prandial'],
    preparationTime: '12 hours fasting',
    reportTime: '24 hours'
  },
  {
    id: '3',
    name: 'Thyroid Profile',
    description: 'Complete thyroid function assessment',
    price: 699,
    originalPrice: 999,
    discount: 30,
    includes: ['T3', 'T4', 'TSH'],
    preparationTime: 'No special preparation',
    reportTime: '24 hours'
  },
  {
    id: '4',
    name: 'Lipid Profile',
    description: 'Measures cholesterol and other blood fats',
    price: 599,
    originalPrice: 899,
    discount: 33,
    includes: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides'],
    preparationTime: '12 hours fasting',
    reportTime: '24 hours'
  },
  {
    id: '5',
    name: 'Vitamin D Test',
    description: 'Measures vitamin D levels in blood to check deficiency',
    price: 799,
    originalPrice: 1299,
    discount: 38,
    includes: ['25-OH Vitamin D', 'Calcium', 'Phosphorus'],
    preparationTime: 'No special preparation',
    reportTime: '24 hours'
  },
  {
    id: '6',
    name: 'Liver Function Test',
    description: 'Comprehensive liver health assessment',
    price: 699,
    originalPrice: 999,
    discount: 30,
    includes: ['SGOT', 'SGPT', 'Bilirubin', 'Alkaline Phosphatase'],
    preparationTime: '8-10 hours fasting',
    reportTime: '24 hours'
  },
  {
    id: '7',
    name: 'COVID-19 RTPCR',
    description: 'Gold standard test for COVID-19 detection',
    price: 499,
    originalPrice: 799,
    discount: 38,
    includes: ['SARS-CoV-2 Detection', 'Result Interpretation'],
    preparationTime: 'No special preparation',
    reportTime: '24 hours'
  },
  {
    id: '8',
    name: 'Full Body Checkup',
    description: 'Comprehensive health assessment package',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    includes: ['CBC', 'Liver Function', 'Kidney Function', 'Thyroid'],
    preparationTime: '12 hours fasting',
    reportTime: '48 hours'
  }
];

const PopularTests = () => {
  const [hoveredTest, setHoveredTest] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const testsToShow = 4;

  const nextTests = () => {
    setStartIndex((prev) => 
      prev + testsToShow >= popularTests.length ? 0 : prev + testsToShow
    );
  };

  const prevTests = () => {
    setStartIndex((prev) => 
      prev - testsToShow < 0 ? Math.max(popularTests.length - testsToShow, 0) : prev - testsToShow
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-12">
            <div className="text-center flex-grow">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Health Tests</h2>
              <p className="text-gray-600">Choose from our most booked diagnostic tests</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={prevTests}
                className="p-2 rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors"
              >
                <FaChevronLeft className="text-blue-600" />
              </button>
              <button 
                onClick={nextTests}
                className="p-2 rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors"
              >
                <FaChevronRight className="text-blue-600" />
              </button>
            </div>
          </div>

          {/* Tests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTests.slice(startIndex, startIndex + testsToShow).map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                onMouseEnter={() => setHoveredTest(test.id)}
                onMouseLeave={() => setHoveredTest(null)}
              >
                {/* Diagonal Discount Badge */}
                <div className="absolute -right-12 top-6 bg-red-500 text-white px-12 py-1 rotate-45 transform z-10">
                  <span className="text-sm font-semibold">{test.discount}% OFF</span>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{test.description}</p>

                  {/* Price Section */}
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-gray-900">₹{test.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">₹{test.originalPrice}</span>
                  </div>

                  {/* Includes Section */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Includes:</h4>
                    <ul className="text-sm text-gray-600">
                      {test.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <FaPlus className="text-green-500 mr-2" size={12} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Additional Info */}
                  <div className="text-sm text-gray-600 mb-4">
                    <p>Preparation: {test.preparationTime}</p>
                    <p>Report: {test.reportTime}</p>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    className={`w-full py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      hoveredTest === test.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(popularTests.length / testsToShow) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx * testsToShow)}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(startIndex / testsToShow) === idx 
                    ? 'bg-blue-600 w-4' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularTests; 