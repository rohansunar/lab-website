'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { 
  FaStar, FaMapMarkerAlt, FaPhone, FaClock, 
  FaDirections, FaShare, FaComment, FaChevronRight, 
  FaChevronLeft, FaInfoCircle, 
  FaShoppingCart, FaCalendarAlt, FaUserMd,
  FaCheckCircle, FaHospital, FaStethoscope } from 'react-icons/fa';
import { mockPathologyDetails, walkInTests, homeCollectionTests, healthPackages } from '@/app/data/mockData';
import { Toast } from '@/app/components/Toast';
import { useCart } from '@/app/context/CartContext';
import BreadcrumbSEO from '@/app/components/BreadcrumbSEO';
import type { PathologyDetails, GalleryImage, PathologyParams } from '@/app/types';


type TabType = 'overview' | 'appointment' | 'reviews';

export default function PathologyDetails({ params }: { params: Promise<PathologyParams> }) {
  const [details, setDetails] = useState<PathologyDetails | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const [visibleReviews, setVisibleReviews] = useState(4);
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
  const selectedPathologyId = localStorage.getItem('selectedPathologyId');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('walk-in');

  const testCategories = [
    { 
      id: 'walk-in', 
      name: 'Walk-In', 
      icon: FaHospital,
      description: 'Visit lab for sample collection',
      count: walkInTests?.length || 0
    },
    { 
      id: 'home', 
      name: 'Home Collection', 
      icon: FaUserMd,
      description: 'Get samples collected at home',
      count: homeCollectionTests?.length || 0
    },
    { 
      id: 'packages', 
      name: 'Health Packages', 
      icon: FaStethoscope,
      description: 'Comprehensive health checkups',
      count: healthPackages?.length || 0
    },
  ];

  // useEffect(() => {
  //   setDetails(mockPathologyDetails);
  // }, [resolvedParams.slug]);

  
  useEffect(() => {
    (async () => {
    if (selectedPathologyId) {
      try {
        const response = await fetch(`http://localhost:4000/labs/${selectedPathologyId}`, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Failed to fetch pathology details:', error);
      }
    }
  })();
  }, [selectedPathologyId]);

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

  const handleAddToCart = (test: TestType, type: 'walk-in' | 'home-collection' | 'package') => {
    const wasAdded = addToCart({
      id: test.id,
      name: test.name,
      price: test.price,
      pathologyName: details?.name || '',
      type: type
    });

    if (wasAdded) {
      setToastMessage({
        message: "Test added to cart successfully!",
        type: 'success'
      });
    } else {
      setToastMessage({
        message: "This test is already in your cart",
        type: 'error'
      });
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleReviews(prev => prev + 4);
      setIsLoadingMore(false);
    }, 500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(undefined);
    
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
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => {
        setShowReviewForm(false);
        setReviewForm({ name: '', rating: 0, comment: '' });
        setSubmitStatus(null);
      }, 2000);
    }, 1000);
  };

  const scrollToReviews = () => {
    setActiveTab('reviews');
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
      tabsContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = () => {
    setActiveTab('appointment');
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
      tabsContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

 

  if (!details) return <div>Loading...</div>;
  // const {city,state,country,pincode} = details.address
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BreadcrumbSEO 
        name={details.name}
        location={resolvedParams.location}
        area={resolvedParams.area}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm mb-8">
            <div className="p-4 border-b">
              <div className="flex-grow space-y-2">
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
                  <div className="relative group">
                    <div className="flex items-center gap-1.5 bg-green-50 px-3 py-2 rounded-lg">
                      <FaUserMd className="text-green-600" />
                      <span className="text-green-700 font-small">Home Sample Collection</span>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-2 px-3 rounded-lg shadow-lg whitespace-nowrap flex items-center gap-2">
                      <FaCheckCircle className="text-green-400" />
                      <span>Available within 5 km service area</span>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 gap-2">
                  <div className="flex items-center gap-1.5">
                    <FaHospital className="text-blue-500" />
                    <span>{details.categories.join(' • ')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>
                    {details.address.street}, {details.address.city}, {details.address.state}, {details.address.country}, {details.address.pincode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-gray-50 border border-red-200 px-3 py-1.5 rounded-full text-sm font-medium">
                    <FaClock className="text-red-500" />
                    <span className="text-gray-700">{details.openingTime} - {details.closingTime}</span>
                    <span className="mx-1.5 text-gray-500">|</span>
                    <FaCalendarAlt className="text-red-500" />
                    <span className="text-gray-700">{details.workingDays}</span>
                  </div>
                  <span className="mx-1.5 text-gray-500">|</span>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaPhone className="text-blue-500" />
                    <span className="font-medium">{details.phone}</span>
                  </div>
                </div>

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

                <div className="flex flex-wrap gap-2">
                  <button 
                  onClick={() => scrollToBooking()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all group">
                    <FaShoppingCart className="group-hover:scale-110 transition-transform animate-pulse" />
                    <span>Book An Appointment</span>
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

            <div className="p-0.5 border-b">
              <div className="flex">
                <div 
                  className="w-2/3 relative aspect-[16/9] cursor-pointer overflow-hidden group h-[300px]"
                  onClick={() => {
                    setCurrentImageIndex(0);
                    setSelectedImage(details.images[0]);
                  }}
                >
                  <Image
                    src={mockPathologyDetails.images[0].src}
                    alt={mockPathologyDetails.images[0].alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1280px) 66vw, 800px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="w-1/3 grid grid-cols-2 h-[300px]">
                  <div className="flex flex-col">
                    <div 
                      className="relative h-1/2 cursor-pointer overflow-hidden group"
                      onClick={() => {
                        setCurrentImageIndex(2);
                        setSelectedImage(mockPathologyDetails.images[2]);
                      }}
                    >
                      <div className="absolute inset-0 border-r border-t border-b border-gray-200 z-10" />
                      <Image
                        src={mockPathologyDetails.images[2]?.src || mockPathologyDetails.images[0].src}
                        alt={mockPathologyDetails.images[2]?.alt || "Lab Image"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1280px) 33vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div 
                      className="relative h-1/2 cursor-pointer overflow-hidden group"
                      onClick={() => {
                        setCurrentImageIndex(3);
                        setSelectedImage(mockPathologyDetails.images[3]);
                      }}
                    >
                      <div className="absolute inset-0 border-r border-b border-gray-200 z-10" />
                      <Image
                        src={mockPathologyDetails.images[3]?.src || mockPathologyDetails.images[0].src}
                        alt={mockPathologyDetails.images[3]?.alt || "Lab Image"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1280px) 33vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  <div className="relative cursor-pointer overflow-hidden group">
                    <div className="absolute inset-0 border-t border-b border-gray-200 z-10" />
                    <Image
                      src={mockPathologyDetails.images[1]?.src || mockPathologyDetails.images[0].src}
                      alt={mockPathologyDetails.images[1]?.alt || "Lab Image"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1280px) 33vw, 400px"
                    />
                    {mockPathologyDetails.images.length > 3 && (
                      <div 
                        className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer backdrop-blur-[2px] z-20"
                        onClick={() => {
                          setCurrentImageIndex(4);
                          setSelectedImage(mockPathologyDetails.images[4]);
                        }}
                      >
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          <div className="text-white text-lg font-semibold mb-1">View Gallery</div>
                          <div className="text-gray-200 text-sm text-center">
                            +{mockPathologyDetails.images.length - 3} Photos
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </div>

            <div className="tabs-container">
              <div className="flex border-b overflow-x-auto hide-scrollbar">
                {(['overview', 'appointment', 'reviews'] as TabType[]).map((tab) => (
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
                      {tab === 'appointment' && <FaStethoscope size={18} />}
                      {tab === 'reviews' && <FaComment size={18} />}
                      <span className="tracking-wide">
                        {tab === 'walk-in' ? 'Walk-In' : 
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

                {activeTab === 'appointment' && (
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-3">
                      <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Categories</h3>
                        </div>
                        <div className="p-2">
                          {testCategories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => !category.disabled && setSelectedCategory(category.id)}
                              disabled={category.disabled}
                              className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all ${
                                category.disabled 
                                  ? 'opacity-50 cursor-not-allowed'
                                  : selectedCategory === category.id
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <div className={`p-2 rounded-lg ${
                                selectedCategory === category.id 
                                  ? 'bg-blue-100' 
                                  : 'bg-gray-100'
                              }`}>
                                <category.icon size={20} />
                              </div>
                              <div className="flex-1 text-left">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">{category.name}</p>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    selectedCategory === category.id
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {category.count}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">{category.description}</p>
                                {category.disabled && (
                                  <span className="text-xs text-orange-600 mt-1 block">
                                    Coming Soon
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-9">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">Available Tests</h3>
                            <span className="text-sm text-gray-500">
                              {selectedCategory === 'walk-in' ? walkInTests?.length :
                               selectedCategory === 'home' ? homeCollectionTests?.length :
                               selectedCategory === 'packages' ? healthPackages?.length : 0} Tests
                            </span>
                          </div>
                        </div>

                        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                          <div className="divide-y divide-gray-100">
                            {selectedCategory === 'walk-in' && walkInTests.map((test) => (
                              <div 
                                key={test.id}
                                className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4 group"
                              >
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-gray-900">{test.name}</h3>
                                  <div className="mt-1 flex items-center gap-3 text-sm">
                                    <span className="text-gray-500">{test.description}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">Report: {test.reportTime}</span>
                                    {test.preparation && (
                                      <>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-gray-500">{test.preparation}</span>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <div className="text-lg font-semibold text-gray-900">₹{test.price}</div>
                                    {test.discount > 0 && (
                                      <div className="text-sm text-gray-500 line-through">
                                        ₹{Math.round(test.price * (1 + test.discount/100))}
                                      </div>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => handleAddToCart(test, 'walk-in')}
                                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 opacity-1 group-hover:opacity-100"
                                  >
                                    <FaShoppingCart size={14} />
                                    <span>Add</span>
                                  </button>
                                </div>
                              </div>
                            ))}

                            {selectedCategory === 'home' && homeCollectionTests.map((test) => (
                              <div 
                                key={test.id}
                                className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4 group"
                              >
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-gray-900">{test.name}</h3>
                                  <div className="mt-1 flex items-center gap-3 text-sm">
                                    <span className="text-gray-500">{test.description}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">Report: {test.reportTime}</span>
                                    {test.preparation && (
                                      <>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-gray-500">{test.preparation}</span>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <div className="text-lg font-semibold text-gray-900">₹{test.price}</div>
                                    {test.discount > 0 && (
                                      <div className="text-sm text-gray-500 line-through">
                                        ₹{Math.round(test.price * (1 + test.discount/100))}
                                      </div>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => handleAddToCart(test, 'home-collection')}
                                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 opacity-1 group-hover:opacity-100"
                                  >
                                    <FaShoppingCart size={14} />
                                    <span>Add</span>
                                  </button>
                                </div>
                              </div>
                            ))}

                            {selectedCategory === 'packages' && healthPackages.map((test) => (
                              <div 
                                key={test.id}
                                className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4 group"
                              >
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-gray-900">{test.name}</h3>
                                  <div className="mt-1 flex items-center gap-3 text-sm">
                                    <span className="text-gray-500">{test.description}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">Report: {test.reportTime}</span>
                                    {test.preparation && (
                                      <>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-gray-500">{test.preparation}</span>
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <div className="text-lg font-semibold text-gray-900">₹{test.price}</div>
                                    {test.discount > 0 && test.originalPrice && (
                                      <div className="text-sm text-gray-500 line-through">₹{test.originalPrice}</div>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => handleAddToCart(test, 'package')}
                                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 opacity-1 group-hover:opacity-100"
                                  >
                                    <FaShoppingCart size={14} />
                                    <span>Add</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
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

                    <div className="grid grid-cols-2 gap-4">
                      {details.reviews.slice(0, visibleReviews).map((review, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
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
                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>

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
              </div>
            </div>
          </div>

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
                    <p>{details.address.street}, {details.address.city}, {details.address.state}, {details.address.country}, {details.address.pincode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 text-white hover:text-gray-300 p-2"
              aria-label="Previous image"
            >
              <FaChevronLeft size={24} />
            </button>

            <div className="relative w-full h-full p-4 flex items-center justify-center">
              <Image
                src={details.images[currentImageIndex].src}
                alt={details.images[currentImageIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 z-10 text-white hover:text-gray-300 p-2"
              aria-label="Next image"
            >
              <FaChevronRight size={24} />
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <span className="text-3xl">×</span>
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {currentImageIndex + 1} / {details.images.length}
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast 
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)} 
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

const TabButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`py-4 px-1 relative ${
      active
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {children}
  </button>
); 