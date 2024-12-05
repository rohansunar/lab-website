'use client';

interface PathologyParams {
  location: string;
  area: string;
  slug: string;
}

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaStar, FaMapMarkerAlt, FaPhone, FaClock, 
  FaDirections, FaShare, FaComment,
  FaChevronRight, FaRegClock, FaRupeeSign, FaChevronLeft, FaInfoCircle, FaShoppingCart
} from 'react-icons/fa';
import heroImage from '@/app/assets/hero/hero-1.png';
import { Toast } from '@/app/components/Toast';
import { useCart } from '@/app/context/CartContext';
import { CartNavbar } from '@/app/components/CartNavbar';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PathologyDetails {
  name: string;
  categories: string[];
  location: string;
  area: string;
  rating: number;
  startingPrice: number;
  address: string;
  phone: string;
  timings: {
    open: string;
    close: string;
    days: string;
  };
  images: GalleryImage[];
  overview: string;
  mapUrl: string;
  tests: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

type TabType = 'overview' | 'walk-in' | 'home-collection' | 'reviews' | 'photos';

interface TestType {
  id: string;
  name: string;
  price: number;
  description: string;
  preparation: string;
  reportTime: string;
  discount?: number;
}

// Add test data
const walkInTests: TestType[] = [
  {
    id: 'w1',
    name: "X-Ray Chest",
    price: 599,
    description: "Digital X-Ray with expert radiologist report",
    preparation: "No special preparation required",
    reportTime: "1 hour",
    discount: 20
  },
  {
    id: 'w2',
    name: "ECG",
    price: 399,
    description: "12-lead ECG with cardiologist report",
    preparation: "No special preparation",
    reportTime: "30 minutes",
    discount: 15
  },
  {
    id: 'w3',
    name: "MRI Brain",
    price: 4999,
    description: "Detailed brain imaging with contrast",
    preparation: "4-6 hours fasting required",
    reportTime: "24 hours",
    discount: 20
  },
  {
    id: 'w4',
    name: "CT Scan Chest",
    price: 3499,
    description: "High resolution chest imaging",
    preparation: "No special preparation",
    reportTime: "Same day",
    discount: 15
  },
  {
    id: 'w5',
    name: "Ultrasound Abdomen",
    price: 1299,
    description: "Complete abdominal scan",
    preparation: "6 hours fasting",
    reportTime: "Same day",
    discount: 10
  },
  {
    id: 'w6',
    name: "2D Echo",
    price: 1999,
    description: "Heart function assessment",
    preparation: "No special preparation",
    reportTime: "2 hours",
    discount: 25
  },
  {
    id: 'w7',
    name: "Dental X-Ray",
    price: 499,
    description: "Digital dental radiography",
    preparation: "No special preparation",
    reportTime: "30 minutes",
    discount: 10
  }
];

const homeCollectionTests: TestType[] = [
  {
    id: 'h1',
    name: "Complete Blood Count",
    price: 499,
    description: "Comprehensive blood analysis",
    preparation: "8-10 hours fasting",
    reportTime: "24 hours",
    discount: 15
  },
  {
    id: 'h2',
    name: "Thyroid Profile",
    price: 899,
    description: "Complete thyroid function test",
    preparation: "No special preparation",
    reportTime: "24 hours",
    discount: 25
  },
  {
    id: 'h3',
    name: "Fever Profile",
    price: 899,
    description: "Complete Fever function test",
    preparation: "No special preparation",
    reportTime: "24 hours",
    discount: 25
  },
  {
    id: 'h4',
    name: "Diabetes Profile",
    price: 999,
    description: "Complete diabetes screening",
    preparation: "8-10 hours fasting",
    reportTime: "24 hours",
    discount: 20
  },
  {
    id: 'h5',
    name: "Lipid Profile",
    price: 699,
    description: "Complete cholesterol test",
    preparation: "12 hours fasting",
    reportTime: "24 hours",
    discount: 15
  },
  {
    id: 'h6',
    name: "Kidney Function Test",
    price: 799,
    description: "Complete kidney health assessment",
    preparation: "No special preparation",
    reportTime: "24 hours",
    discount: 20
  },
  {
    id: 'h7',
    name: "Liver Function Test",
    price: 899,
    description: "Comprehensive liver panel",
    preparation: "8 hours fasting",
    reportTime: "24 hours",
    discount: 25
  },
  {
    id: 'h8',
    name: "HbA1c",
    price: 499,
    description: "3-month diabetes control test",
    preparation: "No fasting required",
    reportTime: "24 hours",
    discount: 10
  },
  {
    id: 'h9',
    name: "Vitamin D3",
    price: 1299,
    description: "Vitamin D deficiency test",
    preparation: "No special preparation",
    reportTime: "48 hours",
    discount: 30
  },
  {
    id: 'h10',
    name: "Vitamin B12",
    price: 899,
    description: "B12 deficiency assessment",
    preparation: "No special preparation",
    reportTime: "24 hours",
    discount: 20
  },
  {
    id: 'h11',
    name: "Iron Studies",
    price: 999,
    description: "Complete iron profile",
    preparation: "8 hours fasting",
    reportTime: "24 hours",
    discount: 15
  },
  {
    id: 'h12',
    name: "PSA Test",
    price: 799,
    description: "Prostate specific antigen",
    preparation: "No special preparation",
    reportTime: "24 hours",
    discount: 20
  },
  {
    id: 'h13',
    name: "Hormone Panel",
    price: 2499,
    description: "Complete hormone assessment",
    preparation: "8 hours fasting",
    reportTime: "48 hours",
    discount: 25
  }
];

// Add this helper function for schema markup
const generateBreadcrumbSchema = ({name, location, area}: PathologyDetails) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://healthquicklab.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pathology Labs",
        "item": "https://healthquicklab.com/pathology"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": location,
        "item": `https://healthquicklab.com/pathology/${location.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": area,
        "item": `https://healthquicklab.com/pathology/${location.toLowerCase()}/${area.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": name,
        "item": `https://healthquicklab.com/pathology/${location.toLowerCase()}/${area.toLowerCase()}/${name.toLowerCase().replace(/\s+/g, '-')}`
      }
    ]
  };
};

