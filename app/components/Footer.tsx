'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import googleSVG from '@/app/assets/website/google-play-badges.svg';
import IOSSVG from '@/app/assets/website/app-store.svg';

/**
 * Footer Component
 * 
 * A comprehensive footer with multiple sections including company info,
 * partner links, legal information, and social media links
 */
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-300 to to-sky-400 text-gray-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* About Health Quick Lab */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4">About Health Quick Lab</h3>
              <ul className="space-y-2">
                <li><Link href="/who-we-are" className="hover:text-blue-400 transition-colors">Who We Are</Link></li>
                <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Work With Us</Link></li>
                <li><Link href="/investors" className="hover:text-blue-400 transition-colors">Investor Relations</Link></li>
                <li><Link href="/report-fraud" className="hover:text-blue-400 transition-colors">Report Fraud</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* For Pathologies */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4">For Pathologies</h3>
              <ul className="space-y-2">
                <li><Link href="/partner" className="hover:text-blue-400 transition-colors">Partner With Us</Link></li>
                <li><Link href="/apps" className="hover:text-blue-400 transition-colors">Apps For You</Link></li>
              </ul>
            </div>

            {/* For Doctors */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4">For Doctors</h3>
              <ul className="space-y-2">
                <li><Link href="/doctor-partner" className="hover:text-blue-400 transition-colors">Partner With Us</Link></li>
                <li><Link href="/doctor-apps" className="hover:text-blue-400 transition-colors">Apps For You</Link></li>
              </ul>
            </div>

            {/* Learn More */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4">Learn More</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link></li>
                <li><Link href="/security" className="hover:text-blue-400 transition-colors">Security</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms</Link></li>
              </ul>
            </div>

            {/* Social Links & App Downloads */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Social Links</h3>
                <div className="flex space-x-4">
                  <Link href="https://facebook.com" className="hover:text-blue-400 transition-colors">
                    <FaFacebookF size={20} />
                  </Link>
                  <Link href="https://twitter.com" className="hover:text-blue-400 transition-colors">
                    <FaTwitter size={20} />
                  </Link>
                  <Link href="https://instagram.com" className="hover:text-blue-400 transition-colors">
                    <FaInstagram size={20} />
                  </Link>
                  <Link href="https://linkedin.com" className="hover:text-blue-400 transition-colors">
                    <FaLinkedinIn size={20} />
                  </Link>
                  <Link href="https://youtube.com" className="hover:text-blue-400 transition-colors">
                    <FaYoutube size={20} />
                  </Link>
                </div>
              </div>

              {/* App Download Links */}
              <div className="space-y-3">
                <h3 className="text-white text-lg font-semibold">Download App</h3>
                <div className="space-y-2">
                  <Link href="https://play.google.com"
                  className="w-[135px] h-[40px] relative inline-block">
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
                    className="w-[135px] h-[40px] relative inline-block"
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
