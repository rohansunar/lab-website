"use client"

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import PathologyCard from './components/PathologyCard';
import { Pathology } from './types';
// import PopularTests from './components/PopularTests';
// import PartnerDiagnostics from './components/PartnerDiagnostics';
import { ErrorModal } from './components/ErrorModal';
import { FaExclamationCircle } from 'react-icons/fa';

export default function Home() {
  const [pathologies, setPathologies] = useState<Pathology[]>([]);
  const [noResultsMessage, setNoResultsMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPathologies = async (location: string) => {
    try {
      const response = await fetch(`http://localhost:4000/labs?city=${location}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Pathology[] = await response.json();
      setPathologies(data);

      if (data.length === 0) {
        setNoResultsMessage('Oops! We regret to inform you that there are currently no pathology services available in your selected location.');
      } else {
        setNoResultsMessage(null);
      }
    } catch (error) { 
      console.log('Failed to fetch pathologies:', error);
      setErrorMessage('Something went wrong. Please try again later.');
      setPathologies([]);
    }
  };

  return (
    <div className="bg-fixed min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 hero_section">
        {/* Search Section */}
        <SearchBar onSearch={fetchPathologies} />
      </header>
      {/* Pathology List */}
      <div className="container mx-auto mt-10 mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {pathologies.map((lab, index) => (
          <PathologyCard
            key={index} 
            {...lab}
          />
        ))}
      </div>

      {/* No Results Message */}
      {noResultsMessage && (
        <div className="flex items-center justify-center mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-md animate-fade-in">
          <FaExclamationCircle className="text-yellow-600 text-2xl mr-2" />
          <span className="text-yellow-800 font-semibold">{noResultsMessage}</span>
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <ErrorModal 
          message={errorMessage} 
          onClose={() => setErrorMessage(null)} 
        />
      )}

      {/* Popular Tests Section */}
      {/* <PopularTests /> */}
      {/* Partner Diagnostics Section */}
      {/* <PartnerDiagnostics /> */}
    </div>
  );
}