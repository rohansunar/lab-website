'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import partnerImage from '@/app/assets/partners/partner-1.png';

interface Partner {
  id: string;
  name: string;
  logo?: string;
  location: string;
  tests: number;
}

const partners: Partner[] = [
  {
    id: '1',
    name: 'Apollo Diagnostics',
    logo: partnerImage.src,
    location: 'Siliguri',
    tests: 250
  },
  {
    id: '2',
    name: 'Dr Lal PathLabs',
    logo: partnerImage.src,
    location: 'Siliguri',
    tests: 300
  },
  {
    id: '3',
    name: 'Thyrocare',
    logo: partnerImage.src,
    location: 'Siliguri',
    tests: 200
  },
  // Add more partners...
  {
    id: '8',
    name: 'SRL Diagnostics',
    logo: partnerImage.src,
    location: 'Siliguri',
    tests: 280
  }
];

const PartnerDiagnostics = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1;
        // Reset when all partners have scrolled
        if (newPosition >= partners.length * 300) { // 300px is width of each item
          return 0;
        }
        return newPosition;
      });
    }, 30); // Adjust speed by changing interval

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partner Diagnostics</h2>
            <p className="text-gray-600">Trusted by leading diagnostic centers across the city</p>
          </div>

          {/* Partners Scroll Container */}
          <div className="relative overflow-hidden">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

            {/* Scrolling Content */}
            <div 
              className="flex transition-transform duration-1000 py-4"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {/* Double the partners array for seamless loop */}
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-[280px] mx-4 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    {partner.logo ? (
                      <div className="w-16 h-16 relative mr-4">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-semibold text-xl">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <span>{partner.location}</span>
                        <span className="mx-2">•</span>
                        <span>{partner.tests}+ Tests</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerDiagnostics; 