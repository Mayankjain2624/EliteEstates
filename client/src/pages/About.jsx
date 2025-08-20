import React from "react";
import { 
  FaHome, 
  FaSearch, 
  FaUsers, 
  FaGlobe, 
  FaPhoneAlt, 
  FaStar,
  FaShieldAlt,
  FaCertificate,
  FaChartLine,
  FaHandshake,
  FaBullseye,
  FaEye,
  FaHeart,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaAward
} from "react-icons/fa";

function About() {
  const stats = [
    { number: "10K+", label: "Happy Clients", icon: FaUsers },
    { number: "5K+", label: "Properties Listed", icon: FaHome },
    { number: "50+", label: "Cities Covered", icon: FaMapMarkerAlt },
    { number: "5+", label: "Years Experience", icon: FaCalendarAlt }
  ];

  const features = [
    {
      icon: FaHome,
      title: "Premium Property Portfolio",
      description: "Curated selection of luxury homes, apartments, and commercial spaces across prime locations.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaSearch,
      title: "Advanced Search Technology",
      description: "AI-powered search filters with real-time market data and personalized recommendations.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FaShieldAlt,
      title: "Secure Transactions",
      description: "Bank-grade security with verified listings and protected payment processing.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: FaUsers,
      title: "Expert Team Support",
      description: "Licensed real estate professionals providing 24/7 consultation and guidance.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: FaCertificate,
      title: "Verified Listings",
      description: "Every property is thoroughly vetted with legal documentation and quality assurance.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: FaChartLine,
      title: "Market Analytics",
      description: "Real-time market trends, price analytics, and investment insights for informed decisions.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const values = [
    {
      icon: FaBullseye,
      title: "Our Mission",
      description: "To revolutionize real estate by making property transactions transparent, efficient, and accessible to everyone."
    },
    {
      icon: FaEye,
      title: "Our Vision", 
      description: "To become the world's most trusted real estate platform, connecting millions of property seekers with their perfect homes."
    },
    {
      icon: FaHeart,
      title: "Our Values",
      description: "Integrity, innovation, and customer-centricity drive everything we do. We believe in building lasting relationships through trust."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Elite Estates
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transforming real estate experiences through innovation, trust, and excellence. 
              Your journey to the perfect property starts here.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-2">
                <div className="flex items-center space-x-2 px-4 py-2">
                  <FaAward className="text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Story
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founded with a vision to democratize real estate, Elite Estates emerged from the simple belief 
              that finding your perfect property shouldn&apos;t be complicated, stressful, or uncertain.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We&apos;ve grown from a small startup to a leading platform, serving thousands of customers across 
              multiple cities. Our technology-driven approach combines human expertise with cutting-edge 
              innovations to deliver exceptional experiences.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaHandshake className="text-blue-600 h-5 w-5" />
                <span className="text-gray-700 font-medium">Trusted Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaGlobe className="text-purple-600 h-5 w-5" />
                <span className="text-gray-700 font-medium">Global Reach</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl p-1">
              <div className="bg-white rounded-3xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern Real Estate"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6">
              <div className="flex items-center space-x-3">
                <FaStar className="text-yellow-500 h-6 w-6" />
                <div>
                  <div className="font-bold text-gray-900">4.9/5 Rating</div>
                  <div className="text-sm text-gray-600">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Elite Estates?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with personalized service to deliver 
              an unmatched real estate experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 h-full hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Foundation
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on strong principles that guide every decision and interaction.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 h-full">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who found their perfect home with Elite Estates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2">
              <FaSearch className="h-5 w-5" />
              <span>Start Searching</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2">
              <FaPhoneAlt className="h-5 w-5" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