export default function PathologyDetails({ params }: { params: Promise<PathologyParams> }) {
  const [details, setDetails] = useState<PathologyDetails | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isGalleryView, setIsGalleryView] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    setDetails({
      name: "PathCare Labs",
      categories: ["Blood Tests", "Pathology", "Health Checkup"],
      location: "Siliguri",
      area: "Khalpara",
      rating: 4.2,
      startingPrice: 299,
      address: "123, Hospital Road, Khalpara, Siliguri - 734001, West Bengal",
      phone: "+91 98765 43210",
      timings: {
        open: "07:00",
        close: "20:00",
        days: "Monday to Saturday"
      },
      images: [
        {
          src: heroImage.src,
          alt: "Lab Interior",
          width: 1920,
          height: 1080
        },
        {
          src: heroImage.src,
          alt: "Equipment",
          width: 800,
          height: 600
        },
        {
          src: heroImage.src,
          alt: "Staff",
          width: 1200,
          height: 800
        },
        // Add more images with different dimensions
      ],
      overview: "Leading diagnostic center with state-of-the-art facilities...",
      mapUrl: "https://www.google.com/maps/embed?pb=",
      tests: [
        {
          name: "Complete Blood Count",
          price: 400,
          description: "Includes RBC, WBC, Platelets count"
        },
        {
          name: "Lipid Profile",
          price: 600,
          description: "Cholesterol and triglycerides test"
        }
      ],
      reviews: [
        {
          user: "John Doe",
          rating: 5,
          comment: "Excellent service and quick results",
          date: "2024-01-15"
        }
      ]
    });
  }, [resolvedParams.slug]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (details) {
      setCurrentImageIndex((prev) => (prev + 1) % details.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (details) {
      setCurrentImageIndex((prev) => (prev - 1 + details.images.length) % details.images.length);
    }
  };

  const handleAddToCart = (test: TestType, type: 'walk-in' | 'home-collection') => {
    addToCart({
      id: test.id,
      name: test.name,
      price: test.price,
      pathologyName: details?.name || '',
      type: type
    });
    setShowToast(true);
  };

  if (!details) return <div>Loading...</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(details))
          }}
        />

        {/* Breadcrumb Navigation */}
        <nav 
          className="bg-white border-b sticky top-[64px] z-40"
          aria-label="Breadcrumb"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center h-12">
                <ol 
                  className="flex items-center text-sm"
                  itemScope
                  itemType="https://schema.org/BreadcrumbList"
                >
                  <li 
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="flex items-center"
                  >
                    <Link 
                      href="/"
                      className="text-blue-600 hover:text-blue-800"
                      itemProp="item"
                    >
                      <span itemProp="name">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                    <span className="mx-2 text-gray-500">/</span>
                  </li>

                  <li 
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="flex items-center"
                  >
                    <Link 
                      href="/pathology"
                      className="text-blue-600 hover:text-blue-800"
                      itemProp="item"
                    >
                      <span itemProp="name">Pathology Labs</span>
                    </Link>
                    <meta itemProp="position" content="2" />
                    <span className="mx-2 text-gray-500">/</span>
                  </li>
                  <li 
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="flex items-center"
                  >
                    <span 
                      className="text-gray-600"
                      itemProp="name"
                    >
                      {details.location}
                    </span>
                    <meta 
                      itemProp="item" 
                      content={`https://healthquicklab.com/pathology/${details.location.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                    <meta itemProp="position" content="3" />
                    <span className="mx-2 text-gray-500">/</span>
                  </li>
                  <li 
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="flex items-center"
                  >
                    <span 
                      className="text-gray-600"
                      itemProp="name"
                    >
                      {details.area}
                    </span>
                    <meta 
                      itemProp="item" 
                      content={`https://healthquicklab.com/pathology/${details.location.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                    <meta itemProp="position" content="4" />
                    <span className="mx-2 text-gray-500">/</span>
                  </li>
                  <li 
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    className="flex items-center"
                  >
                    <span 
                      className="text-gray-600"
                      itemProp="name"
                    >
                      {details.name}
                    </span>
                    <meta 
                      itemProp="item" 
                      content={`https://healthquicklab.com/pathology/${details.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                    <meta itemProp="position" content="5" />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-16">
          <div className="max-w-5xl mx-auto">
            {/* Header with Logo and Basic Info */}
            <div className="flex items-start gap-6 mb-8">
              {/* Lab Logo */}
              <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={details.imageUrl || heroImage.src}
                  alt={details.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Basic Info */}
              <div className="flex-grow">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{details.name}</h1>
                <div className="text-gray-600 mb-2">{details.categories.join(' • ')}</div>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  {details.address}
                </div>
                
                {/* Badges Row */}
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    <FaStar className="mr-1 text-yellow-500" />
                    <span className="font-medium">{details.rating}</span>
                    <span className="mx-1">•</span>
                    <span>500+ Ratings</span>
                  </div>
                  <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Online Booking Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center divide-x divide-gray-300">
                <div className="px-4">
                  <div className="text-sm text-gray-600">Opening Hours</div>
                  <div className="font-medium">{details.timings.open} - {details.timings.close}</div>
                </div>
                <div className="px-4">
                  <div className="text-sm text-gray-600">Starting From</div>
                  <div className="font-medium">₹{details.startingPrice}</div>
                </div>
                <div className="px-4">
                  <div className="text-sm text-gray-600">Contact</div>
                  <div className="font-medium">{details.phone}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  <FaDirections className="mr-2" />
                  Directions
                </button>
                <button className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                  <FaShare className="mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Content */}
              <div className="col-span-8">
                {/* Image Gallery Grid */}
                <div className="grid grid-cols-12 gap-4 mb-8">
                  {/* Main Large Image */}
                  <div className="col-span-8 relative aspect-[16/9] cursor-pointer" onClick={() => {
                    setCurrentImageIndex(0);
                    setSelectedImage(details.images[0]);
                  }}>
                    <Image
                      src={details.images[0].src}
                      alt={details.images[0].alt}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </div>

                  {/* Side Images */}
                  <div className="col-span-4 grid grid-rows-2 gap-4">
                    {details.images.slice(1, 3).map((image, index) => (
                      <div 
                        key={index}
                        className="relative aspect-square cursor-pointer"
                        onClick={() => {
                          setCurrentImageIndex(index + 1);
                          setSelectedImage(image);
                        }}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        {index === 1 && details.images.length > 3 && (
                          <div 
                            className="absolute inset-0 bg-black bg-opacity-75 rounded-lg flex items-center justify-center cursor-pointer"
                            onClick={() => setIsGalleryView(true)}
                          >
                            <span className="text-white text-lg font-semibold">
                              View Gallery
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="flex border-b overflow-x-auto">
                    {(['overview', 'walk-in', 'home-collection', 'reviews', 'photos'] as TabType[]).map((tab) => (
                      <button
                        key={tab}
                        className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                          activeTab === tab
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab === 'walk-in' && 'Walk-in Tests'}
                        {tab === 'home-collection' && 'Home Collection'}
                        {tab === 'overview' && 'Overview'}
                        {tab === 'reviews' && 'Reviews'}
                        {tab === 'photos' && 'Photos'}
                      </button>
                    ))}
                  </div>

                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div className="prose max-w-none">
                        <p>{details.overview}</p>
                      </div>
                    )}

                    {activeTab === 'walk-in' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Available Walk-in Tests</h3>
                          <div className="text-sm text-gray-600">
                            Visit Time: 9:00 AM - 6:00 PM
                          </div>
                        </div>
                        
                        <div className="grid gap-4">
                          {walkInTests.map((test) => (
                            <div 
                              key={test.id}
                              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-lg">{test.name}</h4>
                                  <p className="text-gray-600 text-sm mt-1">{test.description}</p>
                                  <div className="mt-2 space-y-1 text-sm">
                                    <p className="text-gray-600">Preparation: {test.preparation}</p>
                                    <p className="text-gray-600">Report: {test.reportTime}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold">₹{test.price}</div>
                                  {test.discount && (
                                    <div className="text-green-600 text-sm">
                                      {test.discount}% OFF
                                    </div>
                                  )}
                                  <button 
                                    onClick={() => handleAddToCart(test, 'walk-in')}
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center gap-2"
                                  >
                                    <FaShoppingCart size={16} />
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'home-collection' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Home Collection Tests</h3>
                          <div className="text-sm text-gray-600">
                            Collection Time: 6:00 AM - 4:00 PM
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                          <div className="flex items-start">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FaInfoCircle className="text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <h4 className="font-medium">Home Collection Service</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Our trained phlebotomists will visit your home for sample collection.
                                Please keep your prescription ready if available.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid gap-4">
                          {homeCollectionTests.map((test) => (
                            <div 
                              key={test.id}
                              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-lg">{test.name}</h4>
                                  <p className="text-gray-600 text-sm mt-1">{test.description}</p>
                                  <div className="mt-2 space-y-1 text-sm">
                                    <p className="text-gray-600">Preparation: {test.preparation}</p>
                                    <p className="text-gray-600">Report: {test.reportTime}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold">₹{test.price}</div>
                                  {test.discount && (
                                    <div className="text-green-600 text-sm">
                                      {test.discount}% OFF
                                    </div>
                                  )}
                                  <button 
                                    onClick={() => handleAddToCart(test, 'home-collection')}
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center gap-2"
                                  >
                                    <FaShoppingCart size={16} />
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add other tab contents */}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-span-4">
              

                {/* Location Card */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold mb-4">Location</h3>
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <iframe
                      src={details.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Gallery Modal */}
        {isGalleryView && (
          <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
            <div className="sticky top-0 bg-black bg-opacity-90 p-4 flex justify-between items-center">
              <h2 className="text-white text-xl font-semibold">All Photos</h2>
              <button 
                onClick={() => setIsGalleryView(false)}
                className="text-white hover:text-gray-300"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {details.images.map((image, index) => (
                  <div 
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div style={{ paddingBottom: `${(image.height / image.width) * 100}%` }} />
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover rounded-lg hover:opacity-90"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Image Zoom Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 z-10 text-white hover:text-gray-300 p-2"
                aria-label="Previous image"
              >
                <FaChevronLeft size={24} />
              </button>

              {/* Image */}
              <div className="relative w-full h-full p-4 flex items-center justify-center">
                <Image
                  src={details.images[currentImageIndex].src}
                  alt={details.images[currentImageIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 z-10 text-white hover:text-gray-300 p-2"
                aria-label="Next image"
              >
                <FaChevronRight size={24} />
              </button>

              {/* Close Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <span className="text-3xl">×</span>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
                {currentImageIndex + 1} / {details.images.length}
              </div>
            </div>
          </div>
        )}

        {showToast && (
          <Toast 
            message="Test added to cart successfully!" 
            onClose={() => setShowToast(false)} 
          />
        )}
      </div>
    </>
  );
} 