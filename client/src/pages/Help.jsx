import { useState } from 'react';
import { 
  FaQuestionCircle, 
  FaChevronDown, 
  FaChevronUp,
  FaSearch,
  FaHome,
  FaUser,
  FaCreditCard,
  FaCog,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';

function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: FaQuestionCircle },
    { id: 'account', name: 'Account & Profile', icon: FaUser },
    { id: 'property', name: 'Property Listings', icon: FaHome },
    { id: 'payment', name: 'Payments & Billing', icon: FaCreditCard },
    { id: 'security', name: 'Security & Privacy', icon: FaShieldAlt },
    { id: 'technical', name: 'Technical Issues', icon: FaCog }
  ];

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'To create an account, click the "Sign Up" button in the top right corner of the homepage. Fill in your details including your name, email, and password. You can also sign up using your Google account for faster registration.'
    },
    {
      id: 2,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the sign-in page. Enter your email address and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      id: 3,
      category: 'property',
      question: 'How do I list my property?',
      answer: 'After signing in, go to your profile and click "Create Listing". Fill in all the property details, upload high-quality photos, and set your price. Our team will review and approve your listing within 24 hours.'
    },
    {
      id: 4,
      category: 'property',
      question: 'How do I search for properties?',
      answer: 'Use our advanced search feature on the homepage or search page. You can filter by location, price range, property type, number of bedrooms, and various amenities to find properties that match your criteria.'
    },
    {
      id: 5,
      category: 'property',
      question: 'Can I schedule property viewings?',
      answer: 'Yes! On each property listing page, you\'ll find a "Schedule Tour" button. Choose your preferred date and time, and the property owner or agent will contact you to confirm the viewing.'
    },
    {
      id: 6,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and bank transfers. For premium listings and featured placements, we also accept digital wallets and online banking payments.'
    },
    {
      id: 7,
      category: 'payment',
      question: 'Are there any hidden fees?',
      answer: 'No, we believe in transparency. All fees are clearly displayed before you make any payment. Basic property listings are free, while premium features have clearly marked pricing.'
    },
    {
      id: 8,
      category: 'security',
      question: 'How do you verify property listings?',
      answer: 'All properties go through our verification process. We check property documents, verify ownership, and ensure all photos are genuine. We also conduct background checks on all property listers.'
    },
    {
      id: 9,
      category: 'security',
      question: 'Is my personal information safe?',
      answer: 'Absolutely. We use bank-grade encryption to protect your data. We never share your personal information with third parties without your consent, and you can control your privacy settings in your profile.'
    },
    {
      id: 10,
      category: 'technical',
      question: 'The website is loading slowly. What should I do?',
      answer: 'Try clearing your browser cache and cookies. Ensure you have a stable internet connection. If the problem persists, try using a different browser or contact our technical support team.'
    },
    {
      id: 11,
      category: 'technical',
      question: 'I can\'t upload photos. What\'s wrong?',
      answer: 'Make sure your images are in JPG, PNG, or WebP format and under 5MB each. Check your internet connection and try refreshing the page. If you\'re still having issues, contact our support team.'
    },
    {
      id: 12,
      category: 'property',
      question: 'How do I edit or delete my listing?',
      answer: 'Go to "My Listings" in your profile dashboard. Click on the property you want to edit, then use the "Edit" or "Delete" buttons. Changes to active listings may require re-approval.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Help{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Center
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Find answers to frequently asked questions and get the help you need.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-lg shadow-lg text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl text-center transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <category.icon className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'} found
            {selectedCategory !== 'all' && (
              <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
            )}
            {searchTerm && (
              <span> for &quot;{searchTerm}&quot;</span>
            )}
          </p>
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                {openFAQ === faq.id ? (
                  <FaChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <FaChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <FaQuestionCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find any questions matching your search. Try different keywords or browse our categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              View All FAQs
            </button>
          </div>
        )}
      </div>

      {/* Contact Support Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <FaHeadset className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Still need help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our support team is ready to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Contact Support
            </a>
            <a
              href="mailto:mayankjain2624@gmail.com"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 inline-block"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
