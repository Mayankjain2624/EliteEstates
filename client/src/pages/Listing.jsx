import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaHeart,
  FaEye,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaDollarSign,
  FaTag,
  FaHome,
  FaUser
} from 'react-icons/fa';

import Contact from '../components/Contact';
import LikeButton from '../components/LikeButton';
import ViewCounter from '../components/ViewCounter';
import TourBookingForm from '../components/TourBookingForm';
export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [showTourForm, setShowTourForm] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAndTrackListing = async () => {
      try {
        setLoading(true);
        const listingId = params.id;
        const response = await fetch(`/api/listing/get/${listingId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch listing');
        }
        
        const data = await response.json();
        setListing(data);
        
        // Track view analytics
        try {
          await fetch(`/api/analytics/view/${listingId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (analyticsError) {
          console.log('Analytics tracking error:', analyticsError);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndTrackListing();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Loading property details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-600 text-2xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Property</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );

  if (!listing) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaHome className="text-gray-400 text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h1>
        <p className="text-gray-600">The listing you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {listing && !loading && !error && (
        <div className="relative">
          {/* Image Gallery */}
          <div className="relative">
            <Swiper navigation modules={[Navigation]} className="h-96 md:h-[500px]">
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-full w-full"
                    style={{
                      background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Share Button */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                <FaShare className="text-lg" />
              </button>
            </div>

            {/* Like Button */}
            <div className="absolute top-4 right-20 z-20">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
                <LikeButton listingId={listing._id} size="large" />
              </div>
            </div>

            {/* Copy Notification */}
            {copied && (
              <div className="absolute top-20 right-4 z-20 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                <span className="flex items-center">
                  <span className="mr-2">✅</span>
                  Link copied!
                </span>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Property Header */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="flex-1">
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{listing.name}</h1>
                      <div className="flex items-center text-gray-600 mb-4">
                        <FaMapMarkerAlt className="text-blue-600 mr-2" />
                        <span className="text-lg">{listing.address}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end space-y-2">
                      <div className="flex items-center text-3xl font-bold text-gray-800">
                        <FaDollarSign className="text-green-600 mr-1" />
                        {listing.offer
                          ? listing.discountedPrice.toLocaleString('en-US')
                          : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && (
                          <span className="text-lg font-normal text-gray-500 ml-1">/month</span>
                        )}
                      </div>
                      {listing.offer && (
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <FaTag className="mr-1" />
                          ${(+listing.regularPrice - +listing.discountedPrice).toLocaleString()} OFF
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Type & View Counter */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className={`px-4 py-2 rounded-full text-white font-medium ${
                      listing.type === 'rent' ? 'bg-blue-600' : 'bg-green-600'
                    }`}>
                      {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </div>
                    <ViewCounter listingId={listing._id} size="normal" />
                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FaBed className="text-blue-600 text-xl" />
                      <span className="font-medium">
                        {listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FaBath className="text-blue-600 text-xl" />
                      <span className="font-medium">
                        {listing.bathrooms} {listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FaParking className="text-blue-600 text-xl" />
                      <span className="font-medium">
                        {listing.parking ? 'Parking Available' : 'No Parking'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FaChair className="text-blue-600 text-xl" />
                      <span className="font-medium">
                        {listing.furnished ? 'Furnished' : 'Unfurnished'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Property</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{listing.description}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                {currentUser && listing.userRef !== currentUser._id && (
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <FaUser className="mr-2 text-blue-600" />
                      Contact Property Owner
                    </h3>
                    
                    {!contact ? (
                      <div className="space-y-3">
                        <button
                          onClick={() => setContact(true)}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                        >
                          <FaEnvelope className="h-4 w-4" />
                          <span>Send Message</span>
                        </button>
                        <button
                          onClick={() => setShowTourForm(true)}
                          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                        >
                          <FaCalendarAlt className="h-4 w-4" />
                          <span>Schedule Tour</span>
                        </button>
                      </div>
                    ) : (
                      <Contact listing={listing} />
                    )}
                  </div>
                )}

                {/* Property Stats */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Property Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Property Type</span>
                      <span className="font-medium text-gray-800 capitalize">{listing.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Bedrooms</span>
                      <span className="font-medium text-gray-800">{listing.bedrooms}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Bathrooms</span>
                      <span className="font-medium text-gray-800">{listing.bathrooms}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Parking</span>
                      <span className="font-medium text-gray-800">
                        {listing.parking ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Furnished</span>
                      <span className="font-medium text-gray-800">
                        {listing.furnished ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tour Booking Form */}
          <TourBookingForm
            listing={listing}
            isOpen={showTourForm}
            onClose={() => setShowTourForm(false)}
            onSuccess={(booking) => {
              console.log('Tour booked successfully:', booking);
              alert('Tour booking request sent successfully!');
            }}
          />
        </div>
      )}
    </div>
  );
}
