'use client';

import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';

interface PathologyCardProps {
  _id: string;
  name: string;
  categories?: string[];
  address: {
    street: string
    city:string,
    state:string
    country: string
    pincode: string
  };
  rating: number;
  distance: string;
  startingPrice: string;
  discount?: string;
  images?: string[];
}

const PathologyCard: React.FC<PathologyCardProps> = ({
  _id,
  name,
  categories = [],
  address,
  rating,
  distance,
  startingPrice,
  discount,
  images
}) => {

  const handleClick = () => {
    localStorage.setItem('selectedPathologyId', _id);
  };

  return (
    <Link href={`/pathology/${address.city.toLowerCase()}/Khaprail/${name.toLowerCase().replace(/\s+/g, '-')}`} onClick={handleClick} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-48 w-full rounded-t-lg">
          <Image
            src={images && images.length > 0 ? images[0] : '/default-lab.jpg'}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-t-lg object-cover"
          />
          {/* Dark overlay only for image */}
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-t-lg" />
          {discount && (
            <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
              {discount}
            </div>
          )}
        </div>

        {/* Content - Removed bg-white since parent already has it */}
        <div className="p-4 relative z-20">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 truncate">{name}</h3>
            <div className="flex items-center bg-green-600 px-2 py-1 rounded text-white">
              <span className="mr-1 text-sm font-medium">{rating}</span>
              <FaStar size={12} />
            </div>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="text-gray-600 text-sm mb-2 truncate">
              {categories.join(', ')}
            </div>
          )}

          {/* Location */}
          <div className="text-gray-500 text-sm mb-2">
            {address.city}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{distance}</span>
            <span>•</span>
            <span>Price Starts from ₹{startingPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PathologyCard;
