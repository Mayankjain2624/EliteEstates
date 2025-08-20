import { FaFileContract, FaGavel, FaExclamationTriangle, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

function Terms() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using Elite Estates, you accept and agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, please do not use our platform.',
        'These terms apply to all users, including property owners, buyers, renters, and visitors.',
        'We reserve the right to modify these terms at any time with notice to users.'
      ]
    },
    {
      id: 'platform-use',
      title: 'Platform Use',
      content: [
        'You must be at least 18 years old to use our services.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to provide accurate and up-to-date information when creating listings or accounts.',
        'You may not use our platform for any illegal or unauthorized purposes.',
        'You may not attempt to gain unauthorized access to our systems or other users\' accounts.'
      ]
    },
    {
      id: 'property-listings',
      title: 'Property Listings',
      content: [
        'Property owners are responsible for the accuracy of their listings.',
        'All property information, photos, and descriptions must be truthful and current.',
        'We reserve the right to remove or reject any listing that violates our guidelines.',
        'Listing fees, if applicable, are non-refundable once a listing is published.',
        'Property owners must have legal authority to list and rent/sell the property.',
        'Discrimination in housing is prohibited and will result in account termination.'
      ]
    },
    {
      id: 'user-conduct',
      title: 'User Conduct',
      content: [
        'Users must treat all parties with respect and professionalism.',
        'Harassment, discrimination, or abusive behavior is strictly prohibited.',
        'Users may not post spam, fraudulent content, or misleading information.',
        'Sharing personal contact information outside our platform is discouraged for safety.',
        'Users must comply with all applicable local, state, and federal laws.',
        'Any suspicious or fraudulent activity should be reported immediately.'
      ]
    },
    {
      id: 'transactions',
      title: 'Transactions and Payments',
      content: [
        'Elite Estates facilitates connections but is not a party to any property transactions.',
        'All financial transactions are between the buyer/renter and property owner.',
        'We are not responsible for the completion of any property transactions.',
        'Payment processing is handled by secure third-party providers.',
        'Dispute resolution between parties should be handled independently.',
        'We may charge fees for premium features and services.'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: [
        'All content on our platform, including design, logos, and text, is our property.',
        'Users retain ownership of content they upload but grant us usage rights.',
        'You may not copy, reproduce, or distribute our content without permission.',
        'Respect the intellectual property rights of other users and third parties.',
        'Report any copyright infringement to our designated agent.',
        'We will respond to valid DMCA takedown notices.'
      ]
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers and Limitations',
      content: [
        'Our platform is provided &quot;as is&quot; without warranties of any kind.',
        'We do not guarantee the accuracy of property information or user-generated content.',
        'We are not liable for any damages arising from use of our platform.',
        'Users assume all risks associated with property transactions.',
        'Our liability is limited to the maximum extent permitted by law.',
        'We do not endorse or guarantee any users or properties on our platform.'
      ]
    },
    {
      id: 'termination',
      title: 'Account Termination',
      content: [
        'We may terminate or suspend accounts for violation of these terms.',
        'Users may delete their accounts at any time through their profile settings.',
        'Upon termination, your right to use the platform ceases immediately.',
        'We may retain certain information as required by law or for legitimate business purposes.',
        'Termination does not affect any obligations or liabilities incurred before termination.'
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
                <FaFileContract className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Terms of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Please read these terms carefully before using our real estate platform.
            </p>
            <div className="mt-8 text-sm text-gray-500">
              Last updated: August 19, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-16">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start space-x-3">
            <FaExclamationTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-amber-800 mb-2">Important Notice</h3>
              <p className="text-amber-700">
                These terms constitute a legally binding agreement between you and Elite Estates. 
                By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Introduction */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to Elite Estates, a comprehensive real estate platform that connects property buyers, sellers, and renters. 
            These Terms of Service (&quot;Terms&quot;) govern your use of our website, mobile application, and related services.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By creating an account or using our services, you agree to comply with these Terms. 
            If you disagree with any part of these terms, you may not access or use our platform.
          </p>
        </div>

        {/* Terms Sections */}
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

        {/* Governing Law */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 mt-8">
          <div className="flex items-start space-x-4">
            <FaGavel className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India, 
                specifically the state of Madhya Pradesh, without regard to its conflict of law principles.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Any disputes arising under these Terms shall be subject to the exclusive jurisdiction 
                of the courts located in Jabalpur, Madhya Pradesh, India.
              </p>
            </div>
          </div>
        </div>

        {/* Compliance */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 mt-8">
          <div className="flex items-start space-x-4">
            <FaShieldAlt className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance and Safety</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are committed to maintaining a safe and compliant platform. We work to ensure our platform 
                complies with applicable real estate laws, fair housing regulations, and data protection requirements.
              </p>
              <p className="text-gray-600 leading-relaxed">
                All users are expected to comply with local, state, and federal laws when using our platform. 
                Any violations may result in immediate account suspension and legal action.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mt-12 text-white">
          <div className="text-center">
            <FaEnvelope className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
            <p className="text-blue-100 mb-6">
              If you have any questions about these Terms of Service, please contact our legal team.
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
                Email Legal Team
              </a>
            </div>
          </div>
        </div>

        {/* Updates Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-bold text-blue-800 mb-2">Terms Updates</h3>
          <p className="text-blue-700 text-sm">
            We reserve the right to modify these Terms of Service at any time. Material changes will be communicated 
            to users via email or platform notification. Continued use of the platform after changes constitutes 
            acceptance of the new terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
