'use client';

import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

/**
 * List of predefined city suggestions for the location search
 */
const suggestions = ['Siliguri', 'Delhi', 'Mumbai', 'Bangalore', 'Jalpaiguri', 'Jalpas', 'Raigang', 'Raipur', 'Kolkata', 'Jalpaiguri, Police Line','Jalpaiguri'];

/**
 * List of popular cities shown as quick selection buttons
 */
const topCities = ["New Delhi", "Gurgaon", "Jaipur", "Bengaluru", "Mumbai", "Kolkata", "Hyderabad", "Chennai", "Chandigarh", "Pune", "Ahmedabad", "Goa"];

/**
 * List of available pathology tests for suggestions
 */
const testSuggestions = [
  'Complete Blood Count (CBC)',
  'Diabetes Test (Blood Sugar)',
  'Thyroid Profile',
  'Liver Function Test',
  'Kidney Function Test',
  'Lipid Profile',
  'Vitamin D Test',
  'Vitamin B12 Test',
  'HbA1c Test',
  'COVID-19 Test'
];

/**
 * Props interface for SearchBar component
 * @interface SearchBarProps
 * @property {function} onSearch - Callback function triggered when location is selected or changed
 */
interface SearchBarProps {
  onSearch: (location: string) => void;
}

/**
 * SearchBar Component
 * 
 * A complex search interface that allows users to:
 * - Search for locations with auto-suggestions
 * - Quick select popular cities
 * - Search for pathology tests with auto-suggestions
 * - Maintains a display location even when search input is cleared
 * 
 * @component
 * @param {SearchBarProps} props - Component props
 * @returns {JSX.Element} Rendered SearchBar component
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // State management
  const [location, setLocation] = useState('');
  const [displayLocation, setDisplayLocation] = useState('Siliguri'); // Persists the selected location for display
  const [test, setTest] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showTestSuggestions, setShowTestSuggestions] = useState(false);
  const [isClient, setIsClient] = useState(false);

  /**
   * Handles location selection and updates both display and search states
   * @param {string} newLocation - The newly selected location
   */
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    setDisplayLocation(newLocation);
    setShowLocationSuggestions(false);
    onSearch(newLocation);
  };

  /**
   * Handles clicks on the popular city buttons
   * @param {string} city - The selected city name
   */
  const handleCityClick = (city: string) => {
    handleLocationChange(city);
  };

  /**
   * Handles changes in the location input field
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    setShowLocationSuggestions(true);
    if (value.length > 0) {
      onSearch(value);
    }
  };

  /**
   * Handles changes in the test search input field
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleTestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTest(value);
    setShowTestSuggestions(true);
  };

  /**
   * Handles selection of a test from suggestions
   * @param {string} selectedTest - The selected test name
   */
  const handleTestSelect = (selectedTest: string) => {
    setTest(selectedTest);
    setShowTestSuggestions(false);
  };

  // Initialize component with default location
  useEffect(() => {
    setIsClient(true);
    handleLocationChange('Siliguri');
  }, []);

  /**
   * Filter location suggestions based on user input
   * Only shows suggestions when input length >= 2
   */
  const filteredLocationSuggestions = location.length >= 2
    ? suggestions.filter((s) => s.toLowerCase().includes(location.toLowerCase()))
    : [];

  /**
   * Filter test suggestions based on user input
   * Only shows suggestions when input length >= 2
   */
  const filteredTestSuggestions = test.length >= 2
    ? testSuggestions.filter((t) => t.toLowerCase().includes(test.toLowerCase()))
    : [];

  // Prevent hydration issues
  if (!isClient) return null;

  return (
    <>
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold">Pathology Labs in {displayLocation}</h2>
      </div>
      <div className="container mx-auto mt-10 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="rounded flex flex-row items-center gap-4 relative">
            {/* Location Input */}
            <div className="basis-1/4 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaMapMarkerAlt size={20} />
              </div>
              <input
                type="text"
                placeholder="Location or pin"
                value={location}
                onChange={handleLocationInputChange}
                className="border border-gray-300 text-black rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              
              {/* Location Suggestions Dropdown */}
              {filteredLocationSuggestions.length > 0 && showLocationSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                  {filteredLocationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleLocationChange(suggestion)}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    >
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <span className="text-gray-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Test Search Input */}
            <div className="basis-3/4 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for pathology or test"
                value={test}
                onChange={handleTestInputChange}
                className="border border-gray-300 text-black rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              {/* Test Suggestions Dropdown */}
              {filteredTestSuggestions.length > 0 && showTestSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                  {filteredTestSuggestions.map((testSuggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleTestSelect(testSuggestion)}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    >
                      <FaSearch className="text-gray-400 mr-2" />
                      <span className="text-gray-700">{testSuggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Top Cities Section */}
          <div className="flex items-center justify-center gap-2 flex-wrap px-2">
            {topCities.map((city, index) => (
              <button
                key={index}
                onClick={() => handleCityClick(city)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
