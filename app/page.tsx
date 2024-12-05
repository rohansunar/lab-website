"use client"

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import PathologyCard from './components/PathologyCard';
import { Pathology } from './types';
import heroImage from '@/app/assets/hero/hero-1.png';
import PopularTests from './components/PopularTests';
import PartnerDiagnostics from './components/PartnerDiagnostics';

export default function Home() {
  const [pathologies, setPathologies] = useState<Pathology[]>([]);

  const fetchPathologies = async () => {
    const mockData: Pathology[] = [
      { name: "Care Diagnostics",
        categories: ["Momos", "Fast Food", "Chinese"],
        location: "Siliguri",
        area: "Khalpara",
        rating: 3.9,
        distance: "4.1 km",
        priceForTwo: "₹99",
        discount: "Flat 15% OFF",
        imageUrl: heroImage.src },
       { name: "WOW! Momo",
        categories: ["Momos", "Fast Food", "Chinese"],
        location: "Siliguri",
        rating: 3.9,
        area: "Khalpara",
        distance: "4.1 km",
        priceForTwo: "₹400 for two",
        discount: "Flat 15% OFF",
        imageUrl: heroImage.src },
      { 
        name: "PathCare",
        categories: ["Momos", "Fast Food", "Chinese"],
        location: "Siliguri",
        rating: 3.9,
        area: "Khalpara",
        distance: "4.1 km",
        priceForTwo: "₹400 for two",
        discount: "Flat 15% OFF",
        imageUrl: heroImage.src 
      },
      { 
        name: "Wellness Diagnostics",
        categories: ["Momos", "Fast Food", "Chinese"],
        location: "Siliguri",
        area: "Khalpara",
        rating: 3.9,
        distance: "4.1 km",
        priceForTwo: "₹400 for two",
        discount: "Flat 15% OFF",
        imageUrl: heroImage.src
      }
    ];
    setPathologies(mockData);
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
      {/* Popular Tests Section */}
      <PopularTests />

      {/* Partner Diagnostics Section */}
      <PartnerDiagnostics />

     
    </div>
  );
}