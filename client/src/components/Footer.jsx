import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaChevronRight,
  FaAward,
  FaShieldAlt,
  FaCertificate
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Buy Properties', href: '/search?type=sale' },
    { name: 'Rent Properties', href: '/search?type=rent' },
    { name: 'Luxury Homes', href: '/search?category=luxury' },
    { name: 'Commercial', href: '/search?category=commercial' },
    { name: 'New Listings', href: '/search?sort=newest' },
    { name: 'Price Trends', href: '/analytics' }
  ];

  const services = [
    { name: 'Property Valuation', href: '/services/valuation' },
    { name: 'Virtual Tours', href: '/services/virtual-tours' },
    { name: 'Property Management', href: '/services/management' },
    { name: 'Investment Advisory', href: '/services/investment' },
    { name: 'Legal Services', href: '/services/legal' },
    { name: 'Mortgage Assistance', href: '/services/mortgage' }
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press & Media', href: '/press' },
    { name: 'Awards', href: '/awards' },
    { name: 'Testimonials', href: '/testimonials' }
  ];

  const support = [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Support', href: '/support' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Live Chat', href: '/chat' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Community', href: '/community' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR Compliance', href: '/gdpr' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <FaHome className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-black">
                  <span className="text-white">Elite</span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Estates</span>
                </h2>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Luxury Real Estate</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premier destination for luxury real estate. We connect discerning buyers with exceptional properties, 
              offering unparalleled service and expertise in the world&apos;s most desirable locations.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />
                <span>123 Luxury Avenue, Elite District, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <FaPhone className="text-blue-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <span>info@eliteestates.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <FaWhatsapp className="text-green-400 flex-shrink-0" />
                <span>WhatsApp: +1 (555) 987-6543</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                <FaAward className="text-yellow-400" />
                <span className="text-xs text-gray-300">Certified Luxury</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                <FaShieldAlt className="text-green-400" />
                <span className="text-xs text-gray-300">Trusted Partner</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                <FaCertificate className="text-blue-400" />
                <span className="text-xs text-gray-300">Licensed</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { Icon: FaFacebookF, href: '#', color: 'hover:bg-blue-600' },
                  { Icon: FaTwitter, href: '#', color: 'hover:bg-sky-500' },
                  { Icon: FaInstagram, href: '#', color: 'hover:bg-pink-600' },
                  { Icon: FaLinkedinIn, href: '#', color: 'hover:bg-blue-700' },
                  { Icon: FaYoutube, href: '#', color: 'hover:bg-red-600' }
                ].map(({ Icon, href, color }, index) => (
                  <a
                    key={index}
                    href={href}
                    className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${color}`}
                  >
                    <Icon className="text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <FaChevronRight className="text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative">
              Services
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <FaChevronRight className="text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative">
              Company
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3 mb-8">
              {company.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <FaChevronRight className="text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold text-white mb-6 relative">
              Support
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <FaChevronRight className="text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Updated with Market Trends</h3>
            <p className="text-gray-300 mb-6">Subscribe to receive exclusive property listings and market insights directly to your inbox.</p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Elite Estates. All rights reserved. | Crafted with ❤️ for luxury real estate.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800/50 text-center">
            <p className="text-xs text-gray-500">
              Elite Estates is a licensed real estate brokerage. Equal Housing Opportunity. All information deemed reliable but not guaranteed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
