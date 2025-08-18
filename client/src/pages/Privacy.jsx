import { FaShieldAlt, FaLock, FaUserShield, FaCookieBite, FaEnvelope } from 'react-icons/fa';

function Privacy() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: [
        'Personal Information: When you create an account, we collect your name, email address, phone number, and profile information.',
        'Property Information: Details about properties you list or inquire about, including location, price, and property features.',
        'Usage Data: Information about how you use our website, including pages visited, search queries, and interaction patterns.',
        'Technical Data: IP address, browser type, device information, and other technical identifiers.',
        'Communication Data: Messages sent through our platform, customer support interactions, and feedback provided.'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      content: [
        'To provide and improve our real estate platform services',
        'To facilitate property listings, searches, and transactions',
        'To communicate with you about your account and our services',
        'To send relevant property recommendations and market updates',
        'To verify your identity and prevent fraudulent activities',
        'To analyze usage patterns and improve user experience',
        'To comply with legal obligations and resolve disputes'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      content: [
        'With Property Owners: We share your contact information with property owners when you express interest in their listings.',
        'With Service Providers: Trusted third-party services that help us operate our platform (payment processors, analytics, etc.).',
        'For Legal Compliance: When required by law, court order, or to protect our rights and safety.',
        'With Your Consent: We may share information for other purposes with your explicit consent.',
        'Business Transfers: In case of merger, acquisition, or sale of assets, your information may be transferred.'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your personal information.',
        'All data transmission is encrypted using SSL/TLS protocols.',
        'Our servers are hosted in secure facilities with restricted access.',
        'We regularly update our security practices and conduct security audits.',
        'Employee access to personal data is limited and monitored.',
        'We have incident response procedures in case of data breaches.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      content: [
        'Essential Cookies: Required for basic website functionality and security.',
        'Performance Cookies: Help us understand how visitors use our website.',
        'Functional Cookies: Remember your preferences and settings.',
        'Advertising Cookies: Used to show relevant advertisements (with your consent).',
        'You can control cookie settings through your browser preferences.',
        'Some features may not work properly if cookies are disabled.'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      content: [
        'Access: Request copies of your personal data we hold.',
        'Rectification: Correct any inaccurate or incomplete information.',
        'Erasure: Request deletion of your personal data under certain circumstances.',
        'Portability: Receive your data in a structured, machine-readable format.',
        'Objection: Object to processing of your personal data for certain purposes.',
        'Restriction: Limit how we process your personal data.',
        'Withdraw Consent: Revoke consent for data processing at any time.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <FaShieldAlt className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Privacy{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className="mt-8 text-sm text-gray-500">
              Last updated: August 19, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Quick Overview Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 text-center">
            <FaLock className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Data</h3>
            <p className="text-gray-600 text-sm">Your information is encrypted and securely stored using industry standards.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 text-center">
            <FaUserShield className="h-10 w-10 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Your Control</h3>
            <p className="text-gray-600 text-sm">You have full control over your data and can modify or delete it anytime.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 text-center">
            <FaCookieBite className="h-10 w-10 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cookie Choices</h3>
            <p className="text-gray-600 text-sm">Customize your cookie preferences and tracking settings.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Introduction */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At Mayank Estate, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our real estate platform.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By using our services, you agree to the collection and use of information in accordance with this policy. 
            We encourage you to read this policy carefully and contact us if you have any questions.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.id} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {index + 1}. {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mt-12 text-white">
          <div className="text-center">
            <FaEnvelope className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Questions About This Policy?</h2>
            <p className="text-blue-100 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
              >
                Contact Us
              </a>
              <a
                href="mailto:mayankjain2624@gmail.com"
                className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 inline-block"
              >
                Email Privacy Team
              </a>
            </div>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-bold text-yellow-800 mb-2">Policy Updates</h3>
          <p className="text-yellow-700 text-sm">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy 
            periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
