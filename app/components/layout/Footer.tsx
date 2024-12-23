'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube,
  FaInfoCircle, FaBlog, FaBriefcase, FaChartLine, FaExclamationTriangle, FaEnvelope,
  FaHandshake, FaMobileAlt, FaUserMd, FaLock, FaShieldAlt, FaFileContract,
  FaUsers, FaBook, FaGlobe
} from 'react-icons/fa';
import googleSVG from '@/app/assets/website/google-play-badges.svg';
import IOSSVG from '@/app/assets/website/app-store.svg';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-300 to to-sky-400 text-gray-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* About Health Quick Lab */}
            <div className="space-y-4 group">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FaUsers className="text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                About Health Quick Lab
              </h3>
              <ul className="space-y-2">
                {[
                  { text: 'Who We Are', href: '/who-we-are', icon: FaInfoCircle },
                  { text: 'Blog', href: '/blog', icon: FaBlog },
                  { text: 'Work With Us', href: '/careers', icon: FaBriefcase },
                  { text: 'Investor Relations', href: '/investors', icon: FaChartLine },
                  { text: 'Report Fraud', href: '/report-fraud', icon: FaExclamationTriangle },
                  { text: 'Contact Us', href: '/contact', icon: FaEnvelope }
                ].map((item) => (
                  <li key={item.text}>
                    <Link 
                      href={item.href} 
                      className="hover:text-blue-600 transition-colors flex items-center gap-2 group"
                    >
                      <item.icon className="text-sm opacity-50 group-hover:opacity-100 transform group-hover:scale-110 transition-all" />
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        {item.text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Pathologies */}
            <div className="space-y-4 group">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FaHandshake className="text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                For Pathologies
              </h3>
              <ul className="space-y-2">
                {[
                  { text: 'Partner With Us', href: '/partner', icon: FaHandshake },
                  { text: 'Apps For You', href: '/apps', icon: FaMobileAlt }
                ].map((item) => (
                  <li key={item.text}>
                    <Link 
                      href={item.href} 
                      className="hover:text-blue-600 transition-colors flex items-center gap-2 group"
                    >
                      <item.icon className="text-sm opacity-50 group-hover:opacity-100 transform group-hover:scale-110 transition-all" />
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        {item.text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Doctors */}
            <div className="space-y-4 group">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FaUserMd className="text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                For Doctors
              </h3>
              <ul className="space-y-2">
                {[
                  { text: 'Partner With Us', href: '/doctor-partner', icon: FaUserMd },
                  { text: 'Apps For You', href: '/doctor-apps', icon: FaMobileAlt }
                ].map((item) => (
                  <li key={item.text}>
                    <Link 
                      href={item.href} 
                      className="hover:text-blue-600 transition-colors flex items-center gap-2 group"
                    >
                      <item.icon className="text-sm opacity-50 group-hover:opacity-100 transform group-hover:scale-110 transition-all" />
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        {item.text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More */}
            <div className="space-y-4 group">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FaBook className="text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                Learn More
              </h3>
              <ul className="space-y-2">
                {[
                  { text: 'Privacy', href: '/privacy', icon: FaLock },
                  { text: 'Security', href: '/security', icon: FaShieldAlt },
                  { text: 'Terms', href: '/terms', icon: FaFileContract }
                ].map((item) => (
                  <li key={item.text}>
                    <Link 
                      href={item.href} 
                      className="hover:text-blue-600 transition-colors flex items-center gap-2 group"
                    >
                      <item.icon className="text-sm opacity-50 group-hover:opacity-100 transform group-hover:scale-110 transition-all" />
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        {item.text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links & App Downloads */}
            <div className="space-y-6 group">
              <div>
                <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaGlobe className="text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                  Social Links
                </h3>
                <div className="flex space-x-4">
                  {[
                    { icon: FaFacebookF, href: 'https://facebook.com' },
                    { icon: FaTwitter, href: 'https://twitter.com' },
                    { icon: FaInstagram, href: 'https://instagram.com' },
                    { icon: FaLinkedinIn, href: 'https://linkedin.com' },
                    { icon: FaYoutube, href: 'https://youtube.com' }
                  ].map((social, index) => (
                    <Link 
                      key={index} 
                      href={social.href}
                      className="hover:text-blue-600 transition-all transform hover:scale-125"
                    >
                      <social.icon size={20} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* App Download Links */}
              <div className="space-y-3">
                <h3 className="text-white text-lg font-semibold">Download App</h3>
                <div className="space-y-2">
                  <Link 
                    href="https://play.google.com"
                    className="w-[135px] h-[40px] relative inline-block transform hover:-translate-y-1 transition-transform"
                  >
                    <Image
                      src={googleSVG}
                      alt="Get it on Google Play"
                      fill
                      sizes="135px"
                      className="hover:opacity-90 transition-opacity object-contain"
                    />
                  </Link>
                  <Link 
                    href="https://apps.apple.com"
                    className="w-[135px] h-[40px] relative inline-block transform hover:-translate-y-1 transition-transform"
                  >
                    <Image
                      src={IOSSVG}
                      alt="Download on App Store"
                      fill
                      sizes="135px"
                      className="hover:opacity-90 transition-opacity object-contain"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-sm">
              © {new Date().getFullYear()} Health Quick Lab. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
