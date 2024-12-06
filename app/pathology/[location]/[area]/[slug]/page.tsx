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
  FaDirections, FaShare, FaComment, FaChevronRight, 
  FaRegClock, FaRupeeSign, FaChevronLeft, FaInfoCircle, 
  FaShoppingCart, FaCalendarAlt, FaCertificate, FaUserMd,
  FaCheckCircle, FaHospital, FaStethoscope, FaThumbsUp
} from 'react-icons/fa';
import heroImage from '@/app/assets/hero/hero-1.png';
import secondImage from '@/app/assets/hero/hero-1.jpeg';
import thirdImage from '@/app/assets/hero/hero-1.jpg';
import { Toast } from '@/app/components/Toast';
import { useCart } from '@/app/context/CartContext';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const [showToast, setShowToast] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(4); // Initial number of reviews to show
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 0,
    comment: ''
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    rating?: string;
    comment?: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

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
          src: secondImage.src,
          alt: "Equipment",
          width: 800,
          height: 600
        },
        {
          src: thirdImage.src,
          alt: "Staff",
          width: 1200,
          height: 800
        },
        {
          src: heroImage.src,
          alt: "Lab Facilities",
          width: 1200,
          height: 800
        },
        {
          src: heroImage.src,
          alt: "Reception",
          width: 1200,
          height: 800
        }
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
          comment: "Excellent service and quick results. The staff was very professional and the lab is well maintained. Reports were delivered on time.",
          date: "2024-01-15"
        },
        {
          user: "Sarah Smith",
          rating: 4,
          comment: "Good experience overall. Clean facility and courteous staff. Reasonable pricing compared to other labs.",
          date: "2024-01-10"
        },
        {
          user: "Rahul Kumar",
          rating: 5,
          comment: "Very satisfied with the home collection service. The technician was punctual and professional.",
          date: "2024-01-05"
        },
        {
          user: "Priya Sharma",
          rating: 4,
          comment: "Convenient location and modern facilities. Reports are accurate and delivered on time.",
          date: "2023-12-28"
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

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate API delay
    setTimeout(() => {
      setVisibleReviews(prev => prev + 4); // Load 4 more reviews
      setIsLoadingMore(false);
    }, 500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(undefined);
    
    // Validate form
    const errors: typeof formErrors = {};
    if (!reviewForm.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!reviewForm.rating) {
      errors.rating = 'Please select a rating';
    }
    if (!reviewForm.comment.trim()) {
      errors.comment = 'Review comment is required';
    } else if (reviewForm.comment.length < 10) {
      errors.comment = 'Review must be at least 10 characters';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form after success
      setTimeout(() => {
        setShowReviewForm(false);
        setReviewForm({ name: '', rating: 0, comment: '' });
        setSubmitStatus(null);
      }, 2000);
    }, 1000);
  };

  
  const scrollToReviews = () => {
    setActiveTab('reviews');
    // Find the tabs container and scroll to it
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
      tabsContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };


  if (!details) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(details))
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav 
        className="bg-white border-b sticky top-[64px] z-40 backdrop-blur-sm bg-white/90"
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
          {/* Combined Basic Info, Image Gallery, and Tabs Section */}
          <div className="bg-white rounded-2xl shadow-sm mb-8">
            {/* Basic Info */}
            <div className="p-4 border-b">
              <div className="flex-grow space-y-2">
                {/* Name and Phone Section */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {details.name}
                    </h1>
                    <div className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span>Open Now</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <FaPhone className="text-blue-500" />
                    <span className="font-medium">{details.phone}</span>
                  </div>
                </div>

                {/* Categories and Address */}
                <div className="flex items-center text-gray-600 gap-2">
                  <div className="flex items-center gap-1.5">
                    <FaHospital className="text-blue-500" />
                    <span>{details.categories.join(' • ')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>{details.address}</span>
                  </div>
                </div>

                {/* Opening Hours Info */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-gray-50 border border-red-200 px-3 py-1.5 rounded-full text-sm font-medium">
                    <FaClock className="text-red-500" />
                    <span className="text-gray-700">{details.timings.open} - {details.timings.close}</span>
                    <span className="mx-1.5 text-gray-500">|</span>
                    <FaCalendarAlt className="text-red-500" />
                    <span className="text-gray-700">{details.timings.days}</span>
                  </div>
                </div>

                {/* Enhanced badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
                    <FaStar className="mr-2 text-yellow-500" />
                    <span>{details.rating}</span>
                    <span className="mx-1">•</span>
                    <span>500+ Ratings</span>
                  </div>

                  <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">
                    <FaCheckCircle className="mr-2" />
                    <span>NABL Accredited</span>
                  </div>

                  <div className="flex items-center bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors">
                    <FaUserMd className="mr-2" />
                    <span>Expert Pathologists</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all group">
                    <FaShoppingCart className="group-hover:scale-110 transition-transform" />
                    <span>Book Online</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all group">
                    <FaDirections className="text-blue-500 group-hover:scale-110 transition-transform" />
                    <span>Direction</span>
                  </button>

                  <button 
                    onClick={() => scrollToReviews()}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all group"
                  >
                    <FaComment className="text-blue-500 group-hover:scale-110 transition-transform"/>
                    <span>Reviews</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all group">
                    <FaShare className="text-blue-500 group-hover:scale-110 transition-transform" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="p-0.5 border-b">
              <div className="flex">
                {/* Hero Image */}
                <div 
                  className="w-2/3 relative aspect-[16/9] cursor-pointer overflow-hidden group h-[300px]"
                  onClick={() => {
                    setCurrentImageIndex(0);
                    setSelectedImage(details.images[0]);
                  }}
                >
                  <Image
                    src={details.images[0].src}
                    alt={details.images[0].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1280px) 66vw, 800px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Side Images Column */}
                <div className="w-1/3 grid grid-cols-2 h-[300px]">
                  {/* Second and Third Images Column */}
                  <div className="flex flex-col">
                    {/* Second Image */}
                    <div 
                      className="relative h-1/2 cursor-pointer overflow-hidden group"
                      onClick={() => {
                        setCurrentImageIndex(2);
                        setSelectedImage(details.images[2]);
                      }}
                    >
                      <div className="absolute inset-0 border-r border-t border-b border-gray-200 z-10" />
                      <Image
                        src={details.images[2]?.src || heroImage.src}
                        alt={details.images[2]?.alt || "Lab Image"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1280px) 33vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Third Image */}
                    <div 
                      className="relative h-1/2 cursor-pointer overflow-hidden group"
                      onClick={() => {
                        setCurrentImageIndex(3);
                        setSelectedImage(details.images[3]);
                      }}
                    >
                      <div className="absolute inset-0 border-r border-b border-gray-200 z-10" />
                      <Image
                        src={details.images[3]?.src || heroImage.src}
                        alt={details.images[3]?.alt || "Lab Image"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1280px) 33vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Fourth Side Image */}
                  <div className="relative cursor-pointer overflow-hidden group">
                    <div className="absolute inset-0 border-t border-b border-gray-200 z-10" />
                    <Image
                      src={details.images[1]?.src || heroImage.src}
                      alt={details.images[1]?.alt || "Lab Image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1280px) 33vw, 400px"
                    />
                    {/* Gallery Overlay */}
                    {details.images.length > 3 && (
                      <div 
                        className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer backdrop-blur-[2px] z-20"
                        onClick={() => {
                          setCurrentImageIndex(4);
                          setSelectedImage(details.images[4]);
                        }}
                      >
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          <div className="text-white text-lg font-semibold mb-1">View Gallery</div>
                          <div className="text-gray-200 text-sm text-center">
                            +{details.images.length - 3} Photos
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="tabs-container">
              <div className="flex border-b overflow-x-auto hide-scrollbar">
                {(['overview', 'walk-in', 'home-collection', 'reviews'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    className={`px-8 py-4 text-base font-semibold whitespace-nowrap transition-colors relative 
                      ${activeTab === tab
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                      }
                    `}
                    onClick={() => setActiveTab(tab)}
                  >
                    <div className="flex items-center gap-2">
                      {tab === 'overview' && <FaInfoCircle size={18} />}
                      {tab === 'walk-in' && <FaStethoscope size={18} />}
                      {tab === 'home-collection' && <FaHospital size={18} />}
                      {tab === 'reviews' && <FaComment size={18} />}
                      <span className="tracking-wide">
                        {tab === 'walk-in' ? 'Walk-in Tests' : 
                         tab === 'home-collection' ? 'Home Collection' :
                         tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </span>
                    </div>
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-slide-in" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-4">
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

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {/* Reviews Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">Customer Reviews</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center text-yellow-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={star <= details.rating ? 'text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-semibold">{details.rating}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600">{details.reviews.length} reviews</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                       onClick={() => setShowReviewForm(true)}>
                        <FaComment />
                        <span>Write a Review</span>
                      </button>
                    </div>

                    {/* Reviews List */}
                    <div className="grid grid-cols-2 gap-4">
                      {details.reviews.slice(0, visibleReviews).map((review, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
                          {/* Review Header */}
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-base">{review.user}</h4>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="flex text-yellow-400">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                      key={star}
                                      size={12}
                                      className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                    />
                                  ))}
                                </div>
                                <span className="text-gray-500 text-xs">•</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(review.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>
                            {/* <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                              <FaShare size={12} />
                            </button> */}
                          </div>

                          {/* Review Content */}
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {review.comment}
                          </p>

                          {/* Review Actions */}
                          {/* <div className="flex items-center gap-3 pt-1">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-xs">
                              <FaThumbsUp size={12} />
                              <span>Helpful</span>
                            </button>
                            <button className="text-gray-500 hover:text-blue-600 text-xs">
                              Report
                            </button>
                          </div> */}
                        </div>
                      ))}
                    </div>

                    {/* Load More Button - Updated */}
                    {visibleReviews < details.reviews.length && (
                      <div className="text-center pt-3">
                        <button 
                          className={`px-5 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto ${
                            isLoadingMore ? 'opacity-75 cursor-not-allowed' : ''
                          }`}
                          onClick={handleLoadMore}
                          disabled={isLoadingMore}
                        >
                          {isLoadingMore ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Loading...</span>
                            </>
                          ) : (
                            <>
                              <span>Load More Reviews</span>
                              <span className="text-gray-500">({details.reviews.length - visibleReviews} more)</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Add other tab contents */}
              </div>
            </div>
          </div>

          {/* Map Section - Moved to bottom */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="max-w-5xl mx-auto">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Location & Directions</h3>
                  <div className="aspect-[21/9] relative rounded-lg overflow-hidden">
                    <iframe
                      src={details.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="mt-4 flex items-start gap-3 text-gray-600">
                    <FaMapMarkerAlt className="text-blue-500 mt-1" />
                    <p>{details.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {showReviewForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-xl shadow-xl w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Write a Review</h3>
                <button 
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-6">
                {/* Name Input */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      formErrors?.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your name"
                  />
                  {formErrors?.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div> */}

                {/* Rating Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className={`text-2xl transition-colors ${
                          star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                  {formErrors?.rating && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.rating}</p>
                  )}
                </div>

                {/* Review Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      formErrors?.comment ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Share your experience..."
                  />
                  {formErrors?.comment && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.comment}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-all
                    ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                  `}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit Review'
                  )}
                </button>
              </form>

              {/* Status Messages */}
              {submitStatus && (
                <div 
                  className={`mt-4 p-4 rounded-lg text-center font-medium ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {submitStatus === 'success' 
                    ? 'Review submitted successfully!' 
                    : 'Failed to submit review. Please try again.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 