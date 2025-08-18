import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { 
  FaSearch, 
  FaHome, 
  FaMapMarkerAlt, 
  FaStar, 
  FaUsers,
  FaAward,
  FaPhone,
  FaPlay,
  FaChevronRight,
  FaKey,
  FaCalculator,
  FaHandshake
} from 'react-icons/fa';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=50');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=50');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=50');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const stats = [
    { icon: FaHome, value: '10,000+', label: 'Properties Sold' },
    { icon: FaUsers, value: '5,000+', label: 'Happy Clients' },
    { icon: FaAward, value: '15+', label: 'Awards Won' },
    { icon: FaMapMarkerAlt, value: '50+', label: 'Cities Covered' }
  ];

  const services = [
    {
      icon: FaSearch,
      title: 'Property Search',
      description: 'Find your dream property with our advanced search tools and personalized recommendations.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaKey,
      title: 'Property Management',
      description: 'Complete property management services to maximize your investment returns.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaCalculator,
      title: 'Market Analysis',
      description: 'Get detailed market insights and property valuations from our expert team.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaHandshake,
      title: 'Expert Consultation',
      description: 'Receive professional guidance throughout your real estate journey.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'Elite Estates helped me find my dream home in just 2 weeks. Their service is exceptional!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b08c?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Investor',
      content: 'The best real estate platform I\'ve used. Professional, reliable, and results-driven.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emily Davis',
      role: 'First-time Buyer',
      content: 'Made my first home purchase stress-free. Highly recommend Elite Estates!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm font-medium mb-6">
                <FaStar className="mr-2" />
                #1 Rated Real Estate Platform
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Find Your
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Dream Home
                </span>
                With Ease
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover luxury properties with our premium real estate platform. 
                From elegant apartments to stunning villas, we connect you with your perfect home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/search"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <FaSearch className="mr-3" />
                  Explore Properties
                  <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <FaPlay className="mr-3" />
                  Watch Video Tour
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-3">
                      <stat.icon className="text-white text-xl" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Image/Video */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
                  {offerListings && offerListings.length > 0 && (
                    <img
                      src={offerListings[0].imageUrls[0]}
                      alt="Featured Property"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-xl font-semibold text-sm">
                  🔥 Hot Deal
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Virtual Tour Available</div>
                      <div className="text-xs text-gray-600">360° Property View</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Slider */}
      {offerListings && offerListings.length > 0 && (
        <div className="relative -mt-16 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Swiper
              navigation
              className="rounded-3xl overflow-hidden shadow-2xl"
              modules={[Navigation]}
            >
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                    className="h-[600px] flex items-end"
                  >
                    <div className="p-8 text-white">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md">
                        <h3 className="text-2xl font-bold mb-2">{listing.name}</h3>
                        <p className="text-gray-200 mb-4 line-clamp-2">{listing.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold">
                            ${listing.discountPrice || listing.regularPrice}
                            {listing.type === 'rent' && '/month'}
                          </span>
                          <Link
                            to={`/listing/${listing._id}`}
                            className="bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* Services Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Elite Estates</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive real estate services backed by years of experience and cutting-edge technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600">Don&apos;t just take our word for it - hear from our satisfied clients</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Listings Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Recent Offers */}
        {offerListings && offerListings.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Special Offers</span>
                </h2>
                <p className="text-xl text-gray-600">Limited time deals on premium properties</p>
              </div>
              <Link 
                to="/search?offer=true" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Offers
                <FaChevronRight className="ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {offerListings.slice(0, 8).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Properties for Rent */}
        {rentListings && rentListings.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">For Rent</span>
                </h2>
                <p className="text-xl text-gray-600">Find your perfect rental property</p>
              </div>
              <Link 
                to="/search?type=rent" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Rentals
                <FaChevronRight className="ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {rentListings.slice(0, 8).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Properties for Sale */}
        {saleListings && saleListings.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">For Sale</span>
                </h2>
                <p className="text-xl text-gray-600">Discover properties to call your own</p>
              </div>
              <Link 
                to="/search?type=sale" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Sales
                <FaChevronRight className="ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {saleListings.slice(0, 8).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-black text-white mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied clients who found their perfect property with Elite Estates. 
              Start your journey today and discover what makes us the #1 choice in luxury real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FaSearch className="mr-3" />
                Start Your Search
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <FaPhone className="mr-3" />
                Contact an Agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}